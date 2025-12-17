import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@/Components/Alert';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';

const TarifTindakan = ({ token, noRkmMedis, noRawat, kdBangsal, kdPj }) => {
  const [activeTab, setActiveTab] = useState('dokter');
  const [jnsPerawatan, setJnsPerawatan] = useState([]);
  const [filteredPerawatan, setFilteredPerawatan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTindakan, setSelectedTindakan] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState('');
  const [petugas, setPetugas] = useState([]);
  const [selectedPetugas, setSelectedPetugas] = useState('');
  const [riwayatTindakan, setRiwayatTindakan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postingLoading, setPostingLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success',
    title: '',
    message: '',
    autoClose: true,
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const loadJnsPerawatan = async (search = '') => {
    try {
      setLoading(true);
      let jenisTarif = '';
      switch (activeTab) {
        case 'dokter':
          jenisTarif = 'dokter';
          break;
        case 'perawat':
          jenisTarif = 'perawat';
          break;
        case 'dokter-perawat':
          jenisTarif = 'dokter_perawat';
          break;
      }
      const response = await axios.get('/api/tarif-tindakan-ranap', {
        params: {
          token,
          jenis_tarif: jenisTarif,
          kd_bangsal: kdBangsal || undefined,
          kd_pj: kdPj || undefined,
          search: search || undefined,
        },
      });
      const data = Array.isArray(response.data?.data) ? response.data.data : [];
      setJnsPerawatan(data);
      setFilteredPerawatan(data);
    } catch (error) {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'Gagal memuat data jenis perawatan ranap',
        autoClose: true,
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const loadDokters = async () => {
    try {
      const res = await axios.get('/api/tarif-tindakan/dokter', { params: { token } });
      setDokters(res.data?.data || []);
    } catch {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'Gagal memuat data dokter',
        autoClose: true,
      });
      setShowAlert(true);
    }
  };

  const loadPetugas = async () => {
    try {
      const res = await axios.get('/api/tarif-tindakan/petugas', { params: { token } });
      setPetugas(res.data?.data || []);
    } catch {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'Gagal memuat data petugas',
        autoClose: true,
      });
      setShowAlert(true);
    }
  };

  const loadRiwayatTindakan = async () => {
    try {
      const encodedNoRawat = encodeURIComponent(noRawat || '');
      const response = await axios.get(`/api/tarif-tindakan-ranap/riwayat/${encodedNoRawat}`, {
        params: { token },
      });
      if (response.data?.success) {
        const data = response.data.data || {};
        const all = [
          ...(Array.isArray(data.tindakan_dokter) ? data.tindakan_dokter : []),
          ...(Array.isArray(data.tindakan_perawat) ? data.tindakan_perawat : []),
          ...(Array.isArray(data.tindakan_dokter_perawat) ? data.tindakan_dokter_perawat : []),
        ];
        all.sort((a, b) => {
          const da = new Date(`${a.tgl_perawatan} ${a.jam_rawat}`);
          const db = new Date(`${b.tgl_perawatan} ${b.jam_rawat}`);
          return db - da;
        });
        setRiwayatTindakan(all);
      } else {
        setRiwayatTindakan([]);
      }
    } catch {
      setRiwayatTindakan([]);
    }
  };

  useEffect(() => {
    loadDokters();
    loadPetugas();
  }, []);

  useEffect(() => {
    loadRiwayatTindakan();
  }, [token, noRawat]);

  useEffect(() => {
    setSelectedDokter('');
    setSelectedPetugas('');
    setSelectedTindakan([]);
  }, [activeTab]);

  useEffect(() => {
    const handle = setTimeout(() => {
      loadJnsPerawatan(searchTerm);
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm, activeTab, kdBangsal, kdPj]);

  useEffect(() => {
    if (!Array.isArray(jnsPerawatan)) {
      setFilteredPerawatan([]);
      return;
    }
    const filtered = jnsPerawatan.filter(
      (item) =>
        item.nm_perawatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kd_jenis_prw?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPerawatan(filtered);
  }, [searchTerm, jnsPerawatan]);

  const handleSubmitTindakan = async () => {
    if (!selectedTindakan || selectedTindakan.length === 0) {
      setAlertConfig({
        type: 'warning',
        title: 'Peringatan',
        message: 'Pilih tindakan terlebih dahulu',
        autoClose: true,
      });
      setShowAlert(true);
      return;
    }
    if ((activeTab === 'dokter' || activeTab === 'dokter-perawat') && !selectedDokter) {
      setAlertConfig({
        type: 'warning',
        title: 'Peringatan',
        message: 'Pilih dokter terlebih dahulu',
        autoClose: true,
      });
      setShowAlert(true);
      return;
    }
    if ((activeTab === 'perawat' || activeTab === 'dokter-perawat') && !selectedPetugas) {
      setAlertConfig({
        type: 'warning',
        title: 'Peringatan',
        message: 'Pilih petugas terlebih dahulu',
        autoClose: true,
      });
      setShowAlert(true);
      return;
    }
    try {
      setLoading(true);
      let endpoint = '';
      const currentDate = todayDateString();
      const currentTime = nowDateTimeString().split(' ')[1].substring(0, 8);
      switch (activeTab) {
        case 'dokter':
          endpoint = '/api/tarif-tindakan-ranap/dokter';
          break;
        case 'perawat':
          endpoint = '/api/tarif-tindakan-ranap/perawat';
          break;
        case 'dokter-perawat':
          endpoint = '/api/tarif-tindakan-ranap/dokter-perawat';
          break;
      }
      const promises = selectedTindakan.map((tindakan) => {
        const data = {
          token,
          no_rawat: noRawat,
          kd_jenis_prw: tindakan.kd_jenis_prw,
          tgl_perawatan: currentDate,
          jam_rawat: currentTime,
        };
        if (activeTab === 'dokter' || activeTab === 'dokter-perawat') {
          data.kd_dokter = selectedDokter;
        }
        if (activeTab === 'perawat' || activeTab === 'dokter-perawat') {
          data.nip = selectedPetugas;
        }
        return axios.post(endpoint, data);
      });
      const responses = await Promise.all(promises);
      const allSuccess = responses.every(
        (response) => (response.status === 200 || response.status === 201) && response.data?.success
      );
      if (allSuccess) {
        setAlertConfig({
          type: 'success',
          title: 'Berhasil',
          message: `${selectedTindakan.length} tindakan ranap disimpan.`,
          autoClose: true,
        });
        setShowAlert(true);
        setSelectedTindakan([]);
        setSelectedDokter('');
        setSelectedPetugas('');
        setSearchTerm('');
        loadRiwayatTindakan();
      } else {
        setAlertConfig({
          type: 'error',
          title: 'Error',
          message: 'Beberapa tindakan gagal disimpan',
          autoClose: true,
        });
        setShowAlert(true);
      }
    } catch (error) {
      let errorMessage = 'Gagal menyimpan tindakan ranap';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        autoClose: true,
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
      setPostingLoading(false);
    }
  };

  return (
    <>
      <Alert
        isOpen={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setShowAlert(false)}
        autoClose={alertConfig.autoClose}
      />
      <div className="space-y-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'dokter', label: 'Dokter', color: 'blue' },
            { key: 'perawat', label: 'Perawat', color: 'green' },
            { key: 'dokter-perawat', label: 'Dokter + Perawat', color: 'purple' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key ? `bg-${tab.color}-500 text-white shadow-sm` : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(activeTab === 'dokter' || activeTab === 'dokter-perawat') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pilih Dokter</label>
            <select
              value={selectedDokter}
              onChange={(e) => setSelectedDokter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="">-- Pilih Dokter --</option>
              {(dokters || []).map((dokter) => (
                <option key={dokter.kd_dokter} value={dokter.kd_dokter}>
                  {dokter.nm_dokter}
                </option>
              ))}
            </select>
          </div>
        )}

        {(activeTab === 'perawat' || activeTab === 'dokter-perawat') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pilih Petugas</label>
            <select
              value={selectedPetugas}
              onChange={(e) => setSelectedPetugas(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="">-- Pilih Petugas --</option>
              {(petugas || []).map((ptgs) => (
                <option key={ptgs.nip} value={ptgs.nip}>
                  {ptgs.nama}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari tindakan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
            <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {searchTerm && (
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
              {filteredPerawatan.length > 0 ? (
                filteredPerawatan.map((item) => (
                  <div
                    key={item.kd_jenis_prw}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTindakan.some((selected) => selected.kd_jenis_prw === item.kd_jenis_prw)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTindakan([...selectedTindakan, item]);
                        } else {
                          setSelectedTindakan(
                            selectedTindakan.filter((selected) => selected.kd_jenis_prw !== item.kd_jenis_prw)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.nm_perawatan}</div>
                      <div className="text-xs text-gray-500">
                        {item.kd_jenis_prw} -{' '}
                        {formatCurrency(
                          activeTab === 'dokter'
                            ? parseFloat(item.total_byrdr) || 0
                            : activeTab === 'perawat'
                            ? parseFloat(item.total_byrpr) || 0
                            : activeTab === 'dokter-perawat'
                            ? parseFloat(item.total_byrdrpr) || 0
                            : 0
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">Tidak ada tindakan ditemukan</div>
              )}
            </div>
          )}
        </div>

        {selectedTindakan.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-blue-900">Tindakan Dipilih ({selectedTindakan.length})</h4>
              <button onClick={() => setSelectedTindakan([])} className="text-sm text-blue-600 hover:text-blue-800">
                Hapus Semua
              </button>
            </div>

            <div className="space-y-2 mb-3">
              {selectedTindakan.map((item) => (
                <div key={item.kd_jenis_prw} className="flex justify-between items-center bg-white p-2 rounded border">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{item.nm_perawatan}</div>
                    <div className="text-xs text-gray-500">{item.kd_jenis_prw}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(
                        activeTab === 'dokter'
                          ? parseFloat(item.total_byrdr) || 0
                          : activeTab === 'perawat'
                          ? parseFloat(item.total_byrpr) || 0
                          : activeTab === 'dokter-perawat'
                          ? parseFloat(item.total_byrdrpr) || 0
                          : 0
                      )}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedTindakan(selectedTindakan.filter((selected) => selected.kd_jenis_prw !== item.kd_jenis_prw))
                      }
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-blue-200 space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium text-blue-900">
                  Total:{' '}
                  {formatCurrency(
                    selectedTindakan.reduce((total, item) => {
                      let tarif = 0;
                      if (activeTab === 'dokter') {
                        tarif = parseFloat(item.total_byrdr) || 0;
                      } else if (activeTab === 'perawat') {
                        tarif = parseFloat(item.total_byrpr) || 0;
                      } else if (activeTab === 'dokter-perawat') {
                        tarif = parseFloat(item.total_byrdrpr) || 0;
                      }
                      return total + tarif;
                    }, 0)
                  )}
                </div>
                <button
                  onClick={handleSubmitTindakan}
                  disabled={loading || postingLoading}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || postingLoading ? 'Menyimpan...' : `Simpan ${selectedTindakan.length} Tindakan`}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Riwayat Tindakan Ranap</h4>
          {riwayatTindakan.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {riwayatTindakan.map((item, index) => {
                const getBadgeColor = (jenis) => {
                  switch (jenis) {
                    case 'dokter':
                      return 'bg-blue-100 text-blue-800';
                    case 'perawat':
                      return 'bg-green-100 text-green-800';
                    case 'dokter_perawat':
                      return 'bg-purple-100 text-purple-800';
                    default:
                      return 'bg-gray-100 text-gray-800';
                  }
                };
                const getJenisLabel = (jenis) => {
                  switch (jenis) {
                    case 'dokter':
                      return 'Dokter';
                    case 'perawat':
                      return 'Perawat';
                    case 'dokter_perawat':
                      return 'Dokter + Perawat';
                    default:
                      return 'Unknown';
                  }
                };
                return (
                  <div key={item.id || index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-900">{item.nm_perawatan}</h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(item.jenis_tindakan)}`}>
                            {getJenisLabel(item.jenis_tindakan)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Kode: {item.kd_jenis_prw}</p>
                        <p className="text-sm font-medium text-gray-900">Tarif: {formatCurrency(item.biaya_rawat)}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-gray-500">
                            {item.tgl_perawatan} {item.jam_rawat}
                          </p>
                          {item.dokter && (
                            <p className="text-xs text-gray-500">Dr. {item.dokter.nm_dokter}</p>
                          )}
                          {item.perawat && <p className="text-xs text-gray-500">{item.perawat.nama}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm">Belum ada tindakan yang diinput</p>
            </div>
          )}
        </div>
      </div>

      <Alert
        isOpen={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        autoClose={alertConfig.autoClose}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
};

export default TarifTindakan;
