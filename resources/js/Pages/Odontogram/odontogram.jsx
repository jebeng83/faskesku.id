import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

export default function OdontogramForm({ noRawat = '' }) {
  const [fdi, setFdi] = useState('')
  const [kondisiOptions, setKondisiOptions] = useState([])
  const [kondisi, setKondisi] = useState('')
  const [diagQuery, setDiagQuery] = useState('')
  const [diagResults, setDiagResults] = useState([])
  const [diagLoading, setDiagLoading] = useState(false)
  const [diagError, setDiagError] = useState('')
  const [diagnosa, setDiagnosa] = useState(null) // { kode, nama }
  const [tindakanList, setTindakanList] = useState([])
  const [tindakanSearch, setTindakanSearch] = useState('')
  const [tindakan, setTindakan] = useState('') // kd_jenis_prw
  const [rincian, setRincian] = useState([]) // list of { elemen_gigi, kondisi:{id,kode,nama}, diagnosa:{kode,nama}, tindakan:{kode,nama} }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // { type: 'success'|'error', message }
  const [noRkmMedis, setNoRkmMedis] = useState('')

  useEffect(() => {
    if (saveStatus?.message) {
      const timer = setTimeout(() => setSaveStatus(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [saveStatus])

  const FDI_OPTIONS = useMemo(() => {
    const series = []
    for (let i = 11; i <= 18; i++) series.push(i)
    for (let i = 21; i <= 28; i++) series.push(i)
    for (let i = 31; i <= 38; i++) series.push(i)
    for (let i = 41; i <= 48; i++) series.push(i)
    for (let i = 51; i <= 55; i++) series.push(i)
    for (let i = 61; i <= 65; i++) series.push(i)
    for (let i = 71; i <= 75; i++) series.push(i)
    for (let i = 81; i <= 85; i++) series.push(i)
    return series.map((n) => ({ value: String(n), label: String(n) }))
  }, [])

  const DEFAULT_KONDISI = useMemo(
    () => [
      { id: 1, kode: 'sou', nama: 'sound' },
      { id: 2, kode: 'non', nama: 'no information' },
      { id: 3, kode: 'une', nama: 'unerupted' },
      { id: 4, kode: 'pre', nama: 'present' },
      { id: 5, kode: 'imx', nama: 'impacted non-visible' },
      { id: 6, kode: 'ano', nama: 'anomali' },
      { id: 7, kode: 'dia', nama: 'diastema' },
      { id: 8, kode: 'abr', nama: null },
      { id: 9, kode: 'car', nama: 'caries' },
      { id: 10, kode: 'cfr', nama: 'crown fractured' },
      { id: 11, kode: 'nvt', nama: 'non-vital tooth' },
      { id: 12, kode: 'rrx', nama: 'retained root' },
      { id: 13, kode: 'mis', nama: 'missing' },
      { id: 14, kode: 'att', nama: 'attrition' },
      { id: 15, kode: 'amf', nama: 'amalgam filling' },
      { id: 16, kode: 'gif', nama: 'glass ionomer filling' },
      { id: 17, kode: 'cof', nama: null },
      { id: 18, kode: 'fis', nama: 'fissure sealant' },
      { id: 19, kode: 'inl', nama: 'inlay' },
      { id: 20, kode: 'onl', nama: 'onlay' },
      { id: 21, kode: 'fmc', nama: 'full metal crown' },
      { id: 22, kode: 'poc', nama: 'porcelain crown' },
      { id: 23, kode: 'mpc', nama: 'metal porcelain crown' },
      { id: 24, kode: 'gmc', nama: 'gold metal crown' },
      { id: 25, kode: 'rct', nama: 'root canal treatment' },
      { id: 26, kode: 'ipx', nama: 'implant' },
      { id: 27, kode: 'meb', nama: 'metal bridge' },
      { id: 28, kode: 'pob', nama: 'porcelain bridge' },
      { id: 29, kode: 'pon', nama: 'pontic' },
      { id: 30, kode: 'abu', nama: 'abutment' },
    ],
    []
  )

  useEffect(() => {
    ;(async () => {
      try {
        if (!noRawat) { setNoRkmMedis(''); return }
        const regRes = await axios.get('/api/reg-periksa/by-rawat', {
          params: { no_rawat: noRawat },
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
        const rm = regRes?.data?.data?.no_rkm_medis || ''
        setNoRkmMedis(rm)
      } catch {
        setNoRkmMedis('')
      }
    })()
  }, [noRawat])

  useEffect(() => {
    ;(async () => {
      try {
        const encodedRM = encodeURIComponent(noRkmMedis || '')
        if (!encodedRM) return
        let res
        try {
          res = await axios.get(`/api/odontogram/pasien/${encodedRM}`, {
            withCredentials: true,
            headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          })
        } catch {
          const encodedNoRawat = encodeURIComponent(noRawat || '')
          if (encodedNoRawat) {
            res = await axios.get(`/api/odontogram/rawat/${encodedNoRawat}`, {
              withCredentials: true,
              headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            })
          }
        }
        const rows = res?.data?.data || []
        const mapped = rows.map((r) => ({
          elemen_gigi: String(r?.elemen_gigi || ''),
          kondisi: {
            id: r?.kondisi?.id ?? null,
            kode: r?.kondisi?.kode || '',
            nama: r?.kondisi?.nama || '',
          },
          diagnosa: {
            kode: r?.penyakit?.kode || r?.kd_penyakit || '',
            nama: r?.penyakit?.nama || '',
          },
          tindakan: {
            kode: r?.jenis_perawatan?.kode || r?.kd_jns_prw || '',
            nama: r?.jenis_perawatan?.nama || '',
          },
          tanggal: r?.tanggal || '',
        }))
        setRincian(mapped)
      } catch {
        // ignore initial load errors
      }
    })()
  }, [noRkmMedis, noRawat])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/tarif-tindakan', {
          params: { jenis_tarif: '' },
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
        const list = res?.data?.data || []
        const mapped = list.map((it) => ({
          kode: it?.kd_jenis_prw || '',
          nama: it?.nm_perawatan || '',
        }))
        setTindakanList(mapped)
      } catch {
        setTindakanList([])
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/odontogram/kondisi', {
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
        const list = res?.data?.data || res?.data || []
        if (Array.isArray(list) && list.length > 0) {
          const mapped = list.map((it) => ({ id: it?.id, kode: it?.kode, nama: it?.nama }))
          setKondisiOptions(mapped)
        } else {
          setKondisiOptions(DEFAULT_KONDISI)
        }
      } catch {
        setKondisiOptions(DEFAULT_KONDISI)
      }
    })()
  }, [DEFAULT_KONDISI])

  useEffect(() => {
    const handle = setTimeout(async () => {
      try {
        setDiagLoading(true)
        setDiagError('')
        const response = await axios.get('/api/pcare/diagnosa', {
          params: { q: diagQuery, start: 0, limit: 25 },
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
        const data = response?.data || {}
        const list = data?.response?.list || data?.list || data?.data || []
        const mapped = list.map((it) => ({ kode: it?.kdDiag || it?.kode || '', nama: it?.nmDiag || it?.nama || '' }))
        setDiagResults(mapped)
      } catch (e) {
        setDiagError(e?.message || 'Gagal memuat data diagnosa')
        setDiagResults([])
      } finally {
        setDiagLoading(false)
      }
    }, 350)
    return () => clearTimeout(handle)
  }, [diagQuery])

  const filteredFdi = useMemo(() => FDI_OPTIONS, [FDI_OPTIONS])

  const filteredTindakan = useMemo(() => {
    const q = tindakanSearch.trim().toLowerCase()
    if (!q) return tindakanList
    return tindakanList.filter((t) => t.nama.toLowerCase().includes(q) || t.kode.toLowerCase().includes(q))
  }, [tindakanSearch, tindakanList])

  const addRincian = () => {
    setSaveStatus(null)
    if (!fdi || !kondisi || !diagnosa?.kode || !tindakan) return
    const kondisiObj = kondisiOptions.find((k) => k.kode === kondisi) || { id: null, kode: kondisi, nama: '' }
    const tindakanObj = tindakanList.find((t) => t.kode === tindakan) || { kode: tindakan, nama: '' }
    const item = {
      elemen_gigi: fdi,
      kondisi: kondisiObj,
      diagnosa: { kode: diagnosa.kode, nama: diagnosa.nama },
      tindakan: tindakanObj,
    }
    setRincian((prev) => {
      const exists = prev.find((p) => p.elemen_gigi === item.elemen_gigi && p.kondisi.kode === item.kondisi.kode && p.diagnosa.kode === item.diagnosa.kode && p.tindakan.kode === item.tindakan.kode)
      if (exists) return prev
      return [...prev, item]
    })
  }

  const removeRincian = async (idx) => {
    const item = rincian[idx]
    if (!item) return
    try {
      if (item.tanggal && noRkmMedis) {
        await axios.delete(`/api/odontogram/medis/${encodeURIComponent(noRkmMedis)}/${encodeURIComponent(item.tanggal)}/${encodeURIComponent(item.elemen_gigi)}`, {
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
        setSaveStatus({ type: 'success', message: 'Rincian odontogram dihapus' })
      }
    } catch (e) {
      setSaveStatus({ type: 'error', message: e?.response?.data?.message || e?.message || 'Gagal menghapus rincian' })
    } finally {
      setRincian((prev) => prev.filter((_, i) => i !== idx))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!noRkmMedis || rincian.length === 0) return
    setIsSubmitting(true)
    setSaveStatus(null)
    try {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
      } catch {}

      let rm = noRkmMedis
      if (!rm && noRawat) {
        try {
          const regRes = await axios.get('/api/reg-periksa/by-rawat', {
            params: { no_rawat: noRawat },
            withCredentials: true,
            headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          })
          rm = regRes?.data?.data?.no_rkm_medis || ''
        } catch {}
      }

      let regDate = ''
      try {
        if (noRawat) {
          const regResDate = await axios.get('/api/reg-periksa/by-rawat', {
            params: { no_rawat: noRawat },
            withCredentials: true,
            headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          })
          const tgl = regResDate?.data?.data?.tgl_registrasi || regResDate?.data?.data?.tgl_periksa || ''
          regDate = tgl ? new Date(tgl).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
        } else {
          regDate = new Date().toISOString().slice(0, 10)
        }
      } catch {
        regDate = new Date().toISOString().slice(0, 10)
      }

      const payload = {
        no_rkm_medis: rm,
        items: rincian.map((r) => ({
          elemen_gigi: Number(r.elemen_gigi),
          id_kondisi_gigi: r?.kondisi?.id ?? null,
          kd_penyakit: r?.diagnosa?.kode || '',
          kd_jns_prw: r?.tindakan?.kode || '',
          status: '1',
          tanggal: regDate,
        })),
      }

      let postRes
      try {
        postRes = await axios.post(`/api/odontogram/medis/${encodeURIComponent(rm)}`, payload, {
          withCredentials: true,
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
      } catch {
        if (noRawat) {
          postRes = await axios.post(`/api/odontogram/rawat/${encodeURIComponent(noRawat)}`, payload, {
            withCredentials: true,
            headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          })
        } else {
          throw new Error('Endpoint penyimpanan tidak tersedia')
        }
      }

      const ok = postRes?.status >= 200 && postRes?.status < 300
      setSaveStatus({ type: ok ? 'success' : 'error', message: ok ? 'Odontogram berhasil disimpan' : 'Gagal menyimpan odontogram' })
    } catch (e) {
      setSaveStatus({ type: 'error', message: e?.response?.data?.message || e?.message || 'Gagal menyimpan odontogram' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ADULT_TOP_LEFT = useMemo(() => ['18','17','16','15','14','13','12','11'], [])
  const ADULT_TOP_RIGHT = useMemo(() => ['21','22','23','24','25','26','27','28'], [])
  const PRIMARY_TOP_LEFT = useMemo(() => ['55','54','53','52','51'], [])
  const PRIMARY_TOP_RIGHT = useMemo(() => ['61','62','63','64','65'], [])
  const PRIMARY_BOTTOM_LEFT = useMemo(() => ['85','84','83','82','81'], [])
  const PRIMARY_BOTTOM_RIGHT = useMemo(() => ['71','72','73','74','75'], [])
  const ADULT_BOTTOM_LEFT = useMemo(() => ['48','47','46','45','44','43','42','41'], [])
  const ADULT_BOTTOM_RIGHT = useMemo(() => ['31','32','33','34','35','36','37','38'], [])

  const colorForKondisi = (kode) => {
    const k = String(kode || '').toLowerCase()
    if (k === 'amf') return 'bg-black text-white'
    if (k === 'gmc') return 'bg-red-600 text-white'
    if (k === 'gif' || k === 'poc' || k === 'mpc' || k === 'inl' || k === 'onl' || k === 'fmc') return 'bg-green-600 text-white'
    if (k === 'fis') return 'bg-pink-500 text-white'
    if (k === 'cfr') return 'bg-indigo-600 text-white'
    if (k === 'mis' || k === 'nvt' || k === 'rrx') return 'bg-neutral-700 text-white'
    return 'bg-blue-600 text-white'
  }

  const mapRincianPerGigi = useMemo(() => {
    const m = {}
    for (const r of rincian) {
      const key = String(r.elemen_gigi || '')
      if (!key) continue
      if (!m[key]) m[key] = []
      const already = m[key].some((x) => String(x.kondisi?.kode || '') === String(r.kondisi?.kode || '') && String(x.diagnosa?.kode || '') === String(r.diagnosa?.kode || '') && String(x.tindakan?.kode || '') === String(r.tindakan?.kode || ''))
      if (!already) m[key].push(r)
    }
    return m
  }, [rincian])

  const ToothTile = ({ code }) => {
    const selected = String(fdi || '') === String(code)
    const items = mapRincianPerGigi[String(code)] || []
    const badges = items.map((it, idx) => (
      <span key={`${code}-b-${idx}`} className={`absolute -top-1 -left-1 translate-y-[-50%] translate-x-[-0%] inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border border-white ${colorForKondisi(it.kondisi?.kode)}`} style={{ marginLeft: idx * 16 }}>
        {String(it.kondisi?.kode || '').toLowerCase()}
      </span>
    ))

    const appliedCodes = (() => {
      const base = items.map((it) => String(it?.kondisi?.kode || '').toLowerCase())
      const preview = selected && kondisi ? [String(kondisi).toLowerCase()] : []
      return Array.from(new Set([...base, ...preview]))
    })()

    const overlays = (() => {
      const nodes = []
      for (const k of appliedCodes) {
        if (!k) continue
        if (k === 'amf') {
          nodes.push(<div key={`${code}-amf`} className="absolute left-1 right-1 top-1 bottom-1 bg-black rounded-sm opacity-80 z-10" />)
        } else if (k === 'cof') {
          nodes.push(<div key={`${code}-cof-fill`} className="absolute left-2 right-2 top-2 bottom-2 bg-green-600/50 rounded-sm z-10" />)
          nodes.push(
            <div
              key={`${code}-cof-stripe`}
              className="absolute left-1 right-1 top-1 bottom-1 z-10"
              style={{
                clipPath: 'polygon(100% 0, 50% 0, 100% 100%)',
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)',
                opacity: 0.5,
              }}
            />
          )
        } else if (k === 'fis') {
          nodes.push(
            <div
              key={`${code}-fis`}
              className="absolute left-2 right-2 top-2 bottom-2 rounded-sm z-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(220,38,38,0.35) 0, rgba(220,38,38,0.35) 2px, transparent 2px, transparent 4px)',
              }}
            />
          )
        } else if (k === 'nvt') {
          nodes.push(
            <div
              key={`${code}-nvt`}
              className="absolute left-1 right-1 bottom-1 z-10"
              style={{ height: '40%', clipPath: 'polygon(50% 100%, 0 0, 100% 0)', background: 'rgba(0,0,0,0.85)' }}
            />
          )
        } else if (k === 'rct') {
          nodes.push(
            <div
              key={`${code}-rct`}
              className="absolute left-2 right-2 bottom-1 z-10"
              style={{ height: '30%', clipPath: 'polygon(50% 100%, 0 0, 100% 0)', background: 'rgba(0,0,0,0.85)' }}
            />
          )
        } else if (k === 'fmc') {
          nodes.push(<div key={`${code}-fmc`} className="absolute inset-0 rounded-md border-[3px] border-black z-10" />)
        } else if (k === 'poc') {
          nodes.push(
            <div
              key={`${code}-poc`}
              className="absolute left-1 right-1 top-1 bottom-1 rounded-sm z-10"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)' }}
            />
          )
        } else if (k === 'mpc') {
          nodes.push(<div key={`${code}-mpc-b`} className="absolute inset-0 rounded-md border-[3px] border-black z-10" />)
          nodes.push(
            <div
              key={`${code}-mpc-s`}
              className="absolute left-1 right-1 top-1 bottom-1 rounded-sm z-10"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)' }}
            />
          )
        } else if (k === 'cfr') {
          nodes.push(
            <React.Fragment key={`${code}-cfr`}>
              <div className="absolute left-2 right-2 top-1 h-[2px] bg-black rotate-45 z-10" />
              <div className="absolute left-2 right-2 top-3 h-[2px] bg-black -rotate-45 z-10" />
            </React.Fragment>
          )
        } else if (k === 'car') {
          nodes.push(
            <div
              key={`${code}-car`}
              className="absolute left-2 right-2 top-2 bottom-2 rounded-sm z-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 4px)',
              }}
            />
          )
        } else if (k === 'rrx') {
          nodes.push(
            <React.Fragment key={`${code}-rrx`}>
              <div className="absolute left-6 bottom-1 w-[2px] z-10" style={{ height: '50%', background: '#000', transform: 'rotate(30deg)' }} />
              <div className="absolute right-6 bottom-1 w-[2px] z-10" style={{ height: '50%', background: '#000', transform: 'rotate(-30deg)' }} />
            </React.Fragment>
          )
        } else if (k === 'mis') {
          nodes.push(
            <React.Fragment key={`${code}-mis`}>
              <div className="absolute left-1 right-1 top-1 h-[2px] bg-black rotate-45 z-10" />
              <div className="absolute left-1 right-1 top-1 h-[2px] bg-black -rotate-45 z-10" />
            </React.Fragment>
          )
        }
      }
      return nodes
    })()

    const baseBorderClass = appliedCodes.some((x) => ['fmc', 'poc', 'mpc'].includes(x))
      ? 'border-black'
      : 'border-[oklch(29.1%_0.149_302.717)]'

    return (
      <button type="button" onClick={() => setFdi(String(code))} className={`relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-md border-2 flex items-center justify-center text-[11px] font-mono transition-colors ${selected ? 'border-indigo-600 bg-indigo-50' : 'border-[oklch(29.1%_0.149_302.717)] bg-white dark:bg-gray-800'}`}>
        <div className="absolute inset-0 opacity-60 z-0">
          <div className={`absolute inset-1 border ${baseBorderClass}`}></div>
          <div className={`absolute left-1 right-1 top-1 bottom-1 rotate-45 border ${baseBorderClass}`}></div>
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border ${baseBorderClass}`}></div>
        </div>
        {overlays}
        <span className="relative z-20 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">{code}</span>
        {badges}
      </button>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {saveStatus?.message && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg ring-1 text-sm ${
              saveStatus.type === 'success'
                ? 'bg-green-50 text-green-800 ring-green-200'
                : 'bg-red-50 text-red-800 ring-red-200'
            }`}
          >
            {saveStatus.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
              </svg>
            )}
            <div className="font-medium">{saveStatus.message}</div>
          </div>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Peta Odontogram</span>
          {fdi && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">FDI {fdi}</span>
          )}
        </div>
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l-2 border-dashed border-gray-400"></div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] sm:text-xs text-gray-500">KANAN / RIGHT</span>
            <span className="text-[10px] sm:text-xs text-gray-500">KIRI / LEFT</span>
          </div>
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-wrap justify-end gap-2 w-full max-w-[32rem]">
                {ADULT_TOP_LEFT.map((c) => (<ToothTile key={`topl-${c}`} code={c} />))}
              </div>
              <div className="flex flex-wrap justify-start gap-2 w-full max-w-[32rem]">
                {ADULT_TOP_RIGHT.map((c) => (<ToothTile key={`topr-${c}`} code={c} />))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-wrap justify-end gap-2 w-full max-w-[24rem]">
                {PRIMARY_TOP_LEFT.map((c) => (<ToothTile key={`ptopl-${c}`} code={c} />))}
              </div>
              <div className="flex flex-wrap justify-start gap-2 w-full max-w-[24rem]">
                {PRIMARY_TOP_RIGHT.map((c) => (<ToothTile key={`ptopr-${c}`} code={c} />))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-wrap justify-end gap-2 w-full max-w-[24rem]">
                {PRIMARY_BOTTOM_LEFT.map((c) => (<ToothTile key={`pbotl-${c}`} code={c} />))}
              </div>
              <div className="flex flex-wrap justify-start gap-2 w-full max-w-[24rem]">
                {PRIMARY_BOTTOM_RIGHT.map((c) => (<ToothTile key={`pbotr-${c}`} code={c} />))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-wrap justify-end gap-2 w-full max-w-[32rem]">
                {ADULT_BOTTOM_LEFT.map((c) => (<ToothTile key={`botl-${c}`} code={c} />))}
              </div>
              <div className="flex flex-wrap justify-start gap-2 w-full max-w-[32rem]">
                {ADULT_BOTTOM_RIGHT.map((c) => (<ToothTile key={`botr-${c}`} code={c} />))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[oklch(98.5%_0_0)]">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">Odontogram</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-3 py-2 text-left w-[10%]">Elemen (FDI)</th>
                  <th className="px-3 py-2 text-left w-[15%]">Kondisi</th>
                  <th className="px-3 py-2 text-left w-[30%]">Diagnosa (ICD)</th>
                  <th className="px-3 py-2 text-left w-[30%]">Tindakan</th>
                  <th className="px-3 py-2 text-left w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2 w-[10%]">
                    <div className="space-y-2">
                      
                      <select value={fdi} onChange={(e) => setFdi(e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                        <option value="">Pilih</option>
                        {filteredFdi.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                      </select>
                    </div>
                  </td>
                  <td className="px-3 py-2 w-[15%]">
                    <select value={kondisi} onChange={(e) => setKondisi(e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                      <option value="">Pilih kondisi</option>
                      {kondisiOptions.map((k) => (<option key={k.kode} value={k.kode}>{k.kode} {k.nama ? `— ${k.nama}` : ''}</option>))}
                    </select>
                  </td>
                  <td className="px-3 py-2 w-[30%]">
                    <div className="space-y-2">
                      <input type="text" value={diagQuery || (diagnosa ? `${diagnosa.kode} — ${diagnosa.nama}` : '')} onChange={(e) => setDiagQuery(e.target.value)} className="w-full border rounded px-2 py-1 text-sm" placeholder="Ketik kode/nama ICD" />
                      {diagQuery && (
                        <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 max-h-40 overflow-y-auto">
                          {diagLoading ? (
                            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Memuat…</div>
                          ) : diagError ? (
                            <div className="px-3 py-2 text-xs text-red-600 dark:text-red-400">{diagError}</div>
                          ) : diagResults.length > 0 ? (
                            diagResults.map((d) => (
                              <button key={d.kode} type="button" onClick={() => { setDiagnosa(d); setDiagQuery(''); }} className="w-full text-left px-3 py-1.5 hover:bg-white dark:hover:bg-gray-600/50 text-xs">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono bg-blue-100 text-blue-800 mr-2">{d.kode}</span>
                                <span className="text-gray-900 dark:text-white">{d.nama}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Tidak ada hasil</div>
                          )}
                        </div>
                      )}
                      
                    </div>
                  </td>
                  <td className="px-3 py-2 w-[30%]">
                    <div className="space-y-2">
                      <input type="text" value={tindakanSearch || (tindakan ? `${tindakan} — ${(tindakanList.find((t) => t.kode === tindakan)?.nama) || ''}` : '')} onChange={(e) => setTindakanSearch(e.target.value)} className="w-full border rounded px-2 py-1 text-sm" placeholder="Cari tindakan" />
                      {tindakanSearch && (
                        <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 max-h-40 overflow-y-auto">
                          {filteredTindakan.length > 0 ? (
                            filteredTindakan.map((d) => (
                              <button key={d.kode} type="button" onClick={() => { setTindakan(d.kode); setTindakanSearch(''); }} className="w-full text-left px-3 py-1.5 hover:bg-white dark:hover:bg-gray-600/50 text-xs">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono bg-blue-100 text-blue-800 mr-2">{d.kode}</span>
                                <span className="text-gray-900 dark:text-white">{d.nama}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Tidak ada hasil</div>
                          )}
                        </div>
                      )}
                      
                    </div>
                  </td>
                  <td className="px-3 py-2 w-[10%]">
                    <button type="button" onClick={addRincian} aria-label="Tambah" className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black hover:bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled={!fdi || !kondisi || !diagnosa?.kode || !tindakan}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled={isSubmitting || rincian.length === 0 || !noRkmMedis}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan Odontogram
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">Rincian Tersimpan</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-3 py-2 text-left w-[10%]">Tanggal</th>
                  <th className="px-3 py-2 text-left w-[10%]">FDI</th>
                  <th className="px-3 py-2 text-left w-[15%]">Kondisi</th>
                  <th className="px-3 py-2 text-left w-[25%]">Diagnosa</th>
                  <th className="px-3 py-2 text-left w-[35%]">Tindakan</th>
                  <th className="px-3 py-2 text-left w-[5%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {rincian.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">Belum ada rincian</td>
                  </tr>
                ) : (
                  rincian.map((r, idx) => (
                    <tr key={`${r.elemen_gigi}-${r.kondisi.kode}-${r.diagnosa.kode}-${r.tindakan.kode}`} className="bg-white dark:bg-gray-800">
                      <td className="px-3 py-2 w-[10%]"><span className="font-mono">{r.tanggal || '-'}</span></td>
                      <td className="px-3 py-2 w-[10%]"><span className="font-mono">{r.elemen_gigi}</span></td>
                      <td className="px-3 py-2 w-[15%]"><span className="font-mono">{r.kondisi.kode}</span> <span className="text-gray-500">{r.kondisi.nama ? `— ${r.kondisi.nama}` : ''}</span></td>
                      <td className="px-3 py-2 w-[25%]"><span className="font-mono">{r.diagnosa.kode}</span> <span className="text-gray-500">{r.diagnosa.nama}</span></td>
                      <td className="px-3 py-2 w-[35%]"><span className="font-mono">{r.tindakan.kode}</span> <span className="text-gray-500">{r.tindakan.nama}</span></td>
                      <td className="px-3 py-2 w-[5%]"><button type="button" onClick={() => removeRincian(idx)} className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-600 hover:bg-red-700 text-white"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M8 6V4h8v2M6 6h12l-1 14H7L6 6m4 4v6m4-6v6"/></svg></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  )
}
