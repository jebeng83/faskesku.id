import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function KredensialWaGateway() {
  const [error, setError] = useState('');
  
  const [sendNumber, setSendNumber] = useState('');
  const [sendText, setSendText] = useState('');
  const [idempotencyKey, setIdempotencyKey] = useState('');
  const [sending, setSending] = useState(false);
  const [sendInfo, setSendInfo] = useState(null);

  

  

  

  

  

  

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Kirim Pesan WhatsApp (Cloud API)</h1>
      {error ? <div className="text-sm text-amber-600 mb-2 whitespace-pre-line bg-amber-50 border border-amber-200 rounded p-2">{error}</div> : null}

      
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
          <input
            value={idempotencyKey}
            onChange={e => setIdempotencyKey(e.target.value)}
            placeholder="Idempotency key (opsional)"
            className="w-full border rounded p-2 text-sm"
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
                
                const res = await fetch('/api/whatsapp/send', {
                  method: 'POST',
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    to: cleanNumber, 
                    text: sendText,
                    idempotency_key: idempotencyKey.trim() || undefined,
                  })
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
