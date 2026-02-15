import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Search } from 'lucide-react'
import { todayDateString, nowDateTimeString, getAppTimeZone } from "@/tools/datetime"
import { createPageVariants, contentSpring } from "@/tools/motion"
import CopyResep from "@/Pages/RawatJalan/components/CopyResep"

export default function NewResep({ token = "", noRkmMedis = "", noRawat = "", kdPoli = "", status = "ralan", onResepSaved = null }) {
  const [items, setItems] = useState([{ id: 1, kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingRacikan, setIsSubmittingRacikan] = useState(false)
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
  const [showRiwayatResep, setShowRiwayatResep] = useState(true)
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
  const [racikanGroups, setRacikanGroups] = useState([])
  const [activeRacikId, setActiveRacikId] = useState(null)
  const [metodeRacikOptions, setMetodeRacikOptions] = useState([])
  const [racikSearchObat, setRacikSearchObat] = useState({})
  const [racikDropdownObat, setRacikDropdownObat] = useState({})
  const [templates, setTemplates] = useState([])
  const [loadingTemplates, setLoadingTemplates] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [isSavingTemplate, setIsSavingTemplate] = useState(false)
  const [templateQuery, setTemplateQuery] = useState("")

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

  const fetchMetodeRacik = async () => {
    try {
      const response = await axios.get('/farmasi/metode-racik', { params: { perPage: 200, q: '' }, withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } })
      const items = response?.data?.props?.items?.data || []
      const opts = items.map((it) => ({ kd_racik: it.kd_racik, nm_racik: it.nm_racik }))
      if (opts.length > 0) {
        setMetodeRacikOptions(opts)
        return
      }
    } catch (_) { }
    setMetodeRacikOptions([
      { kd_racik: 'R01', nm_racik: 'Puyer' },
      { kd_racik: 'R02', nm_racik: 'Sirup' },
      { kd_racik: 'R03', nm_racik: 'Salep' },
      { kd_racik: 'R04', nm_racik: 'Kapsul' },
      { kd_racik: 'R06', nm_racik: 'Injeksi' },
    ])
  }

  const getDetailObat = async (kodeBrng) => {
    try {
      const response = await axios.get(`/api/obat/${encodeURIComponent(kodeBrng)}`, { params: { kd_poli: kdPoli || undefined }, withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } })
      if (response?.data?.success) return response.data.data
      return null
    } catch (_) {
      return null
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
        if (masterAturanItemId) {
          const key = String(masterAturanItemId)
          if (key.startsWith('grp-')) {
            const gid = parseInt(key.replace('grp-', ''))
            updateRacikanGroup(gid, 'aturan_pakai', val)
          } else {
            updateItem(masterAturanItemId, 'aturanPakai', val)
          }
        }
        setShowMasterAturanModal(false)
        setMasterAturanItemId(null)
      }
    } catch (_) { }
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
      } catch (_) { }

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
          } catch (_) { }
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
    } catch (_) { }
  }

  const fetchRiwayatResep = async (reset = true) => {
    if (!noRkmMedis) return
    setLoadingRiwayat(true)
    try {
      const encodedNoRkmMedis = encodeURIComponent(noRkmMedis)
      const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, { params: { limit: 3, offset: 0 }, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
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
      const response = await axios.get(`/api/resep/pasien/${encodedNoRkmMedis}`, { params: { limit: 3, offset: nextOffset } })
      if (response?.data?.success) {
        const newResepData = response.data.data
        setRiwayatResep((prev) => [...prev, ...newResepData])
        setHasMoreResep(response.data.has_more)
        setNextOffset(response.data.next_offset)
      }
    } catch (_) { } finally {
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
            return { ...prev, tgl_penyerahan: tglPenyerahan, jam_penyerahan: jamPenyerahan }
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
    const racikanValid = validateRacikan()
    if (!isValid && !racikanValid) return
    setIsSubmitting(true)
    try {
      const nonItems = items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ kode_brng: it.kodeObat, jml: parseFloat(it.jumlah), aturan_pakai: it.aturanPakai || "" }))
      let response
      if (racikanValid && nonItems.length > 0) {
        const resepData = {
          no_rawat: noRawat,
          kd_poli: kdPoli,
          kd_dokter: selectedDokter,
          status: status,
          items: nonItems,
        }
        response = await axios.post("/api/resep", resepData)
        if (response?.data?.success) {
          const noResep = response.data.data.no_resep
          const appendPayload = {
            groups: racikanGroups.map((g) => ({
              no_racik: g.no_racik,
              nama_racik: g.nama_racik,
              kd_racik: g.kd_racik,
              jml_dr: Number(g.jml_dr) || 0,
              aturan_pakai: g.aturan_pakai || "",
              keterangan: g.keterangan || "",
              items: (g.items || []).map((it) => ({
                kode_brng: it.kode_brng,
                p1: Number(it.p1) || 0,
                p2: Number(it.p2) || 0,
                kandungan: Number(it.kandungan) || 0,
                jml: Number(it.jml) || 0,
              })),
            })),
          }
          const appendRes = await axios.post(`/api/resep/${encodeURIComponent(noResep)}/racikan`, appendPayload)
          if (!appendRes?.data?.success) {
            alert('Gagal menambahkan racikan ke resep')
            return
          }
          response = appendRes
        }
      } else if (racikanValid && nonItems.length === 0) {
        const payload = {
          no_rawat: noRawat,
          kd_poli: kdPoli,
          kd_dokter: selectedDokter,
          status: status,
          groups: racikanGroups.map((g) => ({
            no_racik: g.no_racik,
            nama_racik: g.nama_racik,
            kd_racik: g.kd_racik,
            jml_dr: Number(g.jml_dr) || 0,
            aturan_pakai: g.aturan_pakai || "",
            keterangan: g.keterangan || "",
            items: (g.items || []).map((it) => ({
              kode_brng: it.kode_brng,
              p1: Number(it.p1) || 0,
              p2: Number(it.p2) || 0,
              kandungan: Number(it.kandungan) || 0,
              jml: Number(it.jml) || 0,
            })),
          })),
        }
        response = await axios.post('/api/resep/racikan', payload)
      } else {
        const resepData = {
          no_rawat: noRawat,
          kd_poli: kdPoli,
          kd_dokter: selectedDokter,
          status: status,
          items: nonItems,
        }
        response = await axios.post("/api/resep", resepData)
      }
      if (response?.data?.success) {
        const noResep = response.data.data.no_resep
        setItems([{ id: 1, kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
        if (racikanValid) {
          setRacikanGroups([])
          setActiveRacikId(null)
        }
        await fetchSavedResep(noResep)
        await fetchRiwayatResep()
        if (kdPoli) fetchObat()
        if (typeof onResepSaved === "function") {
          const appendedNon = items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ name: it.namaObat, qty: it.jumlah, instruction: it.aturanPakai || "" }))
          const appendedRacik = racikanValid ? racikanGroups.flatMap((g) => (g.items || []).map((it) => ({ name: it.nama_brng, qty: it.jml, instruction: g.aturan_pakai || '' }))) : []
          const appended = [...appendedNon, ...appendedRacik]
          try { onResepSaved(appended) } catch (_) { }
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

  const addRacikanGroup = () => {
    const newId = Date.now()
    setRacikanGroups((prev) => [
      ...prev,
      { id: newId, no_racik: (prev.length + 1), nama_racik: '', kd_racik: '', jml_dr: 0, aturan_pakai: '', keterangan: '', items: [] }
    ])
    setActiveRacikId(newId)
  }

  const removeRacikanGroup = (id) => {
    setRacikanGroups((prev) => prev.filter((g) => g.id !== id).map((g, idx) => ({ ...g, no_racik: idx + 1 })))
    if (activeRacikId === id) setActiveRacikId(null)
  }

  const updateRacikanGroup = (id, key, value) => {
    setRacikanGroups((prev) => prev.map((g) => (g.id === id ? { ...g, [key]: value } : g)))
    if (key === 'jml_dr') {
      setRacikanGroups((prev) => prev.map((g) => {
        if (g.id !== id) return g
        const updatedItems = (g.items || []).map((it) => {
          const kapasitas = parseFloat(it.kapasitas || 0) || 0
          const p1 = parseFloat(it.p1 || 0) || 0
          const p2 = parseFloat(it.p2 || 0) || 0
          const kandungan = parseFloat(it.kandungan || 0) || 0
          let jml = 0
          if (kapasitas > 0 && kandungan > 0) {
            jml = ((Number(value) || 0) * kandungan) / kapasitas
          } else if (p1 > 0 && p2 > 0) {
            jml = (Number(value) || 0) * (p1 / p2)
          }
          return { ...it, jml: jml }
        })
        return { ...g, items: updatedItems }
      }))
    }
  }

  const addRacikanItem = (groupId) => {
    setRacikanGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, items: [...(g.items || []), { id: Date.now(), kode_brng: '', nama_brng: '', satuan: '', kapasitas: 0, stok: 0, p1: 1, p2: 1, kandungan: 0, jml: 0 }] } : g)))
  }

  const removeRacikanItem = (groupId, itemId) => {
    setRacikanGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, items: (g.items || []).filter((it) => it.id !== itemId) } : g)))
  }

  const updateRacikanItem = (groupId, itemId, key, value) => {
    setRacikanGroups((prev) => prev.map((g) => {
      if (g.id !== groupId) return g
      const updated = (g.items || []).map((it) => (it.id === itemId ? { ...it, [key]: value } : it))
      return { ...g, items: updated }
    }))
    if (['p1', 'p2', 'kandungan'].includes(key)) {
      setRacikanGroups((prev) => prev.map((g) => {
        if (g.id !== groupId) return g
        const updated = (g.items || []).map((it) => {
          if (it.id !== itemId) return it
          const kapasitas = parseFloat(it.kapasitas || 0) || 0
          const p1 = parseFloat(key === 'p1' ? value : it.p1 || 0) || 0
          const p2 = parseFloat(key === 'p2' ? value : it.p2 || 0) || 0
          const kandungan = parseFloat(key === 'kandungan' ? value : it.kandungan || 0) || 0
          let jml = 0
          let nextKandungan = kandungan
          if (kapasitas > 0 && kandungan > 0) {
            jml = ((Number(g.jml_dr) || 0) * kandungan) / kapasitas
          } else if (p1 > 0 && p2 > 0) {
            jml = (Number(g.jml_dr) || 0) * (p1 / p2)
            if (kapasitas > 0 && (!nextKandungan || nextKandungan === 0)) {
              nextKandungan = kapasitas * (p1 / p2)
            }
          }
          return { ...it, jml: jml, kandungan: nextKandungan }
        })
        return { ...g, items: updated }
      }))
    }
  }

  const selectRacikanObat = async (groupId, itemId, obat) => {
    const detail = await getDetailObat(obat.kode_brng)
    const kapasitas = detail?.kapasitas ?? obat.kapasitas ?? 0
    const satuan = detail?.kode_satbesar ?? obat.kode_satbesar ?? ''
    const stok = detail?.total_stok ?? obat.total_stok ?? 0
    setRacikanGroups((prev) => prev.map((g) => {
      if (g.id !== groupId) return g
      const jmlDr = Number(g.jml_dr) || 0
      const updated = (g.items || []).map((it) => {
        if (it.id !== itemId) return it
        const p1 = parseFloat(it.p1 || 0) || 0
        const p2 = parseFloat(it.p2 || 0) || 0
        let kandungan = parseFloat(it.kandungan || 0) || 0
        let jml = 0
        if (kapasitas > 0 && kandungan > 0) {
          jml = (jmlDr * kandungan) / kapasitas
        } else if (p1 > 0 && p2 > 0) {
          jml = jmlDr * (p1 / p2)
          if (kapasitas > 0 && (!kandungan || kandungan === 0)) {
            kandungan = kapasitas * (p1 / p2)
          }
        }
        return { ...it, kode_brng: obat.kode_brng, nama_brng: obat.nama_brng, kapasitas, satuan, stok, kandungan, jml }
      })
      return { ...g, items: updated }
    }))
    setRacikDropdownObat((prev) => ({ ...prev, [itemId]: false }))
  }

  useEffect(() => {
    if (kdPoli) fetchObat()
  }, [kdPoli])

  useEffect(() => {
    fetchMetodeRacik()
  }, [])

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
      const activeSearchTerms = Object.values(racikSearchObat).filter((term) => term && term.length > 0)
      if (activeSearchTerms.length > 0) {
        const latestSearch = activeSearchTerms[activeSearchTerms.length - 1]
        if (latestSearch.length >= 2) fetchObat(latestSearch)
        else if (latestSearch.length === 0) fetchObat()
      } else {
        fetchObat()
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [racikSearchObat])

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
    const hasActiveDropdown = Object.values(racikDropdownObat).some((v) => v)
    if (hasActiveDropdown && obatOptions.length === 0) fetchObat()
  }, [racikDropdownObat])

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

  const validateRacikan = () => {
    if (racikanGroups.length === 0) return false
    for (const g of racikanGroups) {
      if (!g.nama_racik || !g.kd_racik || !g.jml_dr || (g.items || []).length === 0) return false
      for (const it of g.items || []) {
        if (!it.kode_brng || (Number(it.jml) || 0) <= 0) return false
      }
    }
    return true
  }

  const handleSubmitRacikan = async (e) => {
    e.preventDefault()
    const ok = validateRacikan()
    const nonValid = await validateForm()
    if (!ok && !nonValid) return
    if (!selectedDokter) return
    setIsSubmittingRacikan(true)
    try {
      let response
      if (nonValid) {
        const nonItems = items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ kode_brng: it.kodeObat, jml: parseFloat(it.jumlah), aturan_pakai: it.aturanPakai || "" }))
        const resepData = {
          no_rawat: noRawat,
          kd_poli: kdPoli,
          kd_dokter: selectedDokter,
          status: status,
          items: nonItems,
        }
        const nonRes = await axios.post('/api/resep', resepData)
        if (!nonRes?.data?.success) {
          alert('Gagal menyimpan non-racikan')
          return
        }
        const noResep = nonRes.data.data.no_resep
        const appendPayload = {
          groups: racikanGroups.map((g) => ({
            no_racik: g.no_racik,
            nama_racik: g.nama_racik,
            kd_racik: g.kd_racik,
            jml_dr: Number(g.jml_dr) || 0,
            aturan_pakai: g.aturan_pakai || "",
            keterangan: g.keterangan || "",
            items: (g.items || []).map((it) => ({
              kode_brng: it.kode_brng,
              p1: Number(it.p1) || 0,
              p2: Number(it.p2) || 0,
              kandungan: Number(it.kandungan) || 0,
              jml: Number(it.jml) || 0,
            })),
          })),
        }
        response = await axios.post(`/api/resep/${encodeURIComponent(noResep)}/racikan`, appendPayload)
      } else {
        const payload = {
          no_rawat: noRawat,
          kd_poli: kdPoli,
          kd_dokter: selectedDokter,
          status: status,
          groups: racikanGroups.map((g) => ({
            no_racik: g.no_racik,
            nama_racik: g.nama_racik,
            kd_racik: g.kd_racik,
            jml_dr: Number(g.jml_dr) || 0,
            aturan_pakai: g.aturan_pakai || "",
            keterangan: g.keterangan || "",
            items: (g.items || []).map((it) => ({
              kode_brng: it.kode_brng,
              p1: Number(it.p1) || 0,
              p2: Number(it.p2) || 0,
              kandungan: Number(it.kandungan) || 0,
              jml: Number(it.jml) || 0,
            })),
          })),
        }
        response = await axios.post('/api/resep/racikan', payload)
      }
      if (response?.data?.success) {
        const noResep = response.data.data.no_resep
        setRacikanGroups([])
        setActiveRacikId(null)
        if (nonValid) {
          setItems([{ id: 1, kodeObat: "", namaObat: "", aturanPakai: "", jumlah: 0, satuan: "", stokTersedia: 0, harga: 0 }])
        }
        await fetchSavedResep(noResep)
        await fetchRiwayatResep()
        if (typeof onResepSaved === 'function') {
          const appendedRacik = racikanGroups.flatMap((g) => (g.items || []).map((it) => ({ name: it.nama_brng, qty: it.jml, instruction: g.aturan_pakai || '' })))
          const appendedNon = nonValid ? items.filter((it) => it.kodeObat && it.jumlah > 0).map((it) => ({ name: it.namaObat, qty: it.jumlah, instruction: it.aturanPakai || "" })) : []
          const appended = [...appendedNon, ...appendedRacik]
          try { onResepSaved(appended) } catch (_) { }
        }
      } else {
        alert('Gagal menyimpan racikan')
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Terjadi kesalahan saat menyimpan racikan'
      alert(msg)
    } finally {
      setIsSubmittingRacikan(false)
    }
  }

  const fetchTemplates = async () => {
    if (!selectedDokter) return
    setLoadingTemplates(true)
    try {
      const resp = await axios.get('/api/racikan-template', { params: { kd_dokter: selectedDokter } })
      if (resp.data?.success) setTemplates(resp.data.data)
    } catch (_) { }
    finally { setLoadingTemplates(false) }
  }

  const handleSaveAsTemplate = async (group) => {
    if (!group.nama_racik || !group.kd_racik || (group.items || []).length === 0) {
      alert('Nama, metode, dan bahan racikan harus diisi!')
      return
    }
    setIsSavingTemplate(true)
    try {
      const payload = {
        nama_racik: group.nama_racik,
        kd_racik: group.kd_racik,
        kd_dokter: selectedDokter,
        jml_dr: group.jml_dr || 0,
        aturan_pakai: group.aturan_pakai || '',
        keterangan: group.keterangan || '',
        items: group.items.map(it => ({
          kode_brng: it.kode_brng,
          p1: it.p1,
          p2: it.p2,
          kandungan: it.kandungan,
          jml: it.jml
        }))
      }
      const resp = await axios.post('/api/racikan-template', payload)
      if (resp.data?.success) {
        alert('Template racikan berhasil disimpan!')
        fetchTemplates()
      }
    } catch (error) {
      alert('Gagal menyimpan template: ' + (error.response?.data?.message || error.message))
    } finally { setIsSavingTemplate(false) }
  }

  const loadTemplate = async (template) => {
    try {
      const resp = await axios.get(`/api/racikan-template/${template.no_template}`, { params: { kd_poli: kdPoli } })
      if (resp.data?.success) {
        const { header, items, stock_alert, out_of_stock_items } = resp.data.data

        if (stock_alert) {
          const names = out_of_stock_items.map(it => it.nama_brng).join(', ')
          alert(`Peringatan: Stok obat [${names}] habis/tidak tersedia di lokasi poli ini!`)
        }

        const newId = Date.now()
        const newGroup = {
          id: newId,
          no_racik: racikanGroups.length + 1,
          nama_racik: header.nama_racik,
          kd_racik: header.kd_racik,
          jml_dr: header.jml_dr,
          aturan_pakai: header.aturan_pakai,
          keterangan: header.keterangan,
          items: items.map(it => ({
            id: Date.now() + Math.random(),
            kode_brng: it.kode_brng,
            nama_brng: it.nama_brng,
            satuan: it.satuan,
            kapasitas: it.kapasitas,
            stok: it.stok_tersedia,
            p1: it.p1,
            p2: it.p2,
            kandungan: it.kandungan,
            jml: it.jml
          }))
        }

        setRacikanGroups(prev => [...prev, newGroup])
        setActiveRacikId(newId)
        setShowTemplateModal(false)
      }
    } catch (_) {
      alert('Gagal memuat detail template')
    }
  }

  return (
    <div className="space-y-4 text-[oklch(14.5%_0_0)]">


      <div className="flex border-b border-[oklch(28.3%_0.141_291.089_/_0.35)] gap-2">
        {[{ key: "resep", label: "Resep" }, { key: "resep-racikan", label: "Resep Racikan" }].map((tab) => (
          <button key={tab.key} onClick={() => switchTab(tab.key)} className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === tab.key ? 'border-[oklch(28.3%_0.141_291.089)] text-[oklch(14.5%_0_0)]' : 'border-transparent text-[oklch(14.5%_0_0_/_0.7)] hover:text-[oklch(14.5%_0_0)]'}`}>{tab.label}</button>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {activeTab === "resep" && (
          <motion.form key="tab-resep" variants={pageVariants} custom={dir} initial="enter" animate="center" exit="exit" transition={contentSpring} onSubmit={handleSubmit} className="space-y-4">
            <div className="relative overflow-hidden rounded-md bg-[oklch(14.5%_0_0_/_0.3)] border border-[oklch(28.3%_0.141_291.089_/_0.4)]">
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium">Dokter Penanggung Jawab</div>
                    {dokterPJ?.kd_dokter && <div className="text-[11px] opacity-70">Kode: {dokterPJ.kd_dokter}</div>}
                  </div>
                  {loadingDokterPJ ? <span className="text-[10px] opacity-70">Memuat…</span> : dokterPJError ? <span className="text-[10px] text-red-400">{dokterPJError}</span> : null}
                </div>
                <div className="mt-1 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold shrink-0">{loadingDokterPJ ? "Memuat…" : dokterPJ?.nm_dokter || "-"}</div>
                    <select value={selectedDokter} onChange={(e) => setSelectedDokter(e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" required disabled={loadingDokter}>
                      {loadingDokter ? <option value="">Memuat dokter…</option> : (<>
                        <option value="">Pilih Dokter</option>
                        {dokterOptions.map((d) => (<option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>))}
                      </>)}
                    </select>
                  </div>

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
                    <input type="text" value={item.namaObat} onChange={(e) => { updateItem(item.id, "namaObat", e.target.value); setSearchObat((prev) => ({ ...prev, [item.id]: e.target.value })); setShowDropdown((prev) => ({ ...prev, [item.id]: true })) }} onFocus={() => { setShowDropdown((prev) => ({ ...prev, [item.id]: true })); if (!searchObat[item.id] && kdPoli) fetchObat() }} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Pilih Obat" required />

                    <AnimatePresence initial={false}>
                      {showDropdown[item.id] && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute z-20 w-full mt-1 bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] border border-[oklch(28.3%_0.141_291.089_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[84vh] overflow-y-auto">
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
                                className="w-full text-left px-3 py-2 border-b border-[oklch(28.3%_0.141_291.089_/_0.25)]"
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
                    <input type="number" min="1" value={item.jumlah || ""} onChange={(e) => { const jumlah = parseInt(e.target.value) || ""; updateItem(item.id, "jumlah", jumlah) }} className={`w-full px-3 py-2 rounded-md border ${item.jumlah > item.stokTersedia && item.stokTersedia > 0 ? 'border-red-500 bg-red-50/20' : 'border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent'}`} placeholder={index === 0 ? "Jml" : "Jumlah"} max={item.stokTersedia || undefined} required />
                  </div>

                  <div className="col-span-4 relative dropdown-container">
                    <input
                      type="text"
                      value={item.aturanPakai}
                      onChange={(e) => { updateItem(item.id, "aturanPakai", e.target.value); setSearchAturan((prev) => ({ ...prev, [item.id]: e.target.value })); setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true })) }}
                      onFocus={() => { setShowDropdownAturan((prev) => ({ ...prev, [item.id]: true })); if (!searchAturan[item.id]) fetchAturan() }}
                      className="w-full px-3 pr-8 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent"
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
                          className="absolute z-20 w-full mt-1 bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] border border-[oklch(28.3%_0.141_291.089_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[84vh] overflow-y-auto"
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
                                className="w-full text-left px-3 py-2 border-b border-[oklch(28.3%_0.141_291.089_/_0.25)]"
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
                      <button type="button" onClick={addItem} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(28.3%_0.141_291.089)] hover:bg-neutral-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      </button>
                    )}
                    {index > 0 && (
                      <button type="button" onClick={() => removeItem(item.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(28.3%_0.141_291.089)] hover:bg-neutral-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col sm:flex-row items-end sm:justify-end gap-2 mt-3 pt-3 border-t border-[oklch(28.3%_0.141_291.089_/_0.35)]">
              <button
                type="button"
                onClick={() => setShowRiwayatResep((v) => !v)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-black hover:bg-neutral-800 text-white border border-[oklch(28.3%_0.141_291.089_/_0.4)]"
              >
                {showRiwayatResep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                )}
                {showRiwayatResep ? "Sembunyikan Riwayat Resep" : "Tampilkan Riwayat Resep"}
              </button>

              <button type="submit" disabled={isSubmitting || items.length === 0} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-[oklch(28.3%_0.141_291.089)] bg-black hover:bg-neutral-800 text-white disabled:opacity-50">
                {isSubmitting ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </motion.form>
        )}

        {activeTab === "resep-racikan" && (
          <motion.form key="tab-racikan" onSubmit={handleSubmitRacikan} variants={pageVariants} custom={dir} initial="enter" animate="center" exit="exit" transition={contentSpring} className="space-y-3">
            <div className="relative rounded-md bg-gradient-to-r from-pink-100 to-sky-100 border border-pink-300">
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="text-sm font-semibold">Kelompok Racikan</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => { setShowTemplateModal(true); fetchTemplates(); }} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100">Pilih Template</button>
                  <button type="button" onClick={addRacikanGroup} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-[oklch(28.3%_0.141_291.089)]">Tambah Racikan</button>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 text-[11px]">Nama Racikan</div>
                  <div className="col-span-3 text-[11px]">Metode</div>
                  <div className="col-span-2 text-[11px]">Jumlah Dosis</div>
                  <div className="col-span-3 text-[11px]">Aturan Pakai</div>
                  <div className="col-span-1"></div>
                </div>
                {racikanGroups.length === 0 ? (
                  <div className="text-[12px] opacity-70">Belum ada racikan. Tambahkan racikan.</div>
                ) : (
                  racikanGroups.map((grp) => (
                    <div key={grp.id} className={`grid grid-cols-12 gap-2 items-center ${activeRacikId === grp.id ? 'bg-[oklch(14.5%_0_0_/_0.2)]' : ''} p-2 rounded`}>
                      <div className="col-span-3">
                        <input type="text" value={grp.nama_racik} onChange={(e) => updateRacikanGroup(grp.id, 'nama_racik', e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Nama racikan" />
                      </div>
                      <div className="col-span-3">
                        <select value={grp.kd_racik} onChange={(e) => updateRacikanGroup(grp.id, 'kd_racik', e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent">
                          <option value="">Pilih metode</option>
                          {metodeRacikOptions.map((opt) => (
                            <option key={opt.kd_racik} value={opt.kd_racik}>{opt.nm_racik}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" value={grp.jml_dr || ''} onChange={(e) => updateRacikanGroup(grp.id, 'jml_dr', parseInt(e.target.value) || '')} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Jml dosis" />
                      </div>
                      <div className="col-span-3 relative dropdown-container">
                        <input
                          type="text"
                          value={grp.aturan_pakai}
                          onChange={(e) => { updateRacikanGroup(grp.id, 'aturan_pakai', e.target.value); setSearchAturan((prev) => ({ ...prev, ["grp-" + grp.id]: e.target.value })); setShowDropdownAturan((prev) => ({ ...prev, ["grp-" + grp.id]: true })) }}
                          onFocus={() => { setShowDropdownAturan((prev) => ({ ...prev, ["grp-" + grp.id]: true })); if (!searchAturan["grp-" + grp.id]) fetchAturan() }}
                          className="w-full px-3 pr-8 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent"
                          placeholder="Aturan Pakai"
                        />
                        <button
                          type="button"
                          onClick={() => { setMasterAturanItemId('grp-' + grp.id); setMasterAturanInput(grp.aturan_pakai || (searchAturan['grp-' + grp.id] || '')); setShowMasterAturanModal(true) }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-md border border-red-500 text-red-500 hover:bg-red-500/20"
                          aria-label="Tambah master aturan pakai"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </button>

                        <AnimatePresence initial={false}>
                          {showDropdownAturan['grp-' + grp.id] && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.18 }}
                              className="absolute z-20 w-full mt-1 bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] border border-[oklch(28.3%_0.141_291.089_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[84vh] overflow-y-auto"
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
                                    onClick={() => { updateRacikanGroup(grp.id, 'aturan_pakai', opt.aturan); setShowDropdownAturan((prev) => ({ ...prev, ['grp-' + grp.id]: false })) }}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.14 }}
                                    className="w-full text-left px-3 py-2 border-b border-[oklch(28.3%_0.141_291.089_/_0.25)]"
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
                        <button type="button" onClick={() => handleSaveAsTemplate(grp)} disabled={isSavingTemplate} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-indigo-300 text-indigo-600 hover:bg-indigo-50" title="Simpan sebagai template">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        </button>
                        <button type="button" onClick={() => setActiveRacikId(grp.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(28.3%_0.141_291.089)]">✎</button>
                        <button type="button" onClick={() => removeRacikanGroup(grp.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(28.3%_0.141_291.089)]">−</button>
                      </div>
                      <div className="col-span-12">
                        <input type="text" value={grp.keterangan} onChange={(e) => updateRacikanGroup(grp.id, 'keterangan', e.target.value)} className="w-full px-3 py-2 rounded-md border border-dashed border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Keterangan (opsional)" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {activeRacikId && (
              <div className="relative rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.4)]">
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="text-sm font-semibold">Bahan Racikan</div>
                  <button type="button" onClick={() => addRacikanItem(activeRacikId)} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-[oklch(28.3%_0.141_291.089)]">Tambah Bahan</button>
                </div>
                <div className="p-3 space-y-2">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4 text-[11px]">Nama Bahan</div>
                    <div className="col-span-1 text-[11px]">P1</div>
                    <div className="col-span-1 text-[11px]">P2</div>
                    <div className="col-span-2 text-[11px]">Kandungan (mg)</div>
                    <div className="col-span-1 text-[11px]">Kapasitas</div>
                    <div className="col-span-1 text-[11px]">Jml</div>
                    <div className="col-span-1 text-[11px]">Satuan</div>
                    <div className="col-span-1"></div>
                  </div>
                  {(racikanGroups.find((g) => g.id === activeRacikId)?.items || []).map((it) => (
                    <div key={it.id} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-4 relative dropdown-container">
                        <input type="text" value={it.nama_brng} onChange={(e) => { updateRacikanItem(activeRacikId, it.id, 'nama_brng', e.target.value); setRacikSearchObat((prev) => ({ ...prev, [it.id]: e.target.value })); setRacikDropdownObat((prev) => ({ ...prev, [it.id]: true })) }} onFocus={() => { setRacikDropdownObat((prev) => ({ ...prev, [it.id]: true })); if (!racikSearchObat[it.id] && kdPoli) fetchObat() }} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Pilih Bahan" />
                        <AnimatePresence initial={false}>
                          {racikDropdownObat[it.id] && (
                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute z-50 w-full mt-1 bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] border border-[oklch(28.3%_0.141_291.089_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[84vh] overflow-y-auto">
                              {loadingObat ? (
                                <div className="p-3 text-center text-[12px] opacity-70">Memuat…</div>
                              ) : (
                                obatOptions.map((obat, idx) => (
                                  <motion.button type="button" key={`${obat.kode_brng}-${idx}`} onClick={() => selectRacikanObat(activeRacikId, it.id, obat)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.14 }} className="w-full text-left px-3 py-2 border-b border-[oklch(28.3%_0.141_291.089_/_0.25)]">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <div className="font-medium text-[12px]">{obat.nama_brng}</div>
                                        <div className="text-[11px] opacity-70">{obat.kode_brng}</div>
                                      </div>
                                      <div className="shrink-0 text-right">
                                        <div className="text-[10px] opacity-80">Stok</div>
                                        <div className="text-[11px]">{Number(obat.total_stok || 0).toLocaleString('id-ID')}</div>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="col-span-1">
                        <input type="number" min="0" value={it.p1 || ''} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'p1', parseFloat(e.target.value) || '')} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="P1" />
                      </div>
                      <div className="col-span-1">
                        <input type="number" min="0" value={it.p2 || ''} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'p2', parseFloat(e.target.value) || '')} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="P2" />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" value={it.kandungan || ''} onChange={(e) => updateRacikanItem(activeRacikId, it.id, 'kandungan', parseFloat(e.target.value) || '')} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="mg per dosis" />
                      </div>
                      <div className="col-span-1">
                        <input type="number" value={it.kapasitas || ''} readOnly className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-neutral-900/20" placeholder="-" />
                      </div>
                      <div className="col-span-1">
                        <input type="number" value={it.jml || ''} readOnly className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-neutral-900/20" placeholder="-" />
                      </div>
                      <div className="col-span-1">
                        <input type="text" value={it.satuan || ''} readOnly className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-neutral-900/20" placeholder="-" />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button type="button" onClick={() => removeRacikanItem(activeRacikId, it.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(28.3%_0.141_291.089)]">−</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex w-full flex-col sm:flex-row items-end sm:justify-end gap-2 mt-3 pt-3 border-t border-[oklch(28.3%_0.141_291.089_/_0.35)]">
              <button type="submit" disabled={isSubmittingRacikan || racikanGroups.length === 0} className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-pink-300 bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-50">{isSubmittingRacikan ? "Menyimpan…" : "Simpan Racikan"}</button>
            </div>

          </motion.form>
        )}
      </AnimatePresence>



      <AnimatePresence initial={false}>
        {showRiwayatResep && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="mt-3 border border-[oklch(28.3%_0.141_291.089_/_0.35)] rounded-md p-3">
            {loadingRiwayat ? (
              <div className="flex items-center justify-center py-6 text-[12px] opacity-70">Memuat riwayat resep…</div>
            ) : riwayatResep.length === 0 ? (
              <div className="text-center py-6 text-[12px] opacity-70">Belum ada riwayat resep</div>
            ) : (
              <div className="space-y-3">
                {riwayatResep.map((resep, index) => (
                  <div key={index} className="border border-[oklch(28.3%_0.141_291.089_/_0.35)] rounded-md p-3">
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
                        <button onClick={() => handleCopyResep(resep)} className="px-3 py-1 text-xs rounded-md border border-[oklch(28.3%_0.141_291.089)]">Copy</button>
                        <button onClick={() => deleteResep(resep)} disabled={deletingResep === `${resep.tgl_peresepan}_${resep.jam_peresepan}`} className="px-3 py-1 text-xs rounded-md border border-[oklch(28.3%_0.141_291.089)] disabled:opacity-50">Hapus</button>
                        <button onClick={() => handlePenyerahan(resep)} disabled={penyerahanLoading[resep.no_resep]} className="px-3 py-1 text-xs rounded-md border border-[oklch(28.3%_0.141_291.089)] disabled:opacity-50">Penyerahan</button>
                      </div>
                    </div>

                    {Array.isArray(resep.detail_obat) && resep.detail_obat.length > 0 && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full border border-[oklch(28.3%_0.141_291.089_/_0.35)] text-[12px]">
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
                              <tr key={obatIndex} className="border-t border-[oklch(28.3%_0.141_291.089_/_0.25)]">
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
                    <button onClick={loadMoreResep} disabled={loadingMore} className="px-3 py-1.5 text-sm rounded-md border border-[oklch(28.3%_0.141_291.089)] disabled:opacity-50">{loadingMore ? "Memuat…" : "Muat Lebih Banyak"}</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showSavedResep && savedResep && (
        <div className="mt-4 border border-[oklch(28.3%_0.141_291.089_/_0.4)] rounded-md">
          <div className="flex justify-between items-center px-3 py-2 border-b border-[oklch(28.3%_0.141_291.089_/_0.35)]">
            <div className="text-sm font-semibold">Data Resep Tersimpan</div>
            <button onClick={() => setShowSavedResep(false)} className="text-[oklch(14.5%_0_0_/_0.7)] hover:text-[oklch(14.5%_0_0)]">✕</button>
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
                  <button onClick={() => handlePenyerahan(savedResep)} disabled={penyerahanLoading[savedResep.no_resep]} className="px-4 py-2 text-xs rounded-md border border-[oklch(28.3%_0.141_291.089)] disabled:opacity-50">{penyerahanLoading[savedResep.no_resep] ? "Memproses…" : "Penyerahan Obat"}</button>
                </div>
              )}
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border border-[oklch(28.3%_0.141_291.089_/_0.35)] text-[12px]">
                <thead className="bg-[oklch(14.5%_0_0_/_0.25)]">
                  <tr>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-left">Kode Obat</th>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-left">Nama Obat</th>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-left">Aturan Pakai</th>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-center">Jumlah</th>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-right">Harga</th>
                    <th className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {savedResep.detail_obat && savedResep.detail_obat.map((it, idx) => (
                    <tr key={idx} className="hover:bg-[oklch(14.5%_0_0_/_0.2)]">
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2">{it.kode_brng}</td>
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2">{it.nama_brng || "-"}</td>
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2">{it.aturan_pakai}</td>
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2 text-center">{it.jml} {it.satuan}</td>
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2 text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(it.harga || 0)}</td>
                      <td className="border border-[oklch(28.3%_0.141_291.089_/_0.15)] px-3 py-2 text-right">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format((it.jml || 0) * (it.harga || 0))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[oklch(14.5%_0_0_/_0.25)]">
                  <tr>
                    <td colSpan="5" className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-right font-semibold">Total Keseluruhan:</td>
                    <td className="border border-[oklch(28.3%_0.141_291.089_/_0.2)] px-3 py-2 text-right font-semibold">{savedResep.detail_obat && new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(savedResep.detail_obat.reduce((total, it) => total + (it.jml || 0) * (it.harga || 0), 0))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {Array.isArray(savedResep.racikan) && savedResep.racikan.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="text-sm font-semibold">Detail Racikan</div>
                {savedResep.racikan.map((grp, gidx) => (
                  <div key={gidx} className="border border-[oklch(28.3%_0.141_291.089_/_0.35)] rounded-md">
                    <div className="px-3 py-2 bg-[oklch(14.5%_0_0_/_0.2)] flex items-center justify-between">
                      <div className="text-[12px]">
                        <div className="font-semibold">{grp.nama_racik || (`Racikan #${grp.no_racik}`)}</div>
                        <div className="opacity-70">Metode: {grp.metode} • Jumlah dosis: {grp.jml_dr}</div>
                        {grp.aturan_pakai && (<div className="opacity-70">Aturan pakai: {grp.aturan_pakai}</div>)}
                        {grp.keterangan && (<div className="opacity-70">Keterangan: {grp.keterangan}</div>)}
                      </div>
                    </div>
                    <div className="overflow-x-auto p-3">
                      <table className="min-w-full border border-[oklch(28.3%_0.141_291.089_/_0.35)] text-[12px]">
                        <thead className="bg-[oklch(14.5%_0_0_/_0.25)]">
                          <tr>
                            <th className="px-3 py-2 text-left">Kode</th>
                            <th className="px-3 py-2 text-left">Nama</th>
                            <th className="px-3 py-2 text-center">Jml</th>
                            <th className="px-3 py-2 text-center">Kandungan</th>
                            <th className="px-3 py-2 text-left">Satuan</th>
                            <th className="px-3 py-2 text-right">Tarif</th>
                            <th className="px-3 py-2 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(grp.details || []).map((d, didx) => (
                            <tr key={didx} className="border-t border-[oklch(28.3%_0.141_291.089_/_0.25)]">
                              <td className="px-3 py-2">{d.kode_brng}</td>
                              <td className="px-3 py-2">{d.nama_brng}</td>
                              <td className="px-3 py-2 text-center">{d.jml}</td>
                              <td className="px-3 py-2 text-center">{d.kandungan}</td>
                              <td className="px-3 py-2">{d.satuan}</td>
                              <td className="px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(d.tarif || 0)}</td>
                              <td className="px-3 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(d.subtotal || 0)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-[oklch(14.5%_0_0_/_0.25)]">
                          <tr>
                            <td colSpan="6" className="px-3 py-2 text-right font-semibold">Subtotal Racikan:</td>
                            <td className="px-3 py-2 text-right font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format((grp.details || []).reduce((s, i) => s + (i.subtotal || 0), 0))}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {showMasterAturanModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.18 }} className="w-full max-w-sm bg-[oklch(98.5%_0_0)] text-[oklch(14.5%_0_0)] border border-[oklch(28.3%_0.141_291.089_/_0.45)] rounded-md p-3">
              <div className="text-sm font-semibold mb-2">Tambah Master Aturan Pakai</div>
              <input type="text" value={masterAturanInput} onChange={(e) => setMasterAturanInput(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(28.3%_0.141_291.089_/_0.35)] bg-transparent" placeholder="Masukkan aturan pakai" />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => { setShowMasterAturanModal(false); setMasterAturanItemId(null) }} className="px-3 py-1.5 rounded-md border border-[oklch(28.3%_0.141_291.089)]">Batal</button>
                <button type="button" onClick={saveMasterAturan} disabled={masterAturanSaving || (masterAturanInput || "").trim() === ""} className="px-3 py-1.5 rounded-md border border-[oklch(28.3%_0.141_291.089)] disabled:opacity-50">{masterAturanSaving ? "Menyimpan…" : "Simpan"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showTemplateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-10 py-6 border-b border-gray-100 flex items-center justify-between bg-indigo-600 text-white">
                <h3 className="font-bold text-lg text-white">Pilih Template Racikan</h3>
                <button onClick={() => setShowTemplateModal(false)} className="hover:rotate-90 transition-transform duration-200">✕</button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {loadingTemplates ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-3">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm">Memuat daftar template…</p>
                  </div>
                ) : templates.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-gray-500">Anda belum memiliki template racikan.</p>
                    <p className="text-xs text-gray-400 mt-1">Simpan racikan dari form untuk membuatnya sebagai template.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={templateQuery}
                        onChange={(e) => setTemplateQuery(e.target.value)}
                        placeholder="Cari template: Nama/Dosis/Aturan Pakai/Keterangan"
                        className="w-full rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-indigo-500/60 focus:outline-none transition-colors placeholder:text-gray-400 text-sm h-10 pl-10 pr-3"
                      />
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <div className="hidden md:grid grid-cols-4 gap-2 bg-gray-50 text-gray-600 text-xs border-b">
                        <div className="px-3 py-2">Nama racikan</div>
                        <div className="px-3 py-2">Dosis</div>
                        <div className="px-3 py-2">Aturan Pakai</div>
                        <div className="px-3 py-2">Keterangan</div>
                      </div>
                      <div className="divide-y">
                        {templates
                          .filter((tpl) => {
                            const q = (templateQuery || "").toLowerCase()
                            if (!q) return true
                            const fields = [tpl.nama_racik, tpl.jml_dr, tpl.aturan_pakai, tpl.keterangan]
                            return fields.some((v) => String(v ?? "").toLowerCase().includes(q))
                          })
                          .map((tpl) => (
                            <button
                              key={tpl.no_template}
                              onClick={() => loadTemplate(tpl)}
                              className="w-full text-left hover:bg-indigo-50/60 transition-colors"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-3 py-2">
                                <div className="text-sm text-gray-800">
                                  <div className="md:hidden text-[11px] text-gray-500">Nama racikan</div>
                                  <div className="truncate font-medium">{tpl.nama_racik}</div>
                                </div>
                                <div className="text-sm text-gray-800">
                                  <div className="md:hidden text-[11px] text-gray-500">Dosis</div>
                                  <div className="truncate">{tpl.jml_dr}</div>
                                </div>
                                <div className="text-sm text-gray-800">
                                  <div className="md:hidden text-[11px] text-gray-500">Aturan Pakai</div>
                                  <div className="truncate">{tpl.aturan_pakai || "-"}</div>
                                </div>
                                <div className="text-sm text-gray-800">
                                  <div className="md:hidden text-[11px] text-gray-500">Keterangan</div>
                                  <div className="truncate">{tpl.keterangan || "-"}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button onClick={() => setShowTemplateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CopyResep isOpen={showCopyModal} onClose={handleCloseCopyModal} resepData={selectedResepForCopy} token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} kdPoli={kdPoli} status={status} onResepSaved={handleResepSaved} />
    </div>
  )
}
