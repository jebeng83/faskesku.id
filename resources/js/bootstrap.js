import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Get CSRF token from meta tag
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

// --- BPJS Debug Interceptors ---
// Mencatat setiap request/response/error ke endpoint /pcare/api/* di console
// untuk membantu proses debugging di frontend.
(() => {
    const matchBpjs = (url) => typeof url === "string" && url.includes("/pcare/api/");
    const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const shouldDebug = true; // aktifkan selalu sesuai permintaan

    if (!shouldDebug) return;

    window.axios.interceptors.request.use((config) => {
        try {
            if (matchBpjs(config.url)) {
                const id = genId();
                // Simpan ID korelasi pada config agar bisa dilacak di response/error
                config.headers = config.headers || {};
                config.headers["X-BPJS-LOG-ID"] = id;
                config.bpjsLogId = id;
                console.debug(`[BPJS-REQ ${id}]`, {
                    method: (config.method || "GET").toUpperCase(),
                    url: config.url,
                    params: config.params,
                    data: config.data,
                });
            }
        } catch (e) {
            // jangan blokir request jika logging gagal
        }
        return config;
    }, (error) => {
        console.debug("[BPJS-REQ ERROR]", error);
        return Promise.reject(error);
    });

    window.axios.interceptors.response.use((response) => {
        try {
            const cfg = response.config || {};
            if (matchBpjs(cfg.url)) {
                const id = cfg.bpjsLogId || (cfg.headers ? cfg.headers["X-BPJS-LOG-ID"] : undefined);
                // Batasi ukuran payload yang ditampilkan agar tidak memenuhi console
                let preview;
                const data = response.data;
                if (typeof data === "string") {
                    preview = data.slice(0, 1000);
                } else {
                    preview = JSON.stringify(data).slice(0, 1000);
                }
                console.debug(`[BPJS-RES ${id}]`, {
                    status: response.status,
                    url: cfg.url,
                    preview,
                });
            }
        } catch (e) {
            // abaikan error logging
        }
        return response;
    }, (error) => {
        try {
            const cfg = error.config || {};
            if (matchBpjs(cfg.url)) {
                const id = cfg.bpjsLogId || (cfg.headers ? cfg.headers["X-BPJS-LOG-ID"] : undefined);
                console.debug(`[BPJS-ERR ${id}]`, {
                    url: cfg.url,
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data,
                });
            }
        } catch (e) {
            // abaikan error logging
        }
        return Promise.reject(error);
    });

    // Interceptor untuk fetch() agar request ke /pcare/api/* juga tercatat
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
        const url = typeof input === "string" ? input : (input && input.url);
        const isBpjs = matchBpjs(url);
        const id = isBpjs ? genId() : undefined;
        if (isBpjs) {
            try {
                let bodyPreview = undefined;
                if (init?.body) {
                    if (typeof init.body === "string") {
                        bodyPreview = init.body.slice(0, 1000);
                    } else {
                        try { bodyPreview = JSON.stringify(init.body).slice(0, 1000); } catch {}
                    }
                }
                console.debug(`[BPJS-REQ ${id}]`, {
                    method: (init?.method || "GET").toUpperCase(),
                    url,
                    body_preview: bodyPreview,
                });
            } catch {}
        }
        try {
            const res = await originalFetch(input, init);
            if (isBpjs) {
                try {
                    const cloned = res.clone();
                    cloned.text().then((text) => {
                        console.debug(`[BPJS-RES ${id}]`, {
                            status: res.status,
                            url,
                            preview: text.slice(0, 1000),
                        });
                    }).catch(() => {});
                } catch {}
            }
            return res;
        } catch (error) {
            if (isBpjs) {
                console.debug(`[BPJS-ERR ${id}]`, {
                    url,
                    message: error?.message,
                });
            }
            throw error;
        }
    };
})();
