import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { route } from 'ziggy-js';

/**
 * Searchable dropdown to pick Jenis Barang (kdjns) from existing `jenis` table.
 * Fetches JSON from farmasi.jenis-obat.index when Accept: application/json.
 */
export default function JenisSelector({ value, onChange, className = '' }) {
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
    // Initialize selected when value is provided
    if (value && !selected) {
      setSelected({ kdjns: value, nama: '' });
    }
  }, [value]);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const url = route('farmasi.jenis-obat.index', { q: debouncedQuery || '' });
    fetch(url, { headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        const list = Array.isArray(json.items) ? json.items : [];
        setItems(list);
      })
      .catch(() => setItems([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [debouncedQuery]);

  const handleSelect = (item) => {
    setSelected(item);
    onChange?.(item.kdjns);
    setOpen(false);
  };

  return (
    <div className={`mt-4 ${className}`} ref={containerRef}>
      <InputLabel htmlFor="jenisSelector" value="Jenis Barang (Kode)" />
      <div className="relative mt-1">
        <TextInput
          id="jenisSelector"
          value={open ? query : (selected ? `${selected.kdjns} — ${selected.nama || ''}`.trim() : (value || ''))}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Cari kode/nama jenis (mis. J024, INJEKSI)"
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
          <div className="absolute z-[1000] mt-2 w-full max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-md">
            {loading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Memuat data jenis...</div>
            ) : items.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">Tidak ada hasil</div>
            ) : (
              <ul>
                {items.map((it) => (
                  <li key={it.kdjns}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-indigo-50"
                      onClick={() => handleSelect(it)}
                    >
                      <span className="font-mono text-gray-700">{it.kdjns}</span>
                      <span className="ml-3 flex-1 truncate text-gray-900">{it.nama}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500">Pilih dari data jenis yang ada. Ketik untuk mencari berdasarkan kode atau nama.</p>
      <div className="mt-2 text-xs">
        <a
          href={route('farmasi.jenis-obat.index')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-indigo-200 px-2 py-1 font-medium text-indigo-700 hover:bg-indigo-50"
        >
          Buka Daftar Jenis Obat
        </a>
      </div>
    </div>
  );
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
