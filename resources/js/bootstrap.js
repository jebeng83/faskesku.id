import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Pastikan cookie sesi dikirim pada request XHR antar port (mis. Vite dev server -> Laravel)
// Ini membantu mencegah 419 (CSRF token mismatch) akibat cookie sesi tidak terkirim.
window.axios.defaults.withCredentials = true;
// Set Accept header untuk Sanctum stateful API authentication
window.axios.defaults.headers.common["Accept"] = "application/json";
window.axios.defaults.xsrfCookieName = "XSRF-TOKEN";
window.axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

// --- Ziggy URL/Port Auto-Sync ---
// Beberapa environment lokal sering berpindah port (mis. 8000, 8016, dsb.).
// Agar semua pemanggilan route() otomatis menggunakan origin/port yang sedang aktif,
// kita sinkronkan konfigurasi Ziggy ke window.location setiap kali aplikasi dimuat.
try {
    if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
        const origin = window.location.origin; // contoh: http://127.0.0.1:8000
        const currentPort = window.location.port
            ? parseInt(window.location.port, 10)
            : (origin.startsWith("https") ? 443 : 80);

        // Mutasi langsung objek Ziggy global yang disuntikkan oleh @routes
        window.Ziggy.url = origin;
        window.Ziggy.port = currentPort;
    }
} catch (e) {
    console.warn("Gagal menyinkronkan Ziggy dengan origin saat ini:", e);
}

// Get CSRF token from meta tag
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
    // Opsi: jejak ringan untuk memastikan token terpasang
    // console.debug("Axios CSRF token set", token.content?.slice(0, 10) + "...");
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}
// Inject CSRF header untuk semua request fetch same-origin yang berpotensi mengubah state
// (POST, PUT, PATCH, DELETE). Ini memastikan Inertia router (yang menggunakan fetch)
// dan pemanggilan fetch manual selalu menyertakan token CSRF.
(() => {
    const metaToken = document.head.querySelector('meta[name="csrf-token"]');
    const csrfToken = metaToken ? metaToken.getAttribute('content') : null;
    if (!csrfToken) return; // sudah ada console.error di atas

    const origFetch = window.fetch ? window.fetch.bind(window) : null;
    if (!origFetch) return;

    const needsCsrf = (method) => {
        const m = (method || 'GET').toUpperCase();
        return m === 'POST' || m === 'PUT' || m === 'PATCH' || m === 'DELETE';
    };

    const isSameOrigin = (input) => {
        try {
            if (typeof input === 'string') {
                // Relative path => same-origin
                if (input.startsWith('/')) return true;
                const url = new URL(input, window.location.href);
                return url.origin === window.location.origin;
            }
            if (input instanceof Request) {
                const url = new URL(input.url, window.location.href);
                return url.origin === window.location.origin;
            }
        } catch {}
        return false;
    };

    window.fetch = async (input, init = {}) => {
        try {
            if (isSameOrigin(input) && needsCsrf(init.method)) {
                // Normalisasi headers
                const headers = new Headers(init.headers || {});
                if (!headers.has('X-CSRF-TOKEN')) {
                    headers.set('X-CSRF-TOKEN', csrfToken);
                }
                if (!headers.has('X-Requested-With')) {
                    headers.set('X-Requested-With', 'XMLHttpRequest');
                }
                if (!headers.has('Accept')) {
                    headers.set('Accept', 'application/json');
                }
                init.headers = headers;

                // Pastikan cookie sesi terkirim
                if (!init.credentials) {
                    init.credentials = 'same-origin';
                }
            }
        } catch (e) {
            // Jangan blokir request bila terjadi error pada wrapper
            console.warn('CSRF fetch wrapper warning:', e?.message || e);
        }
        return origFetch(input, init);
    };
})();

// --- Auto-refresh CSRF Token & Retry untuk 419 ---
// Jika terjadi 419 (Page Expired / CSRF mismatch), coba refresh token terlebih dahulu
// lalu ulangi 1x request yang gagal. Ini membantu saat token berubah akibat rotasi session.
const refreshCsrfToken = async () => {
    try {
        await window.axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        const p = '; ' + document.cookie;
        const r = p.split('; XSRF-TOKEN=');
        const c = r.length === 2 ? decodeURIComponent(r.pop().split(';').shift()) : '';
        if (c) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = c;
            window.axios.defaults.headers.common['X-XSRF-TOKEN'] = c;
            return c;
        }
        const mt = document.head.querySelector('meta[name="csrf-token"]');
        const t = mt?.content || '';
        if (t) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = t;
        }
        return t;
    } catch {
        return '';
    }
};

window.axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const is419 = status === 419;
        
        // Cek CSRF mismatch dari string response atau JSON response
        const responseData = error?.response?.data;
        const isCsrfMismatchString =
            typeof responseData === "string" &&
            /CSRF|Page Expired/i.test(responseData);
        const isCsrfMismatchJson =
            typeof responseData === "object" &&
            responseData !== null &&
            (responseData.error_code === "CSRF_TOKEN_EXPIRED" ||
             /CSRF|Page Expired/i.test(responseData.message || ""));

        // Hindari loop retry tak terbatas
        const alreadyRetried = error?.config?.headers?.["X-CSRF-RETRY"] === "1";

        if ((is419 || isCsrfMismatchString || isCsrfMismatchJson) && !alreadyRetried) {
            try {
                console.log('[Axios Interceptor] 🔄 CSRF token expired, refreshing and retrying...');
                const newToken = await refreshCsrfToken();
                
                // Update meta tag jika ada
                const metaToken = document.head.querySelector('meta[name="csrf-token"]');
                if (metaToken && newToken) {
                    metaToken.setAttribute('content', newToken);
                }
                
                const retryConfig = {
                    ...error.config,
                    headers: {
                        ...(error.config?.headers || {}),
                        "X-CSRF-RETRY": "1",
                        // Perbarui header token dengan token yang baru
                        "X-CSRF-TOKEN": newToken || 
                            document.head.querySelector('meta[name="csrf-token"]')?.content ||
                            window.axios.defaults.headers.common["X-CSRF-TOKEN"] ||
                            "",
                        "X-XSRF-TOKEN": newToken || 
                            document.head.querySelector('meta[name="csrf-token"]')?.content ||
                            window.axios.defaults.headers.common["X-XSRF-TOKEN"] ||
                            "",
                    },
                };
                
                console.log('[Axios Interceptor] ✅ Retrying request with new CSRF token');
                return window.axios.request(retryConfig);
            } catch (e) {
                console.error('[Axios Interceptor] ❌ Failed to refresh CSRF token and retry:', e);
                // Jika refresh+retry gagal, teruskan error aslinya
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

// --- BPJS Debug Interceptors ---
// Mencatat setiap request/response/error ke endpoint /pcare/api/* di console
// untuk membantu proses debugging di frontend.
(() => {
    const matchBpjs = (url) => typeof url === "string" && url.includes("/pcare/api/");
    const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const shouldDebug = Boolean(typeof import.meta !== 'undefined' && import.meta?.env?.DEV);

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
        } catch {
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
        } catch {
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
        } catch {
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
