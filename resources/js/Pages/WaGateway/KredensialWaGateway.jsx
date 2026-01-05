import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function KredensialWaGateway() {
  const [error, setError] = useState('');
  const [wagStatus, setWagStatus] = useState(null);
  const [wagQrText, setWagQrText] = useState('');
  const [wagQrUrl, setWagQrUrl] = useState('');
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingQr, setLoadingQr] = useState(false);
  const [startInfo, setStartInfo] = useState(null);
  const [sendNumber, setSendNumber] = useState('');
  const [sendText, setSendText] = useState('');
  const [sending, setSending] = useState(false);
  const [sendInfo, setSendInfo] = useState(null);
  const [loadingReplace, setLoadingReplace] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const fetchWagStatus = async () => {
    try {
      setLoadingStatus(true);
      const res = await fetch('/api/wagateway/status', { headers: { 'Accept': 'application/json' } });
      const json = await res.json();
      setWagStatus(json);
      if (!json?.whatsapp_authenticated) {
        const s = json?.qr_code_status || '';
        if (s && s !== 'not ready') {
          setWagQrUrl('');
          setWagQrText('');
          try { await replaceWagQr(); } catch {}
        }
      }
    } catch {
      setError('Gagal menghubungi Node gateway untuk status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const startWag = async () => {
    try {
      setError('');
      setStartInfo(null);
      setLoadingStart(true);
      const res = await fetch('/api/wagateway/start', { method: 'POST', headers: { 'Accept': 'application/json' } });
      if (res.status === 404) {
        setError('Endpoint start tidak ditemukan. Restart server Laravel untuk mengaktifkan route.');
        return;
      }
      const json = await res.json();
      if (!json.ok) {
        setError(json.error || 'Gagal memulai gateway');
        return;
      }
      setStartInfo(json);
      await fetchWagStatus();
    } catch {
      setError('Gagal memulai gateway');
    } finally {
      setLoadingStart(false);
    }
  };

  const stopWag = async () => {
    try {
      setError('');
      setLoadingStop(true);
      const res = await fetch('/api/wagateway/stop', { method: 'POST', headers: { 'Accept': 'application/json' } });
      if (res.status === 404) {
        setError('Endpoint stop tidak ditemukan. Restart server Laravel untuk mengaktifkan route.');
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!json.ok) {
        setError(json.error || 'Gagal menghentikan gateway');
        return;
      }
      await fetchWagStatus();
    } catch {
      setError('Gagal menghentikan gateway');
    } finally {
      setLoadingStop(false);
    }
  };

  const fetchWagQr = async () => {
    try {
      setLoadingQr(true);
      setWagQrUrl('');
      setWagQrText('');

      try {
        await fetch('/api/wagateway/start', { method: 'POST', headers: { 'Accept': 'application/json' } });
      } catch {}

      try {
        const s = await fetch('/api/wagateway/status', { headers: { 'Accept': 'application/json' } });
        const sj = await s.json();
        if (sj && sj.whatsapp_authenticated) {
          setWagQrText('Already Login');
          setWagQrUrl('');
          return;
        }
      } catch {}

      const getOnce = async () => {
        const r = await fetch('/api/wagateway/qr', { method: 'POST', headers: { 'Accept': 'application/json' } });
        const j = await r.json();
        const t = j.qrBarCode || '';
        const m = j.message || '';
        return t || (m === 'QR Not Ready' ? 'not ready' : '');
      };

      let txt = await getOnce();

      if (txt === 'not ready') {
        let restartOk = false;
        try {
          const rr = await fetch('/api/wagateway/restart', { method: 'POST', headers: { 'Accept': 'application/json' } });
          restartOk = rr.status < 400;
        } catch {}
        if (!restartOk) {
          try { await fetch('/api/wagateway/start', { method: 'POST', headers: { 'Accept': 'application/json' } }); } catch {}
        }
        for (let i = 0; i < 10; i++) {
          await new Promise(res => setTimeout(res, 800));
          txt = await getOnce();
          if (txt && txt !== 'not ready' && txt !== 'Already Login') break;
        }
      }

      setWagQrText(txt);
      if (txt && txt !== 'not ready' && txt !== 'Already Login') {
        try {
          const url = await QRCode.toDataURL(txt);
          setWagQrUrl(url);
        } catch {
          setWagQrUrl('');
        }
      } else {
        setWagQrUrl('');
      }
    } catch {
      setError('Gagal mengambil QR dari Node gateway');
    } finally {
      setLoadingQr(false);
    }
  };

  const replaceWagQr = async () => {
    try {
      setLoadingReplace(true);
      setWagQrUrl('');
      setWagQrText('');
      setError('');
      
      // Step 1: Restart client untuk logout
      try {
        const restartRes = await fetch('/api/wagateway/restart', { method: 'POST', headers: { 'Accept': 'application/json' } });
        const restartJson = await restartRes.json().catch(() => ({}));
        if (!restartJson.ok && restartJson.error) {
          setError(`Gagal restart: ${restartJson.error}`);
        }
      } catch (err) {
        setError(`Gagal restart: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
      
      // Step 2: Tunggu beberapa detik untuk memastikan client sudah logout dan siap untuk QR baru
      await new Promise(res => setTimeout(res, 5000)); // Increased wait time
      
      // Step 3: Cek status - lebih fleksibel, jika masih authenticated tapi QR ready, lanjutkan
      for (let i = 0; i < 15; i++) {
        try {
          const statusRes = await fetch('/api/wagateway/status', { headers: { 'Accept': 'application/json' } });
          const statusJson = await statusRes.json().catch(() => ({}));
          const authenticated = statusJson.whatsapp_authenticated || false;
          const qrStatus = statusJson.qr_code_status || '';
          
          if (!authenticated) {
            break;
          }
          
          // Jika QR sudah ready meskipun masih authenticated, bisa lanjutkan
          if (qrStatus && qrStatus !== 'not ready' && qrStatus !== 'WA Gate is ready') {
            break;
          }
        } catch {}
        await new Promise(res => setTimeout(res, 1000));
      }
      
      // Step 4: Ambil QR code baru (lanjutkan meskipun masih authenticated, karena restart sudah dilakukan)
      const getOnce = async () => {
        const r = await fetch('/api/wagateway/qr', { method: 'POST', headers: { 'Accept': 'application/json' } });
        const j = await r.json();
        const t = j.qrBarCode || '';
        const m = j.message || '';
        return { txt: t || (m === 'QR Not Ready' ? 'not ready' : ''), message: m, data: j };
      };
      
      let result = { txt: '', message: '', data: {} };
      let foundQr = false;
      
      // Try to get QR code - increased retry count and delay
      for (let i = 0; i < 20; i++) {
        await new Promise(res => setTimeout(res, 1500)); // Increased delay
        result = await getOnce();
        
        // If QR is ready and not "Already Login", use it
        if (result.txt && result.txt !== 'not ready' && result.txt !== 'Already Login' && result.txt.length > 50) {
          foundQr = true;
          break;
        }
        
        // If message says "QR Ready", try to get it
        if (result.message === 'QR Ready' && result.txt && result.txt.length > 50) {
          foundQr = true;
          break;
        }
      }
      
      setWagQrText(result.txt);
      if (foundQr && result.txt && result.txt !== 'not ready' && result.txt !== 'Already Login') {
        try {
          const url = await QRCode.toDataURL(result.txt);
          setWagQrUrl(url);
          setError(''); // Clear error on success
        } catch (err) {
          setWagQrUrl('');
          setError(`Gagal membuat QR code: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      } else {
        setWagQrUrl('');
        if (result.message === 'Already Login' || result.txt === 'Already Login') {
          setError('Client masih terhubung setelah restart.\n\n' +
                   'Solusi:\n' +
                   '1. Pastikan WhatsApp Web sudah logout dari semua perangkat (di HP: Menu → Perangkat Tertaut → Logout semua)\n' +
                   '2. Restart Node gateway secara manual:\n' +
                   '   - Stop server (Ctrl+C)\n' +
                   '   - Hapus folder: rm -rf public/wagateway/node_mrlee/.wwebjs_auth\n' +
                   '   - Start lagi: node public/wagateway/node_mrlee/appJM.js\n' +
                   '3. Tunggu sampai QR code muncul, lalu scan');
        } else {
          setError('QR code belum siap setelah restart.\n\n' +
                   'Silakan:\n' +
                   '1. Tunggu beberapa saat (10-20 detik)\n' +
                   '2. Klik "Ambil QR" untuk mendapatkan QR code baru\n' +
                   '3. Atau restart Node gateway secara manual');
        }
      }
    } catch (err) {
      setError(`Gagal mengganti QR: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoadingReplace(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Kredensial WA Gateway</h1>
      {error ? <div className="text-sm text-amber-600 mb-2 whitespace-pre-line bg-amber-50 border border-amber-200 rounded p-2">{error}</div> : null}

      <div className="border rounded p-3 mb-4">
        <div className="text-sm font-medium mb-2">Login WA Web (Node Gateway)</div>
        <div className="text-xs text-amber-600 mb-2 bg-amber-50 border border-amber-200 rounded p-2">
          <strong>Catatan:</strong> Jika QR code tidak bisa di-scan dengan error "tidak dapat menautkan perangkat", 
          pastikan WhatsApp Web sudah logout dari semua perangkat lain terlebih dahulu. 
          Buka WhatsApp di HP → Menu (3 titik) → Perangkat Tertaut → Logout semua perangkat Web.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs text-slate-600">Status: {wagStatus ? (wagStatus.whatsapp_authenticated ? 'Authenticated' : (wagStatus.qr_code_status && wagStatus.qr_code_status !== 'not ready' ? 'QR Ready' : wagStatus.qr_code_status || 'Unknown')) : 'Belum diambil'}</div>
            {startInfo ? (
              <div className="text-xs text-slate-600">Start: {startInfo.status || ''}</div>
            ) : null}
            <div className="flex gap-2 flex-wrap">
              <button onClick={startWag} disabled={loadingStart} className={`px-3 py-2 rounded text-sm ${loadingStart ? 'bg-green-600 opacity-60 cursor-not-allowed text-white' : 'bg-green-700 text-white'}`}>{loadingStart ? 'Memulai...' : 'Start'}</button>
              <button onClick={stopWag} disabled={loadingStop} className={`px-3 py-2 rounded text-sm ${loadingStop ? 'bg-red-600 opacity-60 cursor-not-allowed text-white' : 'bg-red-700 text-white'}`}>{loadingStop ? 'Menghentikan...' : 'Stop'}</button>
              <button onClick={fetchWagStatus} disabled={loadingStatus} className={`px-3 py-2 rounded text-sm ${loadingStatus ? 'bg-slate-600 opacity-60 cursor-not-allowed text-white' : 'bg-slate-700 text-white'}`}>{loadingStatus ? 'Mengambil...' : 'Ambil Status'}</button>
              <button onClick={fetchWagQr} disabled={loadingQr} className={`px-3 py-2 rounded text-sm ${loadingQr ? 'bg-slate-700 opacity-60 cursor-not-allowed text-white' : 'bg-slate-800 text-white'}`}>{loadingQr ? 'Mengambil...' : 'Ambil QR'}</button>
              <button onClick={replaceWagQr} disabled={loadingReplace} className={`px-3 py-2 rounded text-sm ${loadingReplace ? 'bg-amber-600 opacity-60 cursor-not-allowed text-white' : 'bg-amber-700 text-white'}`}>{loadingReplace ? 'Mengganti...' : 'Ganti QR'}</button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {wagQrUrl ? (
              <img src={wagQrUrl} alt="QR" className="w-64 h-64 object-contain" />
            ) : (
              <div className="text-xs text-slate-500">{wagQrText || 'QR belum tersedia'}</div>
            )}
          </div>
        </div>
      </div>
      <div className="border rounded p-3">
        <div className="text-sm font-medium mb-2">Kirim Pesan WhatsApp</div>
        <div className="text-xs text-slate-500 mb-2">
          Format nomor: 6285229977208 atau 085229977208 (akan otomatis dikonversi ke format internasional)
        </div>
        <div className="grid grid-cols-1 gap-2">
          <input
            value={sendNumber}
            onChange={e => setSendNumber(e.target.value)}
            placeholder="6285229977208 atau 085229977208"
            className="w-full border rounded p-2 text-sm"
          />
          <textarea
            value={sendText}
            onChange={e => setSendText(e.target.value)}
            placeholder="Pesan"
            rows={4}
            className="w-full border rounded p-2 text-sm min-h-24"
          />
          <button
            onClick={async () => {
              try {
                setSending(true);
                setSendInfo(null);
                setError('');
                
                // Validate and clean phone number
                let cleanNumber = sendNumber.replace(/\D/g, ''); // Remove all non-digits
                if (!cleanNumber) {
                  setError('Nomor tidak boleh kosong');
                  return;
                }
                
                // Remove leading + if exists
                if (cleanNumber.startsWith('+')) {
                  cleanNumber = cleanNumber.substring(1);
                }
                
                // Validate minimum length (should be at least 10 digits)
                if (cleanNumber.length < 10) {
                  setError(`Nomor terlalu pendek (${cleanNumber.length} digit). Minimal 10 digit.`);
                  return;
                }
                
                // If starts with 0, remove it (Indonesian format)
                if (cleanNumber.startsWith('0')) {
                  cleanNumber = '62' + cleanNumber.substring(1);
                }
                
                // If doesn't start with country code, assume Indonesia (62)
                if (!cleanNumber.startsWith('62')) {
                  cleanNumber = '62' + cleanNumber;
                }
                
                const res = await fetch('/api/wagateway/send', {
                  method: 'POST',
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                  body: JSON.stringify({ to: cleanNumber, text: sendText })
                });
                const json = await res.json().catch(() => ({}));
                const ok = json?.ok ?? false;
                if (!ok) {
                  const errorMsg = json?.error || json?.data?.message || `HTTP ${res.status}`;
                  const hint = json?.hint || '';
                  const errorDetail = json?.error_detail || '';
                  const numberSent = json?.number_sent || cleanNumber;
                  
                  let fullError = `Gagal mengirim ke ${numberSent}:\n${errorMsg}`;
                  if (errorDetail && errorDetail.includes('getChat')) {
                    fullError += '\n\nClient WhatsApp belum siap atau session terputus.';
                  }
                  if (hint) {
                    fullError += `\n\n${hint}`;
                  }
                  
                  setError(fullError);
                } else {
                  setError(''); // Clear error on success
                }
                setSendInfo({ status: res.status, ok, data: json });
              } catch (err) {
                setError(`Gagal mengirim: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setSendInfo({ status: 0, ok: false });
              } finally {
                setSending(false);
              }
            }}
            disabled={sending || !sendNumber || !sendText}
            className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-sm ${sending ? 'bg-green-600 opacity-60 cursor-not-allowed text-white' : 'bg-slate-800 text-white'}`}
          >
            <PaperAirplaneIcon className="w-4 h-4 text-green-500" />
            {sending ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
        {error && error.includes('Kirim Pesan WhatsApp') ? null : (
          <div className="mt-2 text-xs text-slate-600 whitespace-pre-line">{sendInfo ? (sendInfo.ok ? 'Terkirim (queued)' : `Gagal (${sendInfo.status})`) : ''}</div>
        )}
      </div>
    </div>
  );
}
