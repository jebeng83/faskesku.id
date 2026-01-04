import React, { useEffect, useRef, useState } from 'react';

export default function KredensialWaGateway() {
  const videoRef = useRef(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone_number_id: '',
    token: '',
    app_secret: '',
    verify_token: '',
    graph_version: 'v19.0',
    graph_base: 'https://graph.facebook.com',
    active: true,
  });

  useEffect(() => {
    loadItems();
    startCamera();
    return () => {
      const s = videoRef.current && videoRef.current.srcObject;
      if (s) s.getTracks().forEach(t => t.stop());
    };
  }, []);

  const loadItems = async () => {
    try {
      const res = await fetch('/api/whatsapp/credentials');
      const json = await res.json();
      setItems(json.data || []);
    } catch (_) {
      setError('Gagal memuat kredensial');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      if ('BarcodeDetector' in window) {
        const detector = new window.BarcodeDetector({ formats: ['qr_code', 'data_matrix'] });
        const loop = async () => {
          try {
            if (!videoRef.current) return;
            const detections = await detector.detect(videoRef.current);
            if (detections && detections.length) {
              const raw = detections[0].rawValue || detections[0].data || '';
              if (raw) parseScan(raw);
            }
          } catch {}
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }
    } catch (_) {
      setError('Tidak dapat mengakses kamera');
    }
  };

  const parseScan = (txt) => {
    const obj = tryParse(txt);
    const norm = normalize(obj);
    setForm(v => ({
      ...v,
      phone_number_id: norm.WHATSAPP_PHONE_NUMBER_ID || v.phone_number_id,
      token: norm.WHATSAPP_TOKEN || v.token,
      app_secret: norm.WHATSAPP_APP_SECRET || v.app_secret,
      verify_token: norm.WHATSAPP_VERIFY_TOKEN || v.verify_token,
      graph_version: norm.WHATSAPP_GRAPH_VERSION || v.graph_version,
      graph_base: norm.WHATSAPP_GRAPH_BASE || v.graph_base,
    }));
  };

  const tryParse = (txt) => {
    try {
      return JSON.parse(txt);
    } catch {}
    const lines = String(txt).split(/\r?\n/);
    const obj = {};
    for (const ln of lines) {
      const idx = ln.indexOf('=');
      if (idx > 0) {
        obj[ln.slice(0, idx).trim()] = ln.slice(idx + 1).trim();
      }
    }
    return obj;
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
      for (const c of candidates) {
        if (obj && obj[c] !== undefined) { out[key] = obj[c]; break; }
        const lc = c.toLowerCase();
        for (const k of Object.keys(obj || {})) {
          if (k.toLowerCase() === lc) { out[key] = obj[k]; break; }
        }
        if (out[key]) break;
      }
    }
    return out;
  };

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/whatsapp/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error || 'Gagal menyimpan');
        return;
      }
      setForm({ name: '', phone_number_id: '', token: '', app_secret: '', verify_token: '', graph_version: 'v19.0', graph_base: 'https://graph.facebook.com', active: true });
      await loadItems();
    } catch (_) {
      setError('Gagal menyimpan');
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch(`/api/whatsapp/credentials/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.ok) return;
      await loadItems();
    } catch {}
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Kredensial WA Gateway</h1>
      {error ? <div className="text-sm text-amber-600 mb-2">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <video ref={videoRef} className="w-full rounded bg-black" playsInline muted />
        </div>
        <form onSubmit={submit} className="border rounded p-3">
          <div className="grid grid-cols-1 gap-2">
            <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Nama kredensial" className="w-full border rounded p-2 text-sm" />
            <input value={form.phone_number_id} onChange={e => setField('phone_number_id', e.target.value)} placeholder="Phone Number ID" className="w-full border rounded p-2 text-sm" />
            <input value={form.token} onChange={e => setField('token', e.target.value)} placeholder="Access Token" className="w-full border rounded p-2 text-sm" />
            <input value={form.app_secret} onChange={e => setField('app_secret', e.target.value)} placeholder="App Secret" className="w-full border rounded p-2 text-sm" />
            <input value={form.verify_token} onChange={e => setField('verify_token', e.target.value)} placeholder="Verify Token" className="w-full border rounded p-2 text-sm" />
            <input value={form.graph_version} onChange={e => setField('graph_version', e.target.value)} placeholder="Graph Version" className="w-full border rounded p-2 text-sm" />
            <input value={form.graph_base} onChange={e => setField('graph_base', e.target.value)} placeholder="Graph Base" className="w-full border rounded p-2 text-sm" />
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={e => setField('active', e.target.checked)} /> Active
            </label>
            <button type="submit" className="px-3 py-2 bg-slate-800 text-white rounded text-sm">Simpan</button>
          </div>
        </form>
      </div>

      <div className="border rounded p-3">
        <div className="text-sm font-medium mb-2">Daftar Kredensial</div>
        <div className="grid grid-cols-1 gap-2">
          {(items || []).map(it => (
            <div key={it.id} className="flex items-center justify-between border rounded p-2">
              <div>
                <div className="text-sm font-medium">{it.name || it.phone_number_id}</div>
                <div className="text-xs text-slate-600">PNID: {it.phone_number_id} • Active: {String(it.active)} • Token: {it.has_token ? 'Ada' : 'Tidak'}</div>
              </div>
              <button onClick={() => removeItem(it.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
