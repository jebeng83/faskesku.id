import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:1804
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
* @see routes/web.php:1804
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.url = (options?: RouteQueryOptions) => {
    return cekPesertaNik.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1804
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1804
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekPesertaNik.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1809
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
* @see routes/web.php:1809
* @route '/pcare/layanan'
*/
pcare.url = (options?: RouteQueryOptions) => {
    return pcare.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1809
* @route '/pcare/layanan'
*/
pcare.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pcare.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1809
* @route '/pcare/layanan'
*/
pcare.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pcare.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1814
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
* @see routes/web.php:1814
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.url = (options?: RouteQueryOptions) => {
    return dataProlanis.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1814
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataProlanis.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1814
* @route '/pcare/layanan/data-prolanis'
*/
dataProlanis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataProlanis.url(options),
    method: 'head',
})

const layanan = {
    cekPesertaNik: Object.assign(cekPesertaNik, cekPesertaNik),
    pcare: Object.assign(pcare, pcare),
    dataProlanis: Object.assign(dataProlanis, dataProlanis),
}

export default layanan