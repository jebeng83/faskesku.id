import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import prerequisites from './prerequisites'
import interoperabilitas from './interoperabilitas'
import mappingAlergi from './mapping-alergi'
import mappingObat from './mapping-obat'
/**
* @see routes/web.php:3243
* @route '/satusehat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3243
* @route '/satusehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3243
* @route '/satusehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3243
* @route '/satusehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3275
* @route '/satusehat/kirim'
*/
export const kirim = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kirim.url(options),
    method: 'get',
})

kirim.definition = {
    methods: ["get","head"],
    url: '/satusehat/kirim',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3275
* @route '/satusehat/kirim'
*/
kirim.url = (options?: RouteQueryOptions) => {
    return kirim.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3275
* @route '/satusehat/kirim'
*/
kirim.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kirim.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3275
* @route '/satusehat/kirim'
*/
kirim.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kirim.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3280
* @route '/satusehat/mapping-practitioner'
*/
export const mappingPractitioner = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingPractitioner.url(options),
    method: 'get',
})

mappingPractitioner.definition = {
    methods: ["get","head"],
    url: '/satusehat/mapping-practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3280
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.url = (options?: RouteQueryOptions) => {
    return mappingPractitioner.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3280
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingPractitioner.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3280
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingPractitioner.url(options),
    method: 'head',
})

const satusehat = {
    index: Object.assign(index, index),
    prerequisites: Object.assign(prerequisites, prerequisites),
    interoperabilitas: Object.assign(interoperabilitas, interoperabilitas),
    kirim: Object.assign(kirim, kirim),
    mappingPractitioner: Object.assign(mappingPractitioner, mappingPractitioner),
    mappingAlergi: Object.assign(mappingAlergi, mappingAlergi),
    mappingObat: Object.assign(mappingObat, mappingObat),
}

export default satusehat