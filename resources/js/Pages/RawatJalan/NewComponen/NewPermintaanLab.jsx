import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import axios from "axios"
import { todayDateString, nowDateTimeString } from "@/tools/datetime"
import { createPageVariants, contentSpring } from "@/tools/motion"

export default function NewPermintaanLab({ _token = "", _noRkmMedis = "", noRawat = "" }) {
  const [dir, setDir] = useState(1)
  const reduced = useReducedMotion()
  const pageVariants = createPageVariants(reduced)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [availableTests, setAvailableTests] = useState([])
  const [selectedTests, setSelectedTests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("PK")

  const [dokterPerujuk, setDokterPerujuk] = useState({ kd_dokter: "", nm_dokter: "" })
  const [dokterOptions, setDokterOptions] = useState([])
  const [loadingDokter, setLoadingDokter] = useState(false)
  const [dokterSearch, setDokterSearch] = useState("")
  const [isDokterDropdownOpen, setIsDokterDropdownOpen] = useState(false)
  const dokterDropdownRef = useRef(null)

  const [selectedTemplates, setSelectedTemplates] = useState({})
  const [templatesData, setTemplatesData] = useState({})
  const [loadingTemplates, setLoadingTemplates] = useState({})

  const [formData, setFormData] = useState({
    tgl_permintaan: todayDateString(),
    jam_permintaan: nowDateTimeString().split(" ")[1].substring(0, 5),
    status: "ralan",
    informasi_tambahan: "-",
    diagnosa_klinis: "-",
  })

  const updateFormData = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    fetchAvailableTests()
  }, [])

  useEffect(() => {
    fetchDokter()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dokterDropdownRef.current && !dokterDropdownRef.current.contains(event.target)) {
        setIsDokterDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchAvailableTests = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("/api/lab-tests", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      setAvailableTests(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [])
    } catch (_) {
      setAvailableTests([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDokter = async () => {
    setLoadingDokter(true)
    try {
      const resp = await axios.get("/api/dokter", { headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true })
      if (resp?.data?.success) {
        const list = (resp.data.data || []).filter((d) => d.kd_dokter !== "-")
        setDokterOptions(list)
      } else {
        try {
          const respAlt = await axios.get("/api/public/dokter", { params: { search: "" }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true })
          const arr = Array.isArray(respAlt?.data?.data) ? respAlt.data.data : Array.isArray(respAlt?.data) ? respAlt.data : []
          const normalized = arr.map((d) => ({ kd_dokter: d.kd_dokter ?? d.kode ?? "", nm_dokter: d.nm_dokter ?? d.nama ?? "" })).filter((d) => d.kd_dokter && d.nm_dokter)
          setDokterOptions(normalized)
        } catch (_) {
          setDokterOptions([])
        }
      }
    } catch (_) {
      try {
        const respAlt = await axios.get("/api/public/dokter", { params: { search: "" }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }, withCredentials: true })
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

  const filteredDokterOptions = (dokterOptions || []).filter((d) => (d.nm_dokter || "").toLowerCase().includes(dokterSearch.toLowerCase()) || (d.kd_dokter || "").toLowerCase().includes(dokterSearch.toLowerCase()))

  const handleDokterSelect = (dokter) => {
    if (dokter) {
      setDokterPerujuk({ kd_dokter: dokter.kd_dokter, nm_dokter: dokter.nm_dokter })
      setDokterSearch(dokter.nm_dokter)
    } else {
      setDokterPerujuk({ kd_dokter: "", nm_dokter: "" })
      setDokterSearch("")
    }
    setIsDokterDropdownOpen(false)
  }

  const fetchTemplatesForTest = async (kdJenisPrw) => {
    if (templatesData[kdJenisPrw]) return
    setLoadingTemplates((prev) => ({ ...prev, [kdJenisPrw]: true }))
    try {
      const { data } = await axios.get(`/api/permintaan-lab/templates`, { params: { kd_jenis_prw: kdJenisPrw }, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } })
      const rows = Array.isArray(data?.data) ? data.data : []
      setTemplatesData((prev) => ({ ...prev, [kdJenisPrw]: rows }))
      if (rows.length > 0) {
        const ids = rows.map((t) => t.id_template)
        setSelectedTemplates((prev) => ({ ...prev, [kdJenisPrw]: ids }))
      }
    } catch (_) {
      setTemplatesData((prev) => ({ ...prev, [kdJenisPrw]: [] }))
    } finally {
      setLoadingTemplates((prev) => ({ ...prev, [kdJenisPrw]: false }))
    }
  }

  const addTest = async (test) => {
    if (!selectedTests.find((t) => t.kd_jenis_prw === test.kd_jenis_prw)) {
      const biaya = typeof test.total_byr === "string" ? parseFloat(String(test.total_byr).replace(/[^\d.-]/g, "")) || 0 : Number(test.total_byr) || 0
      setSelectedTests((prev) => [...prev, { ...test, total_byr: biaya, stts_bayar: "Belum" }])
      setSearchTerm("")
      await fetchTemplatesForTest(test.kd_jenis_prw)
    }
  }

  const removeTest = (kdJenisPrw) => {
    setSelectedTests((prev) => prev.filter((t) => t.kd_jenis_prw !== kdJenisPrw))
    setSelectedTemplates((prev) => {
      const next = { ...prev }
      delete next[kdJenisPrw]
      return next
    })
    setTemplatesData((prev) => {
      const next = { ...prev }
      delete next[kdJenisPrw]
      return next
    })
  }

  const toggleTemplate = (kdJenisPrw, idTemplate) => {
    setSelectedTemplates((prev) => {
      const cur = prev[kdJenisPrw] || []
      const on = cur.includes(idTemplate)
      return { ...prev, [kdJenisPrw]: on ? cur.filter((id) => id !== idTemplate) : [...cur, idTemplate] }
    })
  }

  const selectAllTemplates = (kdJenisPrw) => {
    const templates = templatesData[kdJenisPrw] || []
    const ids = templates.map((t) => t.id_template)
    setSelectedTemplates((prev) => ({ ...prev, [kdJenisPrw]: ids }))
  }

  const deselectAllTemplates = (kdJenisPrw) => {
    setSelectedTemplates((prev) => ({ ...prev, [kdJenisPrw]: [] }))
  }

  const filteredTestsByCategory = (availableTests || []).filter((test) => {
    const cat = test.kategori || test.kd_kategori || "PK"
    if (activeCategory === "PK") return cat === "PK" || !cat
    if (activeCategory === "PA") return cat === "PA"
    if (activeCategory === "MB") return cat === "MB"
    return true
  })

  const filteredTestsSearch = filteredTestsByCategory.filter((test) => (test.nm_perawatan || "").toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredTests = filteredTestsSearch.filter((test) => !selectedTests.some((s) => s.kd_jenis_prw === test.kd_jenis_prw))
  const displayedTests = searchTerm ? filteredTests : filteredTests.slice(0, 3)

  const getTotalBiaya = () => selectedTests.reduce((total, test) => {
    const biaya = typeof test.total_byr === "string" ? parseFloat(String(test.total_byr).replace(/[^\d.-]/g, "")) || 0 : Number(test.total_byr) || 0
    return total + biaya
  }, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedTests.length === 0) return alert("Pilih minimal satu pemeriksaan laboratorium")
    if (!dokterPerujuk.kd_dokter || dokterPerujuk.kd_dokter === "-") return alert("Pilih dokter perujuk")
    if (!String(formData.diagnosa_klinis || "").trim() || String(formData.diagnosa_klinis).trim() === "-") return alert("Diagnosa klinis wajib diisi")
    for (const test of selectedTests) {
      const ids = selectedTemplates[test.kd_jenis_prw] || []
      if (ids.length === 0) return alert(`Pilih minimal satu template untuk pemeriksaan: ${test.nm_perawatan}`)
    }
    setIsSubmitting(true)
    try {
      const detailTests = selectedTests.map((test) => ({ kd_jenis_prw: test.kd_jenis_prw, stts_bayar: test.stts_bayar, templates: selectedTemplates[test.kd_jenis_prw] || [] }))
      const submitData = { no_rawat: noRawat, ...formData, dokter_perujuk: dokterPerujuk.kd_dokter || "-", detail_tests: detailTests }
      const resp = await axios.post("/api/permintaan-lab", submitData, { headers: { Accept: "application/json" } })
      if (resp?.data?.success) {
        let noorder = resp?.data?.data?.noorder || null
        setSelectedTests([])
        setFormData({ tgl_permintaan: todayDateString(), jam_permintaan: nowDateTimeString().split(" ")[1].substring(0, 5), status: "ralan", informasi_tambahan: "-", diagnosa_klinis: "-" })
        setDokterPerujuk({ kd_dokter: "", nm_dokter: "" })
        setDokterSearch("")
        setSelectedTemplates({})
        setTemplatesData({})
        if (noorder) {
          try {
            setIsSubmitting(true)
            const stageRes = await axios.post("/api/permintaan-lab/stage-lab", { noorder }, { headers: { Accept: "application/json" } })
            const stageOk = stageRes?.data?.success && stageRes?.data?.meta?.balanced
            if (!stageOk) {
              const msg = stageRes?.data?.message || "Staging jurnal gagal atau tidak seimbang. Posting dibatalkan."
              alert(`Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun staging jurnal gagal: ${msg}`)
              setIsSubmitting(false)
              return
            }
            try {
              const postRes = await axios.post("/api/akutansi/jurnal/post", { no_bukti: noorder, keterangan: `Posting otomatis permintaan Laboratorium noorder ${noorder}${noRawat ? ` (no_rawat ${noRawat})` : ''}` }, { headers: { Accept: "application/json" } })
              if (postRes?.status === 201 && postRes?.data?.no_jurnal) {
                const noJurnal = postRes.data.no_jurnal
                alert(`Permintaan laboratorium berhasil disimpan (No: ${noorder}) dan jurnal diposting (No: ${noJurnal}).`)
              } else {
                const errMsg = postRes?.data?.message || `Posting jurnal gagal (Status: ${postRes?.status || 0}).`
                alert(`Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun posting jurnal gagal: ${errMsg}`)
              }
            } catch (postError) {
              const errMsg = postError?.response?.data?.message || postError?.message || "Gagal melakukan posting jurnal otomatis."
              alert(`Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun terjadi kesalahan saat posting jurnal: ${errMsg}`)
            } finally {
              setIsSubmitting(false)
            }
          } catch (stageError) {
            const errMsg = stageError?.response?.data?.message || stageError?.message || "Gagal melakukan Staging jurnal."
            alert(`Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun terjadi kesalahan saat staging jurnal: ${errMsg}`)
            setIsSubmitting(false)
          }
        } else {
          alert("Permintaan laboratorium berhasil disimpan")
        }
      } else {
        alert(resp?.data?.message || "Gagal menyimpan permintaan laboratorium")
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Terjadi kesalahan saat menyimpan permintaan"
      alert(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchCategory = (cat) => {
    setDir(cat === "PK" ? -1 : 1)
    setActiveCategory(cat)
  }

  return (
    <div className="space-y-4 text-[oklch(98.5%_0_0)]">
      <div className="flex border-b border-[oklch(84.1%_0.238_128.85_/_0.35)] gap-2">
        {[{ key: "PK", label: "Patologi Klinis" }, { key: "PA", label: "Patologi Anatomi" }, { key: "MB", label: "Mikrobiologi" }].map((tab) => (
          <button key={tab.key} onClick={() => switchCategory(tab.key)} className={`px-3 py-2 text-xs font-medium border-b-2 ${activeCategory === tab.key ? "border-[oklch(84.1%_0.238_128.85)] text-[oklch(98.5%_0_0)]" : "border-transparent text-[oklch(98.5%_0_0_/_0.6)] hover:text-[oklch(98.5%_0_0)]"}`}>{tab.label}</button>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.form key={`cat-${activeCategory}`} variants={pageVariants} custom={dir} initial="enter" animate="center" exit="exit" transition={contentSpring} onSubmit={handleSubmit} className="space-y-4 transform-gpu will-change-transform will-change-opacity">
          <div className="relative overflow-visible rounded-md bg-[oklch(14.5%_0_0_/_0.3)] border border-[oklch(84.1%_0.238_128.85_/_0.4)]">
            <div className="px-3 py-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <div className="text-xs font-medium">Tanggal Permintaan</div>
                  <input type="date" value={formData.tgl_permintaan} onChange={(e) => updateFormData("tgl_permintaan", e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" required />
                </div>
                <div>
                  <div className="text-xs font-medium">Jam Permintaan</div>
                  <input type="time" value={formData.jam_permintaan} onChange={(e) => updateFormData("jam_permintaan", e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" required />
                </div>
                <div>
                  <div className="text-xs font-medium">Dokter Perujuk</div>
                  <div className="relative z-30" ref={dokterDropdownRef}>
                    <input type="text" value={dokterSearch} onChange={(e) => { setDokterSearch(e.target.value); setIsDokterDropdownOpen(true) }} onFocus={() => setIsDokterDropdownOpen(true)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Cari dokter perujuk..." required />
                    {isDokterDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.5)] rounded-md shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] max-h-[60vh] overflow-y-auto">
                        {loadingDokter ? (
                          <div className="p-3 text-center text-[12px] opacity-70">Memuat…</div>
                        ) : filteredDokterOptions.length > 0 ? (
                          filteredDokterOptions.map((dokter) => (
                            <button type="button" key={dokter.kd_dokter} onClick={() => handleDokterSelect(dokter)} className="w-full text-left px-3 py-2 border-b border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                              <div className="font-medium text-[12px]">{dokter.nm_dokter}</div>
                              <div className="text-[11px] opacity-70">{dokter.kd_dokter}</div>
                            </button>
                          ))
                        ) : (
                          <div className="p-3 text-center text-[12px] opacity-70">Tidak ada dokter ditemukan</div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-xs font-medium">Diagnosa Klinis</div>
                  <input type="text" value={formData.diagnosa_klinis} onChange={(e) => updateFormData("diagnosa_klinis", e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Masukkan diagnosa klinis" required />
                </div>
                <div>
                  <div className="text-xs font-medium">Informasi Tambahan</div>
                  <input type="text" value={formData.informasi_tambahan} onChange={(e) => updateFormData("informasi_tambahan", e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Informasi tambahan (opsional)" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Cari Pemeriksaan ({activeCategory})</div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.35)] bg-transparent" placeholder="Cari nama pemeriksaan..." />
            {isLoading ? (
              <div className="p-3 text-center text-[12px] opacity-70">Memuat pemeriksaan…</div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md">
                {displayedTests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
                    {displayedTests.map((test) => (
                      <div key={test.kd_jenis_prw} className="p-3 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{test.nm_perawatan}</div>
                            <div className="text-[11px] opacity-70">Kode: {test.kd_jenis_prw}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] text-green-400 font-medium">{test.total_byr_formatted || "Rp 0"}</div>
                            <button type="button" onClick={() => addTest(test)} disabled={selectedTests.find((t) => t.kd_jenis_prw === test.kd_jenis_prw)} className="ml-3 mt-1 px-3 py-1.5 text-xs rounded-md border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-50">
                              {selectedTests.find((t) => t.kd_jenis_prw === test.kd_jenis_prw) ? "Dipilih" : "Pilih"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-[12px] opacity-70">{searchTerm ? "Tidak ada pemeriksaan yang ditemukan" : "Tidak ada pemeriksaan tersedia"}</div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Pemeriksaan Terpilih</div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[oklch(84.1%_0.238_128.85_/_0.15)]">{selectedTests.length} pemeriksaan</span>
            </div>
            {selectedTests.length > 0 ? (
              <div className="border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                <div className="p-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {selectedTests.map((test, index) => (
                      <div key={`summary-${test.kd_jenis_prw}`} className="p-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[oklch(84.1%_0.238_128.85_/_0.15)] text-[oklch(98.5%_0_0)] text-[11px] font-medium">{index + 1}</span>
                              <div className="text-[12px] font-medium truncate">{test.nm_perawatan}</div>
                            </div>
                            <div className="text-[10px] opacity-70 ml-7 truncate">{test.kd_jenis_prw} • <span className="text-green-400 font-medium">Rp {(typeof test.total_byr === "number" ? test.total_byr : parseFloat(String(test.total_byr).replace(/[^\d.-]/g, "")) || 0).toLocaleString("id-ID")}</span></div>
                          </div>
                          <button type="button" onClick={() => removeTest(test.kd_jenis_prw)} className="ml-3 inline-flex items-center justify-center w-7 h-7 rounded-md border border-[oklch(84.1%_0.238_128.85)]">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedTests.map((test, index) => {
                  const templates = templatesData[test.kd_jenis_prw] || []
                  const selectedIds = selectedTemplates[test.kd_jenis_prw] || []
                  const loading = loadingTemplates[test.kd_jenis_prw] || false
                  const allSelected = templates.length > 0 && selectedIds.length === templates.length
                  return (
                    <div key={test.kd_jenis_prw} className="py-3 border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[oklch(84.1%_0.238_128.85_/_0.15)] text-[oklch(98.5%_0_0)] text-[11px] font-medium">{index + 1}</span>
                            <div className="text-sm font-medium">{test.nm_perawatan}</div>
                          </div>
                          <div className="text-[11px] opacity-70 ml-7">Kode: {test.kd_jenis_prw} • <span className="text-green-400 font-medium">Rp {(typeof test.total_byr === "number" ? test.total_byr : parseFloat(String(test.total_byr).replace(/[^\d.-]/g, "")) || 0).toLocaleString("id-ID")}</span></div>
                        </div>
                        <button type="button" onClick={() => removeTest(test.kd_jenis_prw)} className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-md border border-[oklch(84.1%_0.238_128.85)]">✕</button>
                      </div>
                      <div className="ml-7">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-[11px] font-medium">Pilih Detail Template ({selectedIds.length} / {templates.length})</div>
                          {templates.length > 0 && (
                            <div className="flex gap-2">
                              <button type="button" onClick={() => selectAllTemplates(test.kd_jenis_prw)} disabled={allSelected} className="text-[11px]">Pilih Semua</button>
                              <span className="opacity-40">|</span>
                              <button type="button" onClick={() => deselectAllTemplates(test.kd_jenis_prw)} disabled={selectedIds.length === 0} className="text-[11px]">Hapus Semua</button>
                            </div>
                          )}
                        </div>
                        {loading ? (
                          <div className="p-2 text-center text-[12px] opacity-70">Memuat…</div>
                        ) : templates.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                            {templates.map((template) => {
                              const on = selectedIds.includes(template.id_template)
                              return (
                                <label key={template.id_template} className={`flex items-start gap-2 p-2 rounded border ${on ? "bg-[oklch(14.5%_0_0_/_0.2)] border-[oklch(84.1%_0.238_128.85_/_0.3)]" : "bg-transparent border-[oklch(84.1%_0.238_128.85_/_0.25)]"}`}>
                                  <input type="checkbox" checked={on} onChange={() => toggleTemplate(test.kd_jenis_prw, template.id_template)} className="mt-0.5 h-3.5 w-3.5" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[12px] font-medium">{template.Pemeriksaan || "Nama tidak tersedia"}</div>
                                    {template.satuan && <div className="text-[10px] opacity-70 mt-0.5">Satuan: {template.satuan}</div>}
                                  </div>
                                </label>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-2 text-[12px] opacity-70">Tidak ada template tersedia</div>
                        )}
                        {selectedIds.length === 0 && templates.length > 0 && (
                          <div className="mt-1 text-[11px] text-red-400">Pilih minimal satu template</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-[12px] opacity-70 border border-dashed border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md">Belum ada pemeriksaan yang dipilih</div>
            )}
            {selectedTests.length > 0 && (
              <div className="flex justify-between items-center pt-3 border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
                <span className="text-[12px] font-medium">Total Biaya</span>
                <span className="text-sm font-semibold">Rp {getTotalBiaya().toLocaleString("id-ID")}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[oklch(84.1%_0.238_128.85_/_0.25)]">
            <div className="text-[12px] opacity-70">Total: {selectedTests.length} pemeriksaan dipilih</div>
            <div className="flex gap-2">
              <button type="submit" disabled={isSubmitting || selectedTests.length === 0} className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-[oklch(84.1%_0.238_128.85)] hover:bg-neutral-800 disabled:opacity-50">{isSubmitting ? "Menyimpan…" : "Simpan Permintaan"}</button>
            </div>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  )
}
