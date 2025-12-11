import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { route } from 'ziggy-js';
import barangRoutes from '@/routes/api/barang';

/**
 * Searchable dropdown to pick Data Barang (kode_brng) from `databarang` table.
 * Attempts to fetch JSON from farmasi.data-obat when Accept: application/json.
 */
export default function DataBarangSelector({ value, onChange, className = '' }) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (value && !selected) {
      setSelected({ kode_brng: value, nama_brng: '' });
    }
  }, [value]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const url = barangRoutes.search.url({ q: query || '' });
    fetch(url, { headers: { Accept: 'application/json' }, credentials: 'include' })
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        const list = Array.isArray(json.data) ? json.data : [];
        setItems(list.map((it) => ({ kode_brng: it.kode_brng, nama_brng: it.nama_brng })));
      })
      .catch(() => setItems([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [query]);

  const handleSelect = (item) => {
    setSelected(item);
    onChange?.(item.kode_brng);
    setOpen(false);
  };

  return (
    <div className={`mt-4 ${className}`} ref={containerRef}>
      <InputLabel htmlFor="barangSelector" value="Data Barang (Kode)" />
      <div className="relative mt-1">
        <TextInput
          id="barangSelector"
          value={open ? query : (selected ? `${selected.kode_brng} — ${selected.nama_brng || ''}`.trim() : (value || ''))}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Cari kode/nama barang (mis. B0001, PARACETAMOL)"
          className="w-full pr-10"
        />
        <button
          type="button"
          aria-label="Toggle dropdown"
          className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          onClick={() => setOpen((o) => !o)}
        >
          ▾
        </button>

        {open && (
          <div className="absolute z-20 mt-2 w-full max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-md">
            {loading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Memuat data barang...</div>
            ) : items.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">Tidak ada hasil</div>
            ) : (
              <ul>
                {items.map((it) => (
                  <li key={it.kode_brng}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-indigo-50"
                      onClick={() => handleSelect(it)}
                    >
                      <span className="font-mono text-gray-700">{it.kode_brng}</span>
                      <span className="ml-3 flex-1 truncate text-gray-900">{it.nama_brng}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500">Pilih dari data barang. Ketik untuk mencari berdasarkan kode atau nama.</p>
      <div className="mt-2 text-xs">
        <a
          href={route('farmasi.data-obat')}
          target="_blank"
          rel="noopener"
          className="rounded border border-indigo-200 px-2 py-1 font-medium text-indigo-700 hover:bg-indigo-50"
        >
          Buka Data Obat
        </a>
      </div>
    </div>
  );
}
