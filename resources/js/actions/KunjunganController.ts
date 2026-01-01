import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../wayfinder'
/**
* @see \KunjunganController::kunjunganRanapPage
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan'
*/
export const kunjunganRanapPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'get',
})

kunjunganRanapPage.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \KunjunganController::kunjunganRanapPage
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapPage.definition.url + queryParams(options)
}

/**
* @see \KunjunganController::kunjunganRanapPage
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'get',
})

/**
* @see \KunjunganController::kunjunganRanapPage
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'head',
})

/**
* @see \KunjunganController::kunjunganRanapData
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/data'
*/
export const kunjunganRanapData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapData.url(options),
    method: 'get',
})

kunjunganRanapData.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \KunjunganController::kunjunganRanapData
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapData.definition.url + queryParams(options)
}

/**
* @see \KunjunganController::kunjunganRanapData
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapData.url(options),
    method: 'get',
})

/**
* @see \KunjunganController::kunjunganRanapData
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapData.url(options),
    method: 'head',
})

/**
* @see \KunjunganController::kunjunganRanapPrint
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/print'
*/
export const kunjunganRanapPrint = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'get',
})

kunjunganRanapPrint.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \KunjunganController::kunjunganRanapPrint
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapPrint.definition.url + queryParams(options)
}

/**
* @see \KunjunganController::kunjunganRanapPrint
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'get',
})

/**
* @see \KunjunganController::kunjunganRanapPrint
* @see [unknown]:0
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'head',
})

const KunjunganController = { kunjunganRanapPage, kunjunganRanapData, kunjunganRanapPrint }

export default KunjunganController