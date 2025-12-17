import React, { useEffect, useState, useCallback } from 'react';
import { BeakerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RiwayatKunjungan({ token, noRkmMedis }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedVisit, setExpandedVisit] = useState(null);
  const [medicationData, setMedicationData] = useState({});
  const [loadingMedication, setLoadingMedication] = useState({});
  const [labData, setLabData] = useState({});
  const [loadingLab, setLoadingLab] = useState({});
  const [radData, setRadData] = useState({});
  const [loadingRad, setLoadingRad] = useState({});
  const [soapData, setSoapData] = useState({});
  const [loadingSoap, setLoadingSoap] = useState({});
  const [openSections, setOpenSections] = useState({});

  const fetchMedicationData = useCallback(async (noRawat) => {
    if (medicationData[noRawat]) return;
    setLoadingMedication(prev => ({ ...prev, [noRawat]: true }));
    try {
      const urls = [
        `/rawat-inap/obat-ranap/${encodeURIComponent(noRawat)}`,
        `/rawat-jalan/obat-ralan/${encodeURIComponent(noRawat)}`
      ];
      const all = [];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!res.ok) continue;
          const json = await res.json();
          const data = Array.isArray(json.data) ? json.data : [];
          all.push(...data);
        } catch {}
      }
      setMedicationData(prev => ({ ...prev, [noRawat]: all }));
    } catch {
      setMedicationData(prev => ({ ...prev, [noRawat]: [] }));
    } finally {
      setLoadingMedication(prev => ({ ...prev, [noRawat]: false }));
    }
  }, [medicationData]);

  const fetchLabData = useCallback(async (noRawat) => {
    if (labData[noRawat]) return;
    setLoadingLab(prev => ({ ...prev, [noRawat]: true }));
    try {
      const urls = [
        `/rawat-inap/lab/${encodeURIComponent(noRawat)}`,
        `/rawat-jalan/lab/${encodeURIComponent(noRawat)}`
      ];
      const all = [];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!res.ok) continue;
          const json = await res.json();
          const data = Array.isArray(json.data) ? json.data : [];
          all.push(...data);
        } catch {}
      }
      setLabData(prev => ({ ...prev, [noRawat]: all }));
    } catch {
      setLabData(prev => ({ ...prev, [noRawat]: [] }));
    } finally {
      setLoadingLab(prev => ({ ...prev, [noRawat]: false }));
    }
  }, [labData]);

  const fetchRadData = useCallback(async (noRawat) => {
    if (radData[noRawat]) return;
    setLoadingRad(prev => ({ ...prev, [noRawat]: true }));
    try {
      const urls = [
        `/rawat-inap/radiologi/${encodeURIComponent(noRawat)}`,
        `/rawat-jalan/radiologi/${encodeURIComponent(noRawat)}`
      ];
      const all = [];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!res.ok) continue;
          const json = await res.json();
          const data = Array.isArray(json.data) ? json.data : [];
          all.push(...data);
        } catch {}
      }
      setRadData(prev => ({ ...prev, [noRawat]: all }));
    } catch {
      setRadData(prev => ({ ...prev, [noRawat]: [] }));
    } finally {
      setLoadingRad(prev => ({ ...prev, [noRawat]: false }));
    }
  }, [radData]);

  const fetchSoapData = useCallback(async (noRawat) => {
    if (soapData[noRawat]) return;
    setLoadingSoap(prev => ({ ...prev, [noRawat]: true }));
    try {
      const params = new URLSearchParams();
      if (token) params.set('t', token);
      params.set('no_rawat', noRawat);
      const urls = [
        `/rawat-inap/pemeriksaan-ranap?${params.toString()}`,
        `/rawat-jalan/pemeriksaan-ralan?${params.toString()}`
      ];
      const all = [];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!res.ok) continue;
          const json = await res.json();
          const data = Array.isArray(json.data) ? json.data : [];
          const normalized = data.map((row) => ({
            ...row,
            jam: row.jam_rawat || row.jam || ''
          }));
          all.push(...normalized);
        } catch {}
      }
      all.sort((a, b) => {
        const da = a.tgl_perawatan || '';
        const db = b.tgl_perawatan || '';
        const ta = a.jam_rawat || '';
        const tb = b.jam_rawat || '';
        const diffDate = new Date(db) - new Date(da);
        if (diffDate !== 0) return diffDate;
        return String(tb).localeCompare(String(ta));
      });
      setSoapData(prev => ({ ...prev, [noRawat]: all }));
    } catch {
      setSoapData(prev => ({ ...prev, [noRawat]: [] }));
    } finally {
      setLoadingSoap(prev => ({ ...prev, [noRawat]: false }));
    }
  }, [soapData, token]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        setError('');
        const hasNoRkm = noRkmMedis && String(noRkmMedis).trim() !== '';
        const qs = hasNoRkm
          ? `no_rkm_medis=${encodeURIComponent(noRkmMedis)}`
          : (token ? `t=${encodeURIComponent(token)}` : '');
        const res = await fetch(`/rawat-jalan/riwayat?${qs}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('Gagal memuat riwayat');
        const json = await res.json();
        const rawData = Array.isArray(json.data) ? json.data : [];
        const seen = new Set();
        const data = [];
        for (const item of rawData) {
          const key = item.no_rawat || '';
          if (key && seen.has(key)) continue;
          if (key) seen.add(key);
          data.push(item);
        }
        setItems(data);
        if (data.length > 0) {
          const first = data[0];
          setExpandedVisit(first);
          setOpenSections(prev => ({ ...prev, [first.no_rawat]: { obat: false, lab: false, rad: false, soap: false } }));
          fetchMedicationData(first.no_rawat);
          fetchLabData(first.no_rawat);
          fetchRadData(first.no_rawat);
          fetchSoapData(first.no_rawat);
        }
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [token, noRkmMedis]);

  const toggleVisitDetails = (visit) => {
    if (expandedVisit && expandedVisit.no_rawat === visit.no_rawat) {
      setExpandedVisit(null);
    } else {
      setExpandedVisit(visit);
      setOpenSections(prev => ({ ...prev, [visit.no_rawat]: { obat: false, lab: false, rad: false, soap: false } }));
      fetchMedicationData(visit.no_rawat);
      fetchLabData(visit.no_rawat);
      fetchRadData(visit.no_rawat);
      fetchSoapData(visit.no_rawat);
    }
  };

  const renderMedicationTable = (noRawat) => {
    const medications = medicationData[noRawat] || [];
    const isLoading = loadingMedication[noRawat];
    if (isLoading) {
      return (
        <div className="text-center py-6 text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xs">Memuat data obat...</span>
          </div>
        </div>
      );
    }
    if (medications.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-xs">Belum ada data obat untuk kunjungan ini</p>
        </div>
      );
    }
    const groupedByDate = medications.reduce((acc, item) => {
      const key = item.tgl_perawatan || '-';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
      if (a === '-') return 1;
      if (b === '-') return -1;
      return new Date(b) - new Date(a);
    });
    const formatDateId = (date) => {
      if (!date || date === '-') return '-';
      try {
        return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      } catch {
        return date;
      }
    };
    const totalItems = medications.length;
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 px-4 py-3 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded-md bg-white/80 text-green-600">
              <BeakerIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-sm">Riwayat Obat</h3>
              <p className="text-xs text-gray-600">{totalItems} item obat</p>
            </div>
          </div>
        </div>
        <div>
          {sortedDates.map((dateKey) => {
            const items = groupedByDate[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
            return (
              <div key={dateKey} className="border-t border-gray-100">
                <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-700">{formatDateId(dateKey)}</div>
                  <div className="text-[11px] text-gray-500">{items.length} item</div>
                </div>
                <div className="md:hidden divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <div key={`${item.kode_brng}-${item.jam}-${index}`} className="px-4 py-3 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                        <div className="mt-1 text-xs text-gray-500">{item.aturan || '-'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-900">{item.jml || '-'}</div>
                        <div className="text-[11px] text-gray-400">{item.jam || ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aturan Pakai</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {items.map((item, index) => (
                        <tr key={`${item.kode_brng}-${item.jam}-${index}`}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{item.jam || ''}</div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.jml || '-'}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.aturan || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderGroupedByDate = (rows, options = {}) => {
    const { title, emptyIcon, columns, mobileTemplate } = options;
    if (!Array.isArray(rows) || rows.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          {emptyIcon}
          <p className="text-xs">Belum ada data {title}</p>
        </div>
      );
    }
    const grouped = rows.reduce((acc, item) => {
      const key = item.tgl_periksa || item.tgl_perawatan || '-';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      if (a === '-') return 1;
      if (b === '-') return -1;
      return new Date(b) - new Date(a);
    });
    const formatDateId = (date) => {
      if (!date || date === '-') return '-';
      try {
        return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      } catch {
        return date;
      }
    };
    return (
      <div>
        {sortedDates.map((dateKey) => {
          const items = grouped[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
          return (
            <div key={dateKey} className="border-t border-gray-100">
              <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                <div className="text-xs font-medium text-gray-700">{formatDateId(dateKey)}</div>
                <div className="text-[11px] text-gray-500">{items.length} item</div>
              </div>
              <div className="md:hidden divide-y divide-gray-100">
                {items.map((item, idx) => (
                  <div key={idx} className="px-4 py-3">{mobileTemplate(item)}</div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((c) => (
                        <th key={c.key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{c.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        {columns.map((c) => (
                          <td key={c.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{c.render(item)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLab = (noRawat) => {
    const rows = labData[noRawat] || [];
    const isLoading = loadingLab[noRawat];
    if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data lab...</div>);
    return renderGroupedByDate(rows, {
      title: 'lab',
      emptyIcon: <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
      columns: [
        { key: 'pemeriksaan', header: 'Pemeriksaan', render: (r) => (
          <div>
            <div className="text-sm">{r.pemeriksaan || '-'}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
          </div>
        )},
        { key: 'nilai', header: 'Nilai', render: (r) => r.nilai || '-' },
        { key: 'satuan', header: 'Satuan', render: (r) => r.satuan || '-' },
        { key: 'rujukan', header: 'Nilai Rujukan', render: (r) => r.nilai_rujukan || '-' },
        { key: 'ket', header: 'Keterangan', render: (r) => r.keterangan || '-' },
      ],
      mobileTemplate: (r) => (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-gray-900">{r.pemeriksaan || '-'}</div>
            <div className="mt-1 text-xs text-gray-500">{r.nilai || '-'} {r.satuan || ''}</div>
            <div className="mt-0.5 text-[11px] text-gray-400">{r.nilai_rujukan || '-'} · {r.jam || ''}</div>
          </div>
          <div className="text-right text-xs text-gray-600">{r.keterangan || '-'}</div>
        </div>
      )
    });
  };

  const renderRadiologi = (noRawat) => {
    const rows = radData[noRawat] || [];
    const isLoading = loadingRad[noRawat];
    if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data radiologi...</div>);
    return renderGroupedByDate(rows, {
      title: 'radiologi',
      emptyIcon: <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
      columns: [
        { key: 'hasil', header: 'Hasil', render: (r) => (
          <div>
            <div className="text-sm">{r.hasil || '-'}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
          </div>
        )},
      ],
      mobileTemplate: (r) => (
        <div>
          <div className="text-sm text-gray-900">{r.hasil || '-'}</div>
          <div className="mt-0.5 text-[11px] text-gray-400">{r.jam || ''}</div>
        </div>
      )
    });
  };

  const renderSoap = (noRawat) => {
    const rows = soapData[noRawat] || [];
    const isLoading = loadingSoap[noRawat];
    if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data SOAP...</div>);
    return renderGroupedByDate(rows, {
      title: 'SOAP',
      emptyIcon: <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
      columns: [
        {
          key: 'waktu',
          header: 'Waktu',
          render: (r) => {
            const jam = (r.jam || '').substring(0, 5);
            return (
              <div>
                <div className="text-sm">{jam || '-'}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{r.kesadaran || ''}</div>
              </div>
            );
          }
        },
        { key: 'keluhan', header: 'Keluhan', render: (r) => r.keluhan || '-' },
        { key: 'pemeriksaan', header: 'Pemeriksaan', render: (r) => r.pemeriksaan || '-' },
        { key: 'penilaian', header: 'Penilaian', render: (r) => r.penilaian || '-' },
        {
          key: 'rencana',
          header: 'Rencana / Instruksi',
          render: (r) => (
            <div>
              <div className="text-sm">{r.rtl || '-'}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{r.instruksi || ''}</div>
            </div>
          )
        },
        { key: 'evaluasi', header: 'Evaluasi', render: (r) => r.evaluasi || '-' },
      ],
      mobileTemplate: (r) => {
        const jam = (r.jam || '').substring(0, 5) || '-';
        const parts = [];
        if (r.rtl) parts.push(r.rtl);
        if (r.instruksi) parts.push(r.instruksi);
        if (r.evaluasi) parts.push(r.evaluasi);
        const plan = parts.join(' ');
        return (
          <div className="space-y-1 text-xs text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">{jam}</span>
              <span className="text-gray-400">{r.kesadaran || ''}</span>
            </div>
            {r.keluhan && (
              <div>
                <span className="font-semibold">S: </span>
                <span>{r.keluhan}</span>
              </div>
            )}
            {r.pemeriksaan && (
              <div>
                <span className="font-semibold">O: </span>
                <span>{r.pemeriksaan}</span>
              </div>
            )}
            {r.penilaian && (
              <div>
                <span className="font-semibold">A: </span>
                <span>{r.penilaian}</span>
              </div>
            )}
            {plan && (
              <div>
                <span className="font-semibold">P: </span>
                <span>{plan}</span>
              </div>
            )}
          </div>
        );
      }
    });
  };

  const toggleSection = async (noRawat, key) => {
    setOpenSections(prev => {
      const prevForVisit = prev[noRawat] || { obat: false, lab: false, rad: false, soap: false };
      const nextVal = !prevForVisit[key];
      return { ...prev, [noRawat]: { ...prevForVisit, [key]: nextVal } };
    });
    try {
      if (key === 'obat' && !medicationData[noRawat]) {
        await fetchMedicationData(noRawat);
      } else if (key === 'lab' && !labData[noRawat]) {
        await fetchLabData(noRawat);
      } else if (key === 'rad' && !radData[noRawat]) {
        await fetchRadData(noRawat);
      } else if (key === 'soap' && !soapData[noRawat]) {
        await fetchSoapData(noRawat);
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="grid gap-3 md:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
              <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
        <div className="hidden md:block space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-5 w-60 bg-gray-200 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-3 h-4 w-full bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-gray-500 text-sm">Belum ada riwayat kunjungan</div>
      ) : (
        items.map((row) => (
          <div key={row.no_rawat} className="rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => toggleVisitDetails(row)}
              className="w-full text-left px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="font-mono text-sm text-gray-800">{row.no_rawat}</div>
                <div className="text-xs text-gray-500">{new Date(row.tgl_registrasi).toLocaleDateString('id-ID')} · {String(row.jam_reg || '').substring(0, 5)}</div>
              </div>
              {expandedVisit && expandedVisit.no_rawat === row.no_rawat ? (
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                </svg>
              )}
            </button>
            {expandedVisit && expandedVisit.no_rawat === row.no_rawat && (
              <div className="px-4 pb-4 space-y-3">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(row.no_rawat, 'obat')}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">Riwayat Obat</span>
                      <span className="text-[11px] text-gray-500">{(medicationData[row.no_rawat] || []).length} item</span>
                    </div>
                    {openSections[row.no_rawat]?.obat ? (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    )}
                  </button>
                  <div className={`${openSections[row.no_rawat]?.obat ? 'block' : 'hidden'} p-2`}>
                    {renderMedicationTable(row.no_rawat)}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(row.no_rawat, 'lab')}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">Riwayat Lab</span>
                      <span className="text-[11px] text-gray-500">{(labData[row.no_rawat] || []).length} item</span>
                    </div>
                    {openSections[row.no_rawat]?.lab ? (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    )}
                  </button>
                  <div className={`${openSections[row.no_rawat]?.lab ? 'block' : 'hidden'} p-2`}>
                    {renderLab(row.no_rawat)}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(row.no_rawat, 'rad')}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">Riwayat Radiologi</span>
                      <span className="text-[11px] text-gray-500">{(radData[row.no_rawat] || []).length} item</span>
                    </div>
                    {openSections[row.no_rawat]?.rad ? (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    )}
                  </button>
                  <div className={`${openSections[row.no_rawat]?.rad ? 'block' : 'hidden'} p-2`}>
                    {renderRadiologi(row.no_rawat)}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(row.no_rawat, 'soap')}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">Riwayat SOAP</span>
                      <span className="text-[11px] text-gray-500">{(soapData[row.no_rawat] || []).length} item</span>
                    </div>
                    {openSections[row.no_rawat]?.soap ? (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    )}
                  </button>
                  <div className={`${openSections[row.no_rawat]?.soap ? 'block' : 'hidden'} p-2`}>
                    {renderSoap(row.no_rawat)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
