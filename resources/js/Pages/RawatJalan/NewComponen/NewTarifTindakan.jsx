import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '@/Components/Alert'
import ConfirmationAlert from '@/Components/ConfirmationAlert'
import { todayDateString, nowDateTimeString } from '@/tools/datetime'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewTarifTindakan({ token, noRawat = '' }) {
  const [activeTab, setActiveTab] = useState('dokter')
  const [jnsPerawatan, setJnsPerawatan] = useState([])
  const [filteredPerawatan, setFilteredPerawatan] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTindakan, setSelectedTindakan] = useState([])
  const [dokters, setDokters] = useState([])
  const [selectedDokter, setSelectedDokter] = useState('')
  const [petugas, setPetugas] = useState([])
  const [selectedPetugas, setSelectedPetugas] = useState('')
  const [riwayatTindakan, setRiwayatTindakan] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [postingLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ type: 'success', title: '', message: '', autoClose: true })
  const [showConfirmAlert, setShowConfirmAlert] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState({ title: '', message: '', onConfirm: null })

  const loadJnsPerawatan = async () => {
    try {
      setLoading(true)
      let jenisTarif = ''
      if (activeTab === 'dokter') jenisTarif = 'dokter'
      else if (activeTab === 'perawat') jenisTarif = 'perawat'
      else if (activeTab === 'dokter-perawat') jenisTarif = 'dokter_perawat'
      const response = await axios.get('/api/tarif-tindakan', { params: { token, jenis_tarif: jenisTarif } })
      const list = response?.data?.data || []
      setJnsPerawatan(list)
      setFilteredPerawatan(list)
    } catch (_) {
      setAlertConfig({ type: 'error', title: 'Error', message: 'Gagal memuat data jenis perawatan', autoClose: true })
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const loadDokters = async () => {
    try {
      const response = await axios.get('/api/tarif-tindakan/dokter', { params: { token } })
      setDokters(response?.data?.data || [])
    } catch (_) {
      setAlertConfig({ type: 'error', title: 'Error', message: 'Gagal memuat data dokter', autoClose: true })
      setShowAlert(true)
    }
  }

  const loadPetugas = async () => {
    try {
      const response = await axios.get('/api/tarif-tindakan/petugas', { params: { token } })
      setPetugas(response?.data?.data || [])
    } catch (_) {
      setAlertConfig({ type: 'error', title: 'Error', message: 'Gagal memuat data petugas', autoClose: true })
      setShowAlert(true)
    }
  }

  const loadRiwayatTindakan = async () => {
    try {
      const response = await axios.get(`/api/tarif-tindakan/riwayat/${encodeURIComponent(noRawat)}`, { params: { token } })
      if (response?.data?.success) {
        const data = response?.data?.data || {}
        const all = [...(data.tindakan_dokter || []), ...(data.tindakan_perawat || []), ...(data.tindakan_dokter_perawat || [])]
        all.sort((a, b) => new Date(`${b.tgl_perawatan} ${b.jam_rawat}`) - new Date(`${a.tgl_perawatan} ${a.jam_rawat}`))
        setRiwayatTindakan(all)
      } else {
        setRiwayatTindakan([])
      }
    } catch (_) {
      setRiwayatTindakan([])
    }
  }

  useEffect(() => {
    loadJnsPerawatan()
    loadRiwayatTindakan()
    loadDokters()
    loadPetugas()
  }, [noRawat])

  useEffect(() => {
    setSelectedDokter('')
    setSelectedPetugas('')
    loadJnsPerawatan()
  }, [activeTab])

  useEffect(() => {
    if (!Array.isArray(jnsPerawatan)) {
      setFilteredPerawatan([])
      return
    }
    const q = searchTerm.toLowerCase()
    setFilteredPerawatan(jnsPerawatan.filter((it) => (it.nm_perawatan || '').toLowerCase().includes(q) || (it.kd_jenis_prw || '').toLowerCase().includes(q)))
  }, [searchTerm, jnsPerawatan])

  const handleSubmitTindakan = async () => {
    if (!selectedTindakan || selectedTindakan.length === 0) {
      setAlertConfig({ type: 'warning', title: 'Peringatan', message: 'Pilih tindakan terlebih dahulu', autoClose: true })
      setShowAlert(true)
      return
    }
    if ((activeTab === 'dokter' || activeTab === 'dokter-perawat') && !selectedDokter) {
      setAlertConfig({ type: 'warning', title: 'Peringatan', message: 'Pilih dokter terlebih dahulu', autoClose: true })
      setShowAlert(true)
      return
    }
    if ((activeTab === 'perawat' || activeTab === 'dokter-perawat') && !selectedPetugas) {
      setAlertConfig({ type: 'warning', title: 'Peringatan', message: 'Pilih petugas terlebih dahulu', autoClose: true })
      setShowAlert(true)
      return
    }
    try {
      setLoading(true)
      const currentDate = todayDateString()
      const currentTime = nowDateTimeString().slice(11, 19)
      let endpoint = ''
      if (activeTab === 'dokter') endpoint = '/api/tarif-tindakan/dokter'
      else if (activeTab === 'perawat') endpoint = '/api/tarif-tindakan/perawat'
      else if (activeTab === 'dokter-perawat') endpoint = '/api/tarif-tindakan/dokter-perawat'
      const promises = selectedTindakan.map((tindakan) => {
        const data = { token, no_rawat: noRawat, kd_jenis_prw: tindakan.kd_jenis_prw, tgl_perawatan: currentDate, jam_rawat: currentTime }
        if (activeTab === 'dokter' || activeTab === 'dokter-perawat') data.kd_dokter = selectedDokter
        if (activeTab === 'perawat' || activeTab === 'dokter-perawat') data.nip = selectedPetugas
        return axios.post(endpoint, data)
      })
      const responses = await Promise.all(promises)
      const ok = responses.every((r) => (r.status === 200 || r.status === 201) && r?.data?.success)
      if (ok) {
        setAlertConfig({ type: 'success', title: 'Berhasil', message: 'Tindakan berhasil disimpan', autoClose: true })
        setShowAlert(true)
        setSelectedTindakan([])
        loadRiwayatTindakan()
      } else {
        setAlertConfig({ type: 'error', title: 'Error', message: 'Gagal menyimpan tindakan', autoClose: true })
        setShowAlert(true)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Gagal menyimpan tindakan'
      setAlertConfig({ type: 'error', title: 'Error', message: errorMessage, autoClose: true })
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTindakan = (item) => {
    setConfirmConfig({
      title: 'Hapus Tindakan',
      message: 'Yakin menghapus tindakan ini?',
      onConfirm: async () => {
        try {
          setLoading(true)
          const deleteData = { token, no_rawat: item.no_rawat, kd_jenis_prw: item.kd_jenis_prw, tgl_perawatan: item.tgl_perawatan, jam_rawat: item.jam_rawat, jenis_tindakan: item.jenis_tindakan }
          await axios.delete('/api/tarif-tindakan', { data: deleteData })
          setAlertConfig({ type: 'success', title: 'Berhasil', message: 'Tindakan berhasil dihapus', autoClose: true })
          setShowAlert(true)
          loadRiwayatTindakan()
        } catch (error) {
          const errorMessage = error?.response?.data?.message || 'Gagal menghapus tindakan'
          setAlertConfig({ type: 'error', title: 'Error', message: errorMessage, autoClose: true })
          setShowAlert(true)
        } finally {
          setLoading(false)
        }
        setShowConfirmAlert(false)
      },
    })
    setShowConfirmAlert(true)
  }

  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount || 0)
  }

  return (
    <>
      <div className="space-y-4 text-[oklch(98.5%_0_0)]">
        <div className="flex border-b border-[oklch(84.1%_0.238_128.85_/_0.35)] gap-2">
          {[{ key: 'dokter', label: 'Dokter' }, { key: 'perawat', label: 'Perawat' }, { key: 'dokter-perawat', label: 'Dokter + Perawat' }].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === tab.key ? 'border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)]' : 'border-transparent text-[oklch(98.5%_0_0_/_0.6)] hover:text-[oklch(98.5%_0_0)]'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {(activeTab === 'dokter' || activeTab === 'dokter-perawat') && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-2/5">
                <label className="text-xs">Pilih Dokter</label>
                <select value={selectedDokter} onChange={(e) => setSelectedDokter(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent">
                  <option value="">Pilih dokter…</option>
                  {dokters.map((d) => (
                    <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                  ))}
                </select>
              </div>
              <div className="w-3/5">
                <label className="text-xs">Cari Tindakan</label>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Ketik nama/kode tindakan" />
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'perawat' || activeTab === 'dokter-perawat') && (
          <div className="space-y-2">
            <label className="text-xs">Pilih Petugas</label>
            <select value={selectedPetugas} onChange={(e) => setSelectedPetugas(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent">
              <option value="">Pilih petugas…</option>
              {petugas.map((p) => (
                <option key={p.nip} value={p.nip}>{p.nama}</option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          {!(activeTab === 'dokter' || activeTab === 'dokter-perawat') && (
            <>
              <label className="text-xs">Cari Tindakan</label>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Ketik nama/kode tindakan" />
            </>
          )}
          <div className="max-h-48 overflow-y-auto border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md">
            <AnimatePresence initial={false}>
              {selectedTindakan.map((item) => (
                <motion.div
                  key={`selected-${item.kd_jenis_prw}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="w-full px-3 py-2 text-left text-xs border-b border-[oklch(84.1%_0.238_128.85_/_0.25)] flex items-center gap-3 bg-[oklch(14.5%_0_0_/_0.4)]"
                >
                  <input type="checkbox" checked onChange={() => {
                    setSelectedTindakan(selectedTindakan.filter((s) => s.kd_jenis_prw !== item.kd_jenis_prw))
                  }} className="rounded border-[oklch(84.1%_0.238_128.85_/_0.35)]" />
                  <div className="flex-1">
                    <div className="font-semibold text-[12px]">{item.nm_perawatan}</div>
                    <div className="text-[11px] opacity-70">{item.kd_jenis_prw}</div>
                  </div>
                  <div className="text-[12px] font-semibold">
                    {formatCurrency(activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 : activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 : activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {filteredPerawatan.length > 0 ? (
                filteredPerawatan.map((item) => (
                  !selectedTindakan.some((s) => s.kd_jenis_prw === item.kd_jenis_prw) && (
                    <motion.div
                      key={item.kd_jenis_prw}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="w-full px-3 py-2 text-left text-xs border-b border-[oklch(84.1%_0.238_128.85_/_0.25)] flex items-center gap-3"
                    >
                      <input type="checkbox" checked={selectedTindakan.some((s) => s.kd_jenis_prw === item.kd_jenis_prw)} onChange={(e) => {
                        if (e.target.checked) setSelectedTindakan([...selectedTindakan, item])
                        else setSelectedTindakan(selectedTindakan.filter((s) => s.kd_jenis_prw !== item.kd_jenis_prw))
                      }} className="rounded border-[oklch(84.1%_0.238_128.85_/_0.35)]" />
                      <div className="flex-1">
                        <div className="font-semibold text-[12px]">{item.nm_perawatan}</div>
                        <div className="text-[11px] opacity-70">{item.kd_jenis_prw}</div>
                      </div>
                      <div className="text-[12px] font-semibold">
                        {formatCurrency(activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 : activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 : activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0)}
                      </div>
                    </motion.div>
                  )
                ))
              ) : (
                selectedTindakan.length === 0 && <div className="px-3 py-2 text-[11px] opacity-70">Tidak ada data</div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          {selectedTindakan.map((item) => (
            <div key={item.kd_jenis_prw} className="flex justify-between items-center py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.25)]">
              <div className="flex-1">
                <div className="font-medium text-[12px]">{item.nm_perawatan}</div>
                <div className="text-[11px] opacity-70">{item.kd_jenis_prw}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-semibold">
                  {formatCurrency(activeTab === 'dokter' ? parseFloat(item.total_byrdr) || 0 : activeTab === 'perawat' ? parseFloat(item.total_byrpr) || 0 : activeTab === 'dokter-perawat' ? parseFloat(item.total_byrdrpr) || 0 : 0)}
                </span>
                <button onClick={() => setSelectedTindakan(selectedTindakan.filter((s) => s.kd_jenis_prw !== item.kd_jenis_prw))} className="text-[oklch(98.5%_0_0_/_0.6)] hover:text-[oklch(98.5%_0_0)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
          <div className="flex justify-between items-center">
            <div className="text-[12px]">Total Biaya</div>
            <div className="text-sm font-bold">
              {formatCurrency(selectedTindakan.reduce((total, item) => {
                let tarif = 0
                if (activeTab === 'dokter') tarif = parseFloat(item.total_byrdr) || 0
                else if (activeTab === 'perawat') tarif = parseFloat(item.total_byrpr) || 0
                else if (activeTab === 'dokter-perawat') tarif = parseFloat(item.total_byrdrpr) || 0
                return total + tarif
              }, 0))}
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={handleSubmitTindakan} disabled={loading || postingLoading} className="px-4 py-2 border border-[oklch(84.1%_0.238_128.85)] rounded-md hover:bg-neutral-800 disabled:opacity-50">
              {loading || postingLoading ? 'Menyimpan…' : `Simpan ${selectedTindakan.length} Tindakan`}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[12px] font-medium">Riwayat Tindakan</div>
          {Array.isArray(riwayatTindakan) && riwayatTindakan.length > 0 ? (
            <div className="space-y-2">
              {riwayatTindakan.map((item, index) => {
                const jenis = item.jenis_tindakan
                const label = jenis === 'dokter' ? 'Dokter' : jenis === 'perawat' ? 'Perawat' : jenis === 'dokter_perawat' ? 'Dokter + Perawat' : ''
                return (
                  <div key={item.id || index} className="border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-[12px]">{item.nm_perawatan}</div>
                          <span className="px-2 py-0.5 text-[10px] rounded-full border border-[oklch(84.1%_0.238_128.85_/_0.35)]">{label}</span>
                        </div>
                        <div className="text-[11px] opacity-70">Kode: {item.kd_jenis_prw}</div>
                        <div className="text-[12px] font-medium">Tarif: {formatCurrency(item.biaya_rawat)}</div>
                        <div className="flex items-center gap-4 mt-1 text-[11px] opacity-80">
                          <div>{item.tgl_perawatan} {item.jam_rawat}</div>
                          {item.dokter && <div>Dr. {item.dokter.nm_dokter}</div>}
                          {item.perawat && <div>{item.perawat.nama}</div>}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteTindakan(item)} className="text-[oklch(98.5%_0_0_/_0.6)] hover:text-[oklch(98.5%_0_0)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-[11px] opacity-70">Belum ada tindakan</div>
          )}
        </div>
      </div>

      <Alert isOpen={showAlert} type={alertConfig.type} title={alertConfig.title} message={alertConfig.message} autoClose={alertConfig.autoClose} onClose={() => setShowAlert(false)} />
      <ConfirmationAlert isOpen={showConfirmAlert} type="warning" title={confirmConfig.title} message={confirmConfig.message} confirmText="Ya, Hapus" cancelText="Batal" onConfirm={confirmConfig.onConfirm} onCancel={() => setShowConfirmAlert(false)} onClose={() => setShowConfirmAlert(false)} />
    </>
  )
}
