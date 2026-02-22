import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:3129
* @route '/pcare/data-peserta-by-nik'
*/
export const cekPesertaNik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

cekPesertaNik.definition = {
    methods: ["get","head"],
    url: '/pcare/data-peserta-by-nik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3129
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.url = (options?: RouteQueryOptions) => {
    return cekPesertaNik.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3129
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3129
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekPesertaNik.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3134
* @route '/pcare/data-peserta-by-kartu'
*/
export const cekPesertaKartu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaKartu.url(options),
    method: 'get',
})

cekPesertaKartu.definition = {
    methods: ["get","head"],
    url: '/pcare/data-peserta-by-kartu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3134
* @route '/pcare/data-peserta-by-kartu'
*/
cekPesertaKartu.url = (options?: RouteQueryOptions) => {
    return cekPesertaKartu.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3134
* @route '/pcare/data-peserta-by-kartu'
*/
cekPesertaKartu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaKartu.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3134
* @route '/pcare/data-peserta-by-kartu'
*/
cekPesertaKartu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekPesertaKartu.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3143
* @route '/pcare/layanan'
*/
export const pcare = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pcare.url(options),
    method: 'get',
})

pcare.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3143
* @route '/pcare/layanan'
*/
pcare.url = (options?: RouteQueryOptions) => {
    return pcare.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3143
* @route '/pcare/layanan'
*/
pcare.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pcare.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3143
* @route '/pcare/layanan'
*/
pcare.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pcare.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3148
* @route '/pcare/layanan/data-prolanis'
*/
export const dataProlanis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataProlanis.url(options),
    method: 'get',
})

dataProlanis.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/data-prolanis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3148
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.url = (options?: RouteQueryOptions) => {
    return dataProlanis.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3148
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataProlanis.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3148
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataProlanis.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3152
* @route '/pcare/layanan/prolanis-dm'
*/
export const prolanisDm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

prolanisDm.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/prolanis-dm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3152
* @route '/pcare/layanan/prolanis-dm'
*/
prolanisDm.url = (options?: RouteQueryOptions) => {
    return prolanisDm.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3152
* @route '/pcare/layanan/prolanis-dm'
*/
prolanisDm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3152
* @route '/pcare/layanan/prolanis-dm'
*/
prolanisDm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisDm.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3160
* @route '/pcare/layanan/prolanis-ht'
*/
export const prolanisHt = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

prolanisHt.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/prolanis-ht',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3160
* @route '/pcare/layanan/prolanis-ht'
*/
prolanisHt.url = (options?: RouteQueryOptions) => {
    return prolanisHt.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3160
* @route '/pcare/layanan/prolanis-ht'
*/
prolanisHt.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3160
* @route '/pcare/layanan/prolanis-ht'
*/
prolanisHt.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisHt.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3168
* @route '/pcare/layanan/mcu'
*/
export const mcu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mcu.url(options),
    method: 'get',
})

mcu.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/mcu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3168
* @route '/pcare/layanan/mcu'
*/
mcu.url = (options?: RouteQueryOptions) => {
    return mcu.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3168
* @route '/pcare/layanan/mcu'
*/
mcu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mcu.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3168
* @route '/pcare/layanan/mcu'
*/
mcu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mcu.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3172
* @route '/pcare/layanan/srk-per-penyakit'
*/
export const srkPerPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: srkPerPenyakit.url(options),
    method: 'get',
})

srkPerPenyakit.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/srk-per-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3172
* @route '/pcare/layanan/srk-per-penyakit'
*/
srkPerPenyakit.url = (options?: RouteQueryOptions) => {
    return srkPerPenyakit.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3172
* @route '/pcare/layanan/srk-per-penyakit'
*/
srkPerPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: srkPerPenyakit.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3172
* @route '/pcare/layanan/srk-per-penyakit'
*/
srkPerPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: srkPerPenyakit.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3176
* @route '/pcare/layanan/detail-peserta-srk'
*/
export const detailPesertaSrk = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailPesertaSrk.url(options),
    method: 'get',
})

detailPesertaSrk.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan/detail-peserta-srk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3176
* @route '/pcare/layanan/detail-peserta-srk'
*/
detailPesertaSrk.url = (options?: RouteQueryOptions) => {
    return detailPesertaSrk.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3176
* @route '/pcare/layanan/detail-peserta-srk'
*/
detailPesertaSrk.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailPesertaSrk.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3176
* @route '/pcare/layanan/detail-peserta-srk'
*/
detailPesertaSrk.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detailPesertaSrk.url(options),
    method: 'head',
})

const layanan = {
    cekPesertaNik: Object.assign(cekPesertaNik, cekPesertaNik),
    cekPesertaKartu: Object.assign(cekPesertaKartu, cekPesertaKartu),
    pcare: Object.assign(pcare, pcare),
    dataProlanis: Object.assign(dataProlanis, dataProlanis),
    prolanisDm: Object.assign(prolanisDm, prolanisDm),
    prolanisHt: Object.assign(prolanisHt, prolanisHt),
    mcu: Object.assign(mcu, mcu),
    srkPerPenyakit: Object.assign(srkPerPenyakit, srkPerPenyakit),
    detailPesertaSrk: Object.assign(detailPesertaSrk, detailPesertaSrk),
}

export default layanan