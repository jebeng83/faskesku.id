import React, { useEffect, useRef, useState } from 'react';

export default function ScanWhatsAppCredentials() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [parsed, setParsed] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStreamActive(true);
        }
        if ('BarcodeDetector' in window) {
          const detector = new window.BarcodeDetector({ formats: ['qr_code', 'data_matrix'] });
          const loop = async () => {
            try {
              if (!videoRef.current) return;
              const detections = await detector.detect(videoRef.current);
              if (detections && detections.length) {
                const raw = detections[0].rawValue || detections[0].data || '';
                if (raw) {
                  setScanResult(raw);
                  parseResult(raw);
                }
              }
            } catch (_) {}
            requestAnimationFrame(loop);
          };
          requestAnimationFrame(loop);
        }
      } catch (_) {
        setError('Tidak dapat mengakses kamera');
      }
    };
    startCamera();
    return () => {
      const stream = videoRef.current && videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const parseResult = (txt) => {
    try {
      const obj = JSON.parse(txt);
      setParsed(normalize(obj));
      return;
    } catch (_) {}
    const lines = String(txt).split(/\r?\n/);
    const obj = {};
    for (const ln of lines) {
      const idx = ln.indexOf('=');
      if (idx > 0) {
        const k = ln.slice(0, idx).trim();
        const v = ln.slice(idx + 1).trim();
        obj[k] = v;
      }
    }
    setParsed(normalize(obj));
  };

  const normalize = (obj) => {
    const map = {
      WHATSAPP_TOKEN: ['WHATSAPP_TOKEN', 'token', 'access_token'],
      WHATSAPP_PHONE_NUMBER_ID: ['WHATSAPP_PHONE_NUMBER_ID', 'phone_number_id', 'pnid'],
      WHATSAPP_APP_SECRET: ['WHATSAPP_APP_SECRET', 'app_secret'],
      WHATSAPP_VERIFY_TOKEN: ['WHATSAPP_VERIFY_TOKEN', 'verify_token'],
      WHATSAPP_GRAPH_VERSION: ['WHATSAPP_GRAPH_VERSION', 'graph_version', 'version'],
      WHATSAPP_GRAPH_BASE: ['WHATSAPP_GRAPH_BASE', 'graph_base', 'base_url'],
    };
    const out = {};
    for (const key of Object.keys(map)) {
      const candidates = map[key];
      let val = '';
      for (const c of candidates) {
        if (obj && obj[c] !== undefined) { val = obj[c]; break; }
        const lc = c.toLowerCase();
        for (const k of Object.keys(obj || {})) {
          if (k.toLowerCase() === lc) { val = obj[k]; break; }
        }
        if (val) break;
      }
      out[key] = String(val || '');
    }
    if (!out.WHATSAPP_GRAPH_VERSION) out.WHATSAPP_GRAPH_VERSION = 'v19.0';
    if (!out.WHATSAPP_GRAPH_BASE) out.WHATSAPP_GRAPH_BASE = 'https://graph.facebook.com';
    return out;
  };

  const onManualPaste = (e) => {
    const val = e.target.value || '';
    setScanResult(val);
    parseResult(val);
  };

  const envSnippet = () => {
    const p = parsed || {};
    return [
      `WHATSAPP_TOKEN=${p.WHATSAPP_TOKEN || ''}`,
      `WHATSAPP_PHONE_NUMBER_ID=${p.WHATSAPP_PHONE_NUMBER_ID || ''}`,
      `WHATSAPP_APP_SECRET=${p.WHATSAPP_APP_SECRET || ''}`,
      `WHATSAPP_VERIFY_TOKEN=${p.WHATSAPP_VERIFY_TOKEN || ''}`,
      `WHATSAPP_GRAPH_VERSION=${p.WHATSAPP_GRAPH_VERSION || 'v19.0'}`,
      `WHATSAPP_GRAPH_BASE=${p.WHATSAPP_GRAPH_BASE || 'https://graph.facebook.com'}`,
    ].join('\n');
  };

  const copyEnv = async () => {
    try {
      await navigator.clipboard.writeText(envSnippet());
      setError('Snippet .env telah disalin ke clipboard');
    } catch (_) {
      setError('Gagal menyalin ke clipboard');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Scan QR Kredensial WhatsApp Cloud API</h1>
      <p className="text-sm text-slate-600 mb-4">Arahkan kamera ke QR yang berisi JSON atau pasangan baris KEY=VALUE untuk mengisi kredensial Cloud API. Jika kamera tidak tersedia, tempelkan teks secara manual.</p>
      {error ? <div className="text-sm text-amber-600 mb-2">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <video ref={videoRef} className="w-full rounded bg-black" playsInline muted />
          {!streamActive && (
            <div className="text-xs text-slate-500 mt-1">Kamera belum aktif atau tidak diizinkan.</div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tempel Hasil Scan (opsional)</label>
          <textarea value={scanResult} onChange={onManualPaste} className="w-full h-40 border rounded p-2 text-sm" placeholder="Tempel JSON atau baris KEY=VALUE di sini" />
        </div>
      </div>

      <div className="border rounded p-3 mb-3">
        <div className="text-sm font-medium mb-2">Kredensial Terdeteksi</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(parsed || {}).map(([k, v]) => (
            <div key={k}>
              <label className="text-xs text-slate-500">{k}</label>
              <input value={v || ''} readOnly className="w-full border rounded p-2 text-sm" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Snippet .env</label>
        <pre className="bg-slate-50 border rounded p-3 text-xs whitespace-pre-wrap">{envSnippet()}</pre>
      </div>
      <button onClick={copyEnv} className="px-3 py-2 bg-slate-800 text-white rounded text-sm">Salin ke Clipboard</button>
    </div>
  );
}
