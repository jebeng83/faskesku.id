import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:151
* @route '/anjungan/pasien-mandiri'
*/
export const pasienMandiri = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pasienMandiri.url(options),
    method: 'get',
})

pasienMandiri.definition = {
    methods: ["get","head"],
    url: '/anjungan/pasien-mandiri',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:151
* @route '/anjungan/pasien-mandiri'
*/
pasienMandiri.url = (options?: RouteQueryOptions) => {
    return pasienMandiri.definition.url + queryParams(options)
}

/**
* @see routes/web.php:151
* @route '/anjungan/pasien-mandiri'
*/
pasienMandiri.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pasienMandiri.url(options),
    method: 'get',
})

/**
* @see routes/web.php:151
* @route '/anjungan/pasien-mandiri'
*/
pasienMandiri.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pasienMandiri.url(options),
    method: 'head',
})

/**
* @see routes/web.php:211
* @route '/anjungan/cetak-label'
*/
export const cetakLabel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetakLabel.url(options),
    method: 'get',
})

cetakLabel.definition = {
    methods: ["get","head"],
    url: '/anjungan/cetak-label',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:211
* @route '/anjungan/cetak-label'
*/
cetakLabel.url = (options?: RouteQueryOptions) => {
    return cetakLabel.definition.url + queryParams(options)
}

/**
* @see routes/web.php:211
* @route '/anjungan/cetak-label'
*/
cetakLabel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetakLabel.url(options),
    method: 'get',
})

/**
* @see routes/web.php:211
* @route '/anjungan/cetak-label'
*/
cetakLabel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cetakLabel.url(options),
    method: 'head',
})

const anjungan = {
    pasienMandiri: Object.assign(pasienMandiri, pasienMandiri),
    cetakLabel: Object.assign(cetakLabel, cetakLabel),
}

export default anjungan