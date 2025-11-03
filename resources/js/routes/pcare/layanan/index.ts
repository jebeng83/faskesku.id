import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:459
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
* @see routes/web.php:459
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.url = (options?: RouteQueryOptions) => {
    return cekPesertaNik.definition.url + queryParams(options)
}

/**
* @see routes/web.php:459
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

/**
* @see routes/web.php:459
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekPesertaNik.url(options),
    method: 'head',
})

const layanan = {
    cekPesertaNik: Object.assign(cekPesertaNik, cekPesertaNik),
}

export default layanan