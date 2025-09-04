import React, { useEffect, useState } from 'react';
import { toastBus } from './toast';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastBus.on((payload) => {
      const id = Math.random().toString(36).slice(2);
      const ttl = payload.ttl ?? 3000;
      const item = { id, ...payload };
      setToasts((prev) => [...prev, item]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, ttl);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="fixed inset-x-0 top-16 z-[9999] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto w-full max-w-md rounded-lg shadow-lg border px-4 py-3 text-sm flex items-start gap-3 transition-all ${
            t.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
              : t.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-200'
          }`}
        >
          <div className="mt-0.5">
            {t.type === 'error' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2v2h-2zm0-8h2v6h-2z"/><path d="M1 21h22L12 2 1 21z"/></svg>
            ) : t.type === 'warning' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21z"/><path d="M11 16h2v2h-2zm0-8h2v6h-2z"/></svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">{t.title ?? (t.type === 'error' ? 'Error' : t.type === 'warning' ? 'Peringatan' : 'Sukses')}</div>
            <div className="text-[13px] opacity-90">{t.message}</div>
          </div>
          <button
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="ml-2 text-current/70 hover:text-current"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      ))}
    </div>
  );
}
