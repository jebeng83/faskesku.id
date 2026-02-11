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
const token = document.head.querySelector('meta[name="csrf-token"]');

// NOTE: Jangan set X-CSRF-TOKEN secara default dari meta tag
// karena bisa menyebabkan stale token issue pada SPA (Inertia).
// Biarkan Axios menangani token via XSRF-TOKEN cookie secara otomatis.
if (!token) {
    console.warn(
        "CSRF token meta tag not found. Ensure pages include <meta name='csrf-token' content='{{ csrf_token() }}'>"
    );
}
// Inject CSRF header untuk semua request fetch same-origin yang berpotensi mengubah state
// (POST, PUT, PATCH, DELETE). Ini memastikan Inertia router (yang menggunakan fetch)
// dan pemanggilan fetch manual selalu menyertakan token CSRF.
(() => {
    const origFetch = window.fetch ? window.fetch.bind(window) : null;
    if (!origFetch) return;

    const needsCsrf = (method) => {
        const m = (method || 'GET').toUpperCase();
        return m === 'POST' || m === 'PUT' || m === 'PATCH' || m === 'DELETE';
    };

    const isSameOrigin = (input) => {
        try {
            if (typeof input === 'string') {
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
                const headers = new Headers(init.headers || {});
                // Prioritize Cookie for CSRF Token to avoid stale meta tag issue
                const p = '; ' + document.cookie;
                const r = p.split('; XSRF-TOKEN=');
                const cookieToken = r.length === 2 ? decodeURIComponent(r.pop().split(';').shift()) : null;
                
                // Fallback to meta tag ONLY if cookie is missing
                const meta = document.head.querySelector('meta[name="csrf-token"]');
                const metaToken = meta ? meta.getAttribute('content') : null;

                // Set X-XSRF-TOKEN if cookie exists (Preferred)
                if (cookieToken) {
                     if (!headers.has('X-XSRF-TOKEN')) {
                        headers.set('X-XSRF-TOKEN', cookieToken);
                     }
                } else if (metaToken) {
                    // Fallback to meta token if no cookie
                    if (!headers.has('X-CSRF-TOKEN')) {
                        headers.set('X-CSRF-TOKEN', metaToken);
                    }
                }

                if (!headers.has('X-Requested-With')) {
                    headers.set('X-Requested-With', 'XMLHttpRequest');
                }
                if (!headers.has('Accept')) {
                    headers.set('Accept', 'application/json');
                }
                init.headers = headers;
                if (!init.credentials) {
                    init.credentials = 'same-origin';
                }
            }
        } catch (e) {
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
        // Tunggu lebih lama untuk memastikan cookie tersimpan di browser
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const p = '; ' + document.cookie;
        const r = p.split('; XSRF-TOKEN=');
        const c = r.length === 2 ? decodeURIComponent(r.pop().split(';').shift()) : '';
        
        if (c) {
            window.axios.defaults.headers.common['X-XSRF-TOKEN'] = c;
            return c;
        }
        
        // Fallback ke meta tag jika cookie gagal dibaca
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

        // Jika sudah pernah retry dan masih error 419, reload halaman
        if ((is419 || isCsrfMismatchString || isCsrfMismatchJson) && alreadyRetried) {
            console.warn('[Axios Interceptor] ❌ Retry failed with 419, reloading page...');
            window.location.reload();
            return Promise.reject(error);
        }

        if ((is419 || isCsrfMismatchString || isCsrfMismatchJson) && !alreadyRetried) {
            try {
                console.warn('[Axios Interceptor] 🔄 CSRF token expired, refreshing and retrying...');
                const newToken = await refreshCsrfToken();
                
                // Jika gagal mendapatkan token baru, reload halaman
                if (!newToken) {
                     console.warn('[Axios Interceptor] ❌ Failed to get new token, reloading page...');
                     window.location.reload();
                     return Promise.reject(error);
                }

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
                        "X-CSRF-TOKEN": newToken,
                        "X-XSRF-TOKEN": newToken,
                    },
                };
                
                console.warn('[Axios Interceptor] ✅ Retrying request with new CSRF token');
                return window.axios.request(retryConfig);
            } catch (e) {
                console.error('[Axios Interceptor] ❌ Failed to refresh CSRF token and retry:', e);
                // Jika refresh+retry gagal, reload halaman
                window.location.reload();
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
                console.warn(`[BPJS-REQ ${id}]`, {
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
        console.error("[BPJS-REQ ERROR]", error);
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
                console.warn(`[BPJS-RES ${id}]`, {
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
                console.error(`[BPJS-ERR ${id}]`, {
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
                console.warn(`[BPJS-REQ ${id}]`, {
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
                        console.warn(`[BPJS-RES ${id}]`, {
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
                console.error(`[BPJS-ERR ${id}]`, {
                    url,
                    message: error?.message,
                });
            }
            throw error;
        }
    };
})();
