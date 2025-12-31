import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { todayDateString, nowDateTimeString, getAppTimeZone } from "@/tools/datetime"
import { createPageVariants, contentSpring } from "@/tools/motion"
import CopyResep from "@/Pages/RawatJalan/components/CopyResep"

export default function NewResep({ token = "", noRkmMedis = "", noRawat = "", kdPoli = "", onResepSaved = null }) {
  const [items, setItems] = useState([{ id: 1, kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [obatOptions, setObatOptions] = useState([])
  const [searchObat, setSearchObat] = useState({})
  const [loadingObat, setLoadingObat] = useState(false)
  const [showDropdown, setShowDropdown] = useState({})
  const [aturanOptions, setAturanOptions] = useState([])
  const [searchAturan, setSearchAturan] = useState({})
  const [loadingAturan, setLoadingAturan] = useState(false)
  const [showDropdownAturan, setShowDropdownAturan] = useState({})
  const [showMasterAturanModal, setShowMasterAturanModal] = useState(false)
  const [masterAturanInput, setMasterAturanInput] = useState("")
  const [masterAturanSaving, setMasterAturanSaving] = useState(false)
  const [masterAturanItemId, setMasterAturanItemId] = useState(null)
  const [savedResep, setSavedResep] = useState(null)
  const [showSavedResep, setShowSavedResep] = useState(false)
  const [dokterOptions, setDokterOptions] = useState([])
  const [selectedDokter, setSelectedDokter] = useState("")
  const [loadingDokter, setLoadingDokter] = useState(false)
  const [dokterPJ, setDokterPJ] = useState({ kd_dokter: "", nm_dokter: "" })
  const [loadingDokterPJ, setLoadingDokterPJ] = useState(false)
  const [dokterPJError, setDokterPJError] = useState(null)
  const [riwayatResep, setRiwayatResep] = useState([])
  const [showRiwayatResep, setShowRiwayatResep] = useState(false)
  const [loadingRiwayat, setLoadingRiwayat] = useState(false)
  const [deletingResep, setDeletingResep] = useState(null)
  const [hasMoreResep, setHasMoreResep] = useState(false)
  const [nextOffset, setNextOffset] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [selectedResepForCopy, setSelectedResepForCopy] = useState(null)
  const [penyerahanLoading, setPenyerahanLoading] = useState({})
  const [activeTab, setActiveTab] = useState("resep")
  const [dir, setDir] = useState(1)

  const reduced = useReducedMotion()
  const pageVariants = createPageVariants(reduced)

  const fetchObat = async (search = "") => {
    if (!kdPoli) return
    setLoadingObat(true)
    try {
      const response = await axios.get("/api/obat", { params: { kd_poli: kdPoli, search, limit: 20 } })
      if (response?.data?.success) setObatOptions(response.data.data)
      else setObatOptions([])
    } catch (_) {
      setObatOptions([])
    } finally {
      setLoadingObat(false)
    }
  }

  const fetchAturan = async (search = "") => {
    setLoadingAturan(true)
    try {
      const response = await axios.get("/api/aturan-pakai", { params: { search, limit: 20 }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      if (response?.data?.success) setAturanOptions(response.data.data || [])
      else setAturanOptions([])
    } catch (_) {
      setAturanOptions([])
    } finally {
      setLoadingAturan(false)
    }
  }

  const getStokInfo = async (kodeBrng) => {
    try {
      const response = await axios.get("/api/resep/stok-info", { params: { kode_brng: kodeBrng, kd_poli: kdPoli || undefined }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      if (response?.data?.success) return response.data.data
      return null
    } catch (_) {
      return null
    }
  }

  const saveMasterAturan = async () => {
    const val = (masterAturanInput || "").trim()
    if (val === "") return
    setMasterAturanSaving(true)
    try {
      const response = await axios.post("/api/aturan-pakai/public-store", { aturan: val }, { headers: { Accept: "application/json", "Content-Type": "application/json" } })
      if (response?.data?.success) {
        setAturanOptions((prev) => {
          const exists = (prev || []).some((o) => (o.aturan || "") === val)
          return exists ? prev : [{ aturan: val }, ...(prev || [])]
        })
        if (masterAturanItemId) updateItem(masterAturanItemId, "aturanPakai", val)
        setShowMasterAturanModal(false)
        setMasterAturanItemId(null)
      }
    } catch (_) {}
    finally {
      setMasterAturanSaving(false)
    }
  }

  const fetchDokter = async () => {
    setLoadingDokter(true)
    try {
      const response = await axios.get("/api/dokter", { withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      if (response?.data?.success) {
        const validDokters = (response.data.data || []).filter((d) => d.kd_dokter !== "-")
        setDokterOptions(validDokters)
      } else {
        try {
          const respAlt = await axios.get("/api/public/dokter", { withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, params: { search: "" } })
          const arr = Array.isArray(respAlt?.data?.data) ? respAlt.data.data : Array.isArray(respAlt?.data) ? respAlt.data : []
          const normalized = arr.map((d) => ({ kd_dokter: d.kd_dokter ?? d.kode ?? "", nm_dokter: d.nm_dokter ?? d.nama ?? "" })).filter((d) => d.kd_dokter && d.nm_dokter)
          setDokterOptions(normalized)
        } catch (_) {
          setDokterOptions([])
        }
      }
    } catch (_) {
      try {
        const respAlt = await axios.get("/api/public/dokter", { withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, params: { search: "" } })
        const arr = Array.isArray(respAlt?.data?.data) ? respAlt.data.data : Array.isArray(respAlt?.data) ? respAlt.data : []
        const normalized = arr.map((d) => ({ kd_dokter: d.kd_dokter ?? d.kode ?? "", nm_dokter: d.nm_dokter ?? d.nama ?? "" })).filter((d) => d.kd_dokter && d.nm_dokter)
        setDokterOptions(normalized)
      } catch (_) {
        setDokterOptions([])
      }
    } finally {
      setLoadingDokter(false)
    }
  }

  const fetchDokterPenanggungJawab = async () => {
    if (!noRawat) return
    setLoadingDokterPJ(true)
    setDokterPJError(null)
    try {
      let regData = null
      try {
        const respRegExact = await axios.get("/api/reg-periksa/by-rawat", { params: { no_rawat: noRawat }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
        regData = respRegExact?.data?.data || null
      } catch (_) {}

      if (!regData) {
        const respReg = await axios.get("/api/reg-periksa", { params: { search: noRawat, per_page: 1 }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
        regData = respReg?.data?.data?.data?.[0] || null
      }

      if (regData?.kd_dokter && regData.kd_dokter !== "-") {
        const kd = regData.kd_dokter
        let nm = regData?.dokter?.nm_dokter || regData?.doctor?.nm_dokter || ""
        if (!nm) {
          try {
            const respDokter = await axios.get(`/api/dokter/${encodeURIComponent(kd)}`, { withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
            nm = respDokter?.data?.data?.nm_dokter || nm
          } catch (_) {}
        }
        setDokterPJ({ kd_dokter: kd, nm_dokter: nm || kd })
        setDokterOptions((prev) => {
          if (Array.isArray(prev) && prev.some((d) => d.kd_dokter === kd)) return prev
          const pjDoctor = { kd_dokter: kd, nm_dokter: nm || kd }
          return [pjDoctor, ...(Array.isArray(prev) ? prev : [])]
        })
      } else {
        setDokterPJ({ kd_dokter: "", nm_dokter: "" })
      }
    } catch (_) {
      setDokterPJError("Gagal memuat dokter penanggung jawab")
    } finally {
      setLoadingDokterPJ(false)
    }
  }

  const fetchSavedResep = async (noResep) => {
    try {
      const response = await axios.get(`/api/resep/${noResep}`)
      if (response?.data?.success) {
        setSavedResep(response.data.data)
        setShowSavedResep(true)
      }
    } catch (_) {}
  }

  const fetchRiwayatResep = async (reset = true) => {
    if (!noRkmMedis) return
    setLoadingRiwayat(true)
    try {
      const encodedNoRkmMedis = encodeURIComponent(noRkmMedis)
      const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, { params: { limit: 5, offset: 0 }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      if (response?.data?.success) {
        const resepData = response.data.data
        if (reset) setRiwayatResep(resepData)
        else setRiwayatResep((prev) => [...prev, ...resepData])
        setHasMoreResep(response.data.has_more)
        setNextOffset(response.data.next_offset)
      } else {
        setRiwayatResep([])
        setHasMoreResep(false)
        setNextOffset(null)
      }
    } catch (_) {
      setRiwayatResep([])
      setHasMoreResep(false)
      setNextOffset(null)
    } finally {
      setLoadingRiwayat(false)
    }
  }

  const loadMoreResep = async () => {
    if (!noRkmMedis || !hasMoreResep || !nextOffset || loadingMore) return
    setLoadingMore(true)
    try {
      const encodedNoRkmMedis = encodeURIComponent(noRkmMedis)
      const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, { params: { limit: 5, offset: nextOffset } })
      if (response?.data?.success) {
        const newResepData = response.data.data
        setRiwayatResep((prev) => [...prev, ...newResepData])
        setHasMoreResep(response.data.has_more)
        setNextOffset(response.data.next_offset)
      }
    } catch (_) {} finally {
      setLoadingMore(false)
    }
  }

  const deleteResep = async (resep) => {
    const tz = getAppTimeZone()
    const deleteKey = `${resep.tgl_peresepan}_${resep.jam_peresepan}`
    if (!confirm(`Apakah Anda yakin ingin menghapus Resep tanggal ${new Date(resep.tgl_peresepan).toLocaleDateString("id-ID", { timeZone: tz })} ${resep.jam_peresepan}?`)) return
    setDeletingResep(deleteKey)
    try {
      const fd = new FormData()
      fd.append("_method", "DELETE")
      const response = await axios.post(`/api/resep/${resep.no_resep}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
      if (response?.data?.success) {
        await fetchRiwayatResep()
      } else {
        alert("Gagal menghapus resep")
      }
    } catch (_) {
      alert("Terjadi kesalahan saat menghapus resep")
    } finally {
      setDeletingResep(null)
    }
  }

  const handleCopyResep = (resep) => {
    setSelectedResepForCopy(resep)
    setShowCopyModal(true)
  }

  const handleCloseCopyModal = () => {
    setShowCopyModal(false)
    setSelectedResepForCopy(null)
  }

  const handleResepSaved = () => {
    fetchRiwayatResep(true)
  }

  

  const validateForm = async () => {
    for (const item of items) {
      if (!item.kodeObat || !item.namaObat) return false
      if (item.jumlah <= 0) return false
      if (!String(item.aturanPakai || "").trim()) return false
    }
    return true
  }

  const handlePenyerahan = async (resep) => {
    if (!resep?.no_resep) return
    if (penyerahanLoading[resep.no_resep]) return
    try {
      setPenyerahanLoading((prev) => ({ ...prev, [resep.no_resep]: true }))
      const response = await axios.post(`/api/resep/${encodeURIComponent(resep.no_resep)}/penyerahan`, { kd_poli: kdPoli || resep.kd_poli || undefined })
      if (response?.data?.success) {
        const data = response.data.data || {}
        const tglPenyerahan = data.tgl_penyerahan || resep.tgl_penyerahan || todayDateString()
        const jamPenyerahan = data.jam_penyerahan || resep.jam_penyerahan || nowDateTimeString().split(" ")[1].substring(0, 8)
        setRiwayatResep((prev) => prev.map((r) => (r.no_resep === resep.no_resep ? { ...r, tgl_penyerahan: tglPenyerahan, jam_penyerahan: jamPenyerahan } : r)))
        setSavedResep((prev) => {
          if (prev?.no_resep === resep.no_resep) {
            return { ...prev, tgl_penyerahan: tglPenyerahan, jam_penyerahan: jamPenyerahan, status: "Sudah diserahkan" }
          }
          return prev
        })
      } else {
        alert(response?.data?.message || "Gagal memproses penyerahan.")
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Terjadi kesalahan saat penyerahan obat"
      alert(msg)
    } finally {
      setPenyerahanLoading((prev) => ({ ...prev, [resep.no_resep]: false }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = await validateForm()
    if (!isValid) return
    setIsSubmitting(true)
    try {
      const resepData = {
        no_rawat: noRawat,
        kd_poli: kdPoli,
        kd_dokter: selectedDokter,
        items: items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ kode_brng: it.kodeObat, jml: parseFloat(it.jumlah), aturan_pakai: it.aturanPakai || "" })),
      }
      const response = await axios.post("/api/resep", resepData)
      if (response?.data?.success) {
        const noResep = response.data.data.no_resep
        setItems([{ id: 1, kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
        await fetchSavedResep(noResep)
        await fetchRiwayatResep()
        if (kdPoli) fetchObat()
        if (typeof onResepSaved === "function") {
          const appended = items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ name: it.namaObat, qty: it.jumlah, instruction: it.aturanPakai || "" }))
          try { onResepSaved(appended) } catch (_) {}
        }
      } else {
        alert("Gagal menyimpan resep")
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Terjadi kesalahan saat menyimpan resep"
      alert(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const updateItem = (id, key, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)))
  }

  const selectObat = async (itemId, obat) => {
    const stokInfo = await getStokInfo(obat.kode_brng)
    setItems((prev) => prev.map((it) => (it.id === itemId ? { ...it, kodeObat: obat.kode_brng, namaObat: obat.nama_brng, satuan: obat.kode_satbesar, stokTersedia: stokInfo ? stokInfo.total_stok : obat.total_stok, harga: stokInfo ? stokInfo.harga_ralan : obat.ralan || 0, stokDetail: stokInfo ? stokInfo.stok_per_bangsal : [], batchDetail: stokInfo ? stokInfo.batch_detail : [] } : it)))
    setShowDropdown((prev) => ({ ...prev, [itemId]: false }))
  }

  useEffect(() => {
    if (kdPoli) fetchObat()
  }, [kdPoli])

  useEffect(() => {
    fetchDokter()
  }, [])

  useEffect(() => {
    fetchDokterPenanggungJawab()
  }, [noRawat])

  useEffect(() => {
    if (dokterPJ?.kd_dokter && dokterOptions?.length > 0) {
      const exists = dokterOptions.some((d) => d.kd_dokter === dokterPJ.kd_dokter)
      if (exists) setSelectedDokter(dokterPJ.kd_dokter)
    }
  }, [dokterPJ, dokterOptions])

  useEffect(() => {
    fetchRiwayatResep()
  }, [noRawat])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const activeSearchTerms = Object.values(searchObat).filter((term) => term && term.length > 0)
      if (activeSearchTerms.length > 0) {
        const latestSearch = activeSearchTerms[activeSearchTerms.length - 1]
        if (latestSearch.length >= 2) fetchObat(latestSearch)
        else if (latestSearch.length === 0) fetchObat()
      } else {
        fetchObat()
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchObat])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const activeSearchTerms = Object.values(searchAturan).filter((term) => term && term.length > 0)
      if (activeSearchTerms.length > 0) {
        const latestSearch = activeSearchTerms[activeSearchTerms.length - 1]
        if (latestSearch.length >= 2) fetchAturan(latestSearch)
        else if (latestSearch.length === 0) fetchAturan()
      } else {
        fetchAturan()
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchAturan])

  useEffect(() => {
    const hasActiveDropdown = Object.values(showDropdown).some((v) => v)
    if (hasActiveDropdown && obatOptions.length === 0) fetchObat()
  }, [showDropdown])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdownAturan({})
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const switchTab = (tabKey) => {
    setDir(tabKey === "resep" ? -1 : 1)
    setActiveTab(tabKey)
  }

  return (
    <div className="space-y-4 text-[oklch(98.5%_0_0)]">


      <div className="flex border-b border-[oklch(84.1%_0.238_128.85_/_0.35)] gap-2">
        {[{ key: "resep", label: "Resep" }, { key: "resep-racikan", label: "Resep Racikan" }].map((tab) => (
          <button key={tab.key} onClick={() => switchTab(tab.key)} className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === tab.key ? "border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)]" : "border-transparent text-[oklch(98.5%_0_0_/_0.6)] hover:text-[oklch(98.5%_0_0)]"}`}>{tab.label}</button>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {activeTab === "resep" && (
          <motion.form key="tab-resep" variants={pageVariants} custom={dir} initial="enter" animate="center" exit="exit" transition={contentSpring} onSubmit={handleSubmit} className="space-y-4">
            <div className="relative overflow-hidden rounded-md bg-[oklch(14.5%_0_0_/_0.3)] border border-[oklch(84.1%_0.238_128.85_/_0.4)]">
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Dokter Penanggung Jawab</div>
                  {loadingDokterPJ ? <span className="text-[10px] opacity-70">Memuat…</span> : dokterPJError ? <span className="text-[10px] text-red-400">{dokterPJError}</span> : null}
                </div>
                <div className="mt-1 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold shrink-0">{loadingDokterPJ ? "Memuat…" : dokterPJ?.nm_dokter || "-"}</div>
                    <select value={selectedDokter} onChange={(e) => setSelectedDokter(e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" required disabled={loadingDokter}>
                      {loadingDokter ? <option value="">Memuat dokter…</option> : (<>
                        <option value="">Pilih Dokter</option>
                        {dokterOptions.map((d) => (<option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>))}
                      </>)}
                    </select>
                  </div>
                  {dokterPJ?.kd_dokter && <div className="text-[11px] opacity-70">Kode: {dokterPJ.kd_dokter}</div>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <div className="text-[11px]">Nama Obat</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[11px]">Jml</div>
                </div>
                <div className="col-span-4">
                  <div className="text-[11px]">Aturan Pakai</div>
                </div>
                <div className="col-span-1"></div>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-5 relative dropdown-container">
                    <input type="text" value={item.namaObat} onChange={(e) => { updateItem(item.id, "namaObat", e.target.value); setSearchObat((prev) => ({ ...prev, [item.id]: e.target.value })); setShowDropdown((prev) => ({ ...prev, [item.id]: true })) }} onFocus={() => { setShowDropdown((prev) => ({ ...prev, [item.id]: true })); if (!searchObat[item.id] && kdPoli) fetchObat() }} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Pilih Obat" required />

                    <AnimatePresence initial={false}>
                      {showDropdown[item.id] && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute z-20 w-full mt-1 bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[70vh] overflow-y-auto">
                          {loadingObat ? (
                            <div className="p-3 text-center text-[12px] opacity-70">Memuat…</div>
                          ) : (
                            obatOptions.map((obat, obatIndex) => (
                              <motion.button
                                type="button"
                                key={`${obat.kode_brng}-${obatIndex}`}
                                onClick={() => selectObat(item.id, obat)}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.14 }}
                                className="w-full text-left px-3 py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.25)]"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <div className="font-medium text-[12px]">{obat.nama_brng}</div>
                                    <div className="text-[11px] opacity-70">{obat.kode_brng}</div>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    <div className="text-[10px] opacity-80">Stok Obat</div>
                                    <div className="text-[11px]">{Number(obat.total_stok || 0).toLocaleString("id-ID")}</div>
                                  </div>
                                </div>
                              </motion.button>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="col-span-2">
                    <input type="number" min="1" value={item.jumlah || ""} onChange={(e) => { const jumlah = parseInt(e.target.value) || ""; updateItem(item.id, "jumlah", jumlah) }} className={`w-full px-3 py-2 rounded-md border ${item.jumlah > item.stokTersedia && item.stokTersedia > 0 ? "border-red-500 bg-red-50/20" : "border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent"}`} placeholder={index === 0 ? "Jml" : "Jumlah"} max={item.stokTersedia || undefined} required />
                  </div>

                  <div className="col-span-4 relative dropdown-container">
                    <input
                      type="text"
                      value={item.aturanPakai}
                      onChange={(e) => { updateItem(item.id, "aturanPakai", e.target.value); setSearchAturan((prev) => ({ ...prev, [item.id]: e.target.value })); setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true })) }}
                      onFocus={() => { setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true })); if (!searchAturan[item.id]) fetchAturan() }}
                      className="w-full px-3 pr-8 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent"
                      placeholder="Aturan Pakai"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => { setMasterAturanItemId(item.id); setMasterAturanInput(item.aturanPakai || (searchAturan[item.id] || "")); setShowMasterAturanModal(true) }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-md border border-red-500 text-red-500 hover:bg-red-500/20"
                      aria-label="Tambah master aturan pakai"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {showDropdownAturan[item.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute z-20 w-full mt-1 bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[70vh] overflow-y-auto"
                        >
                          {loadingAturan ? (
                            <div className="p-3 text-center text-[12px] opacity-70">Memuat…</div>
                          ) : aturanOptions.length === 0 ? (
                            <div className="p-3 text-center text-[12px] opacity-70">Tidak ada hasil</div>
                          ) : (
                            (aturanOptions || []).map((opt, optIndex) => (
                              <motion.button
                                type="button"
                                key={`${opt.aturan}-${optIndex}`}
                                onClick={() => { updateItem(item.id, "aturanPakai", opt.aturan); setShowDropdownAturan((prev) => ({ ...prev, [item.id]: false })) }}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.14 }}
                                className="w-full text-left px-3 py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.25)]"
                              >
                                <div className="font-medium text-[12px]">{opt.aturan}</div>
                              </motion.button>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="col-span-1 flex justify-end gap-2">
                    {index === items.length - 1 && (
                      <button type="button" onClick={addItem} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(84.1%_0.238_128.85)] hover:bg-neutral-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      </button>
                    )}
                    {index > 0 && (
                      <button type="button" onClick={() => removeItem(item.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(84.1%_0.238_128.85)] hover:bg-neutral-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col sm:flex-row items-end sm:justify-end gap-2 mt-3 pt-3 border-t border-[oklch(84.1%_0.238_128.85_/_0.35)]">
              <button
                type="button"
                onClick={() => setShowRiwayatResep((v) => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.4)]"
              >
                {showRiwayatResep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                )}
                {showRiwayatResep ? "Sembunyikan Riwayat Resep" : "Tampilkan Riwayat Resep"}
              </button>

              <button type="submit" disabled={isSubmitting || items.length === 0} className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85)] hover:bg-neutral-800 disabled:opacity-50">
                {isSubmitting ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </motion.form>
        )}

        {activeTab === "resep-racikan" && (
          <motion.div key="tab-racikan" variants={pageVariants} custom={dir} initial="enter" animate="center" exit="exit" transition={contentSpring} className="p-3 border border-[oklch(84.1%_0.238_128.85_/_0.4)] rounded-md">
            <div className="text-[12px] opacity-80">Formulir Resep Racikan akan ditampilkan di sini.</div>
          </motion.div>
        )}
      </AnimatePresence>

      

      <AnimatePresence initial={false}>
        {showRiwayatResep && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="mt-3 border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md p-3">
            {loadingRiwayat ? (
              <div className="flex items-center justify-center py-6 text-[12px] opacity-70">Memuat riwayat resep…</div>
            ) : riwayatResep.length === 0 ? (
              <div className="text-center py-6 text-[12px] opacity-70">Belum ada riwayat resep</div>
            ) : (
              <div className="space-y-3">
                {riwayatResep.map((resep, index) => (
                  <div key={index} className="border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                        <div>
                          <div className="text-[11px] opacity-70">No. Resep</div>
                          <div className="text-sm font-semibold">{resep.no_resep}</div>
                        </div>
                        <div>
                          <div className="text-[11px] opacity-70">Tanggal</div>
                          <div className="text-sm">{new Date(resep.tgl_peresepan).toLocaleDateString("id-ID")} {resep.jam_peresepan}</div>
                        </div>
                        <div>
                          <div className="text-[11px] opacity-70">Dokter</div>
                          <div className="text-sm">{resep.nama_dokter || "Tidak diketahui"}</div>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <button onClick={() => handleCopyResep(resep)} className="px-3 py-1 text-xs rounded-md border border-[oklch(84.1%_0.238_128.85)]">Copy</button>
                        <button onClick={() => deleteResep(resep)} disabled={deletingResep === `${resep.tgl_peresepan}_${resep.jam_peresepan}`} className="px-3 py-1 text-xs rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">Hapus</button>
                        <button onClick={() => handlePenyerahan(resep)} disabled={penyerahanLoading[resep.no_resep]} className="px-3 py-1 text-xs rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">Penyerahan</button>
                      </div>
                    </div>

                    {Array.isArray(resep.detail_obat) && resep.detail_obat.length > 0 && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full border border-[oklch(84.1%_0.238_128.85_/_0.35)] text-[12px]">
                          <thead className="bg-[oklch(14.5%_0_0_/_0.25)]">
                            <tr>
                              <th className="px-3 py-2 text-left">Kode Obat</th>
                              <th className="px-3 py-2 text-left">Nama Obat</th>
                              <th className="px-3 py-2 text-left">Aturan Pakai</th>
                              <th className="px-3 py-2 text-center">Jumlah</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resep.detail_obat.map((obat, obatIndex) => (
                              <tr key={obatIndex} className="border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                                <td className="px-3 py-2">{obat.kode_brng}</td>
                                <td className="px-3 py-2">{obat.nama_brng || obat.kode_brng}</td>
                                <td className="px-3 py-2">{obat.aturan_pakai}</td>
                                <td className="px-3 py-2 text-center">{obat.jml}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}

                {hasMoreResep && (
                  <div className="text-center">
                    <button onClick={loadMoreResep} disabled={loadingMore} className="px-4 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">{loadingMore ? "Memuat…" : "Muat Lebih Banyak"}</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showSavedResep && savedResep && (
        <div className="mt-4 border border-[oklch(84.1%_0.238_128.85_/_0.4)] rounded-md">
          <div className="flex justify-between items-center px-3 py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)]">
            <div className="text-sm font-semibold">Data Resep Tersimpan</div>
            <button onClick={() => setShowSavedResep(false)} className="text-[oklch(98.5%_0_0_/_0.7)] hover:text-[oklch(98.5%_0_0)]">✕</button>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div><span className="opacity-70">No. Resep:</span> {savedResep.no_resep}</div>
              <div><span className="opacity-70">Tanggal:</span> {(() => { const tz = getAppTimeZone(); return new Date(savedResep.tgl_peresepan).toLocaleDateString("id-ID", { timeZone: tz }) })()}</div>
              <div><span className="opacity-70">Jam:</span> {savedResep.jam_peresepan}</div>
              <div><span className="opacity-70">No. Rawat:</span> {savedResep.no_rawat}</div>
              <div><span className="opacity-70">Dokter:</span> {savedResep.nama_dokter || "Dokter tidak ditemukan"}</div>
              <div><span className="opacity-70">Status:</span> {savedResep.status}</div>
              <div className="col-span-2"><span className="opacity-70">Penyerahan:</span> {savedResep.tgl_penyerahan ? (<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-200">{new Date(savedResep.tgl_penyerahan).toLocaleDateString("id-ID")} {savedResep.jam_penyerahan}</span>) : (<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-200">Belum diserahkan</span>)}</div>
              {!savedResep.tgl_penyerahan && (
                <div className="col-span-2 flex justify-end">
                  <button onClick={() => handlePenyerahan(savedResep)} disabled={penyerahanLoading[savedResep.no_resep]} className="px-4 py-2 text-xs rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">{penyerahanLoading[savedResep.no_resep] ? "Memproses…" : "Penyerahan Obat"}</button>
                </div>
              )}
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border border-[oklch(84.1%_0.238_128.85_/_0.35)] text-[12px]">
                <thead className="bg-[oklch(14.5%_0_0_/_0.25)]">
                  <tr>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-left">Kode Obat</th>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-left">Nama Obat</th>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-left">Aturan Pakai</th>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-center">Jumlah</th>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-right">Harga</th>
                    <th className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {savedResep.detail_obat && savedResep.detail_obat.map((it, idx) => (
                    <tr key={idx} className="hover:bg-[oklch(14.5%_0_0_/_0.2)]">
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2">{it.kode_brng}</td>
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2">{it.nama_brng || "-"}</td>
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2">{it.aturan_pakai}</td>
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2 text-center">{it.jml} {it.satuan}</td>
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2 text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(it.harga || 0)}</td>
                      <td className="border border-[oklch(84.1%_0.238_128.85_/_0.15)] px-3 py-2 text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format((it.jml || 0) * (it.harga || 0))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[oklch(14.5%_0_0_/_0.25)]">
                  <tr>
                    <td colSpan="5" className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-right font-semibold">Total Keseluruhan:</td>
                    <td className="border border-[oklch(84.1%_0.238_128.85_/_0.2)] px-3 py-2 text-right font-semibold">{savedResep.detail_obat && new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(savedResep.detail_obat.reduce((total, it) => total + (it.jml || 0) * (it.harga || 0), 0))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {showMasterAturanModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.18 }} className="w-full max-w-sm bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] rounded-md p-3">
              <div className="text-sm font-semibold mb-2">Tambah Master Aturan Pakai</div>
              <input type="text" value={masterAturanInput} onChange={(e) => setMasterAturanInput(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Masukkan aturan pakai" />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => { setShowMasterAturanModal(false); setMasterAturanItemId(null) }} className="px-3 py-1.5 rounded-md border border-[oklch(84.1%_0.238_128.85)]">Batal</button>
                <button type="button" onClick={saveMasterAturan} disabled={masterAturanSaving || (masterAturanInput || "").trim() === ""} className="px-3 py-1.5 rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">{masterAturanSaving ? "Menyimpan…" : "Simpan"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

  <CopyResep isOpen={showCopyModal} onClose={handleCloseCopyModal} resepData={selectedResepForCopy} token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} kdPoli={kdPoli} onResepSaved={handleResepSaved} />
    </div>
  )
}
