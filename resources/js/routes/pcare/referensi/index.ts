import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:340
* @route '/pcare/referensi/diagnosa'
*/
export const diagnosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

diagnosa.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:340
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.url = (options?: RouteQueryOptions) => {
    return diagnosa.definition.url + queryParams(options)
}

/**
* @see routes/web.php:340
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

/**
* @see routes/web.php:340
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosa.url(options),
    method: 'head',
})

/**
* @see routes/web.php:345
* @route '/pcare/referensi/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:345
* @route '/pcare/referensi/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see routes/web.php:345
* @route '/pcare/referensi/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see routes/web.php:345
* @route '/pcare/referensi/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

/**
* @see routes/web.php:350
* @route '/pcare/referensi/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:350
* @route '/pcare/referensi/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:350
* @route '/pcare/referensi/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:350
* @route '/pcare/referensi/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see routes/web.php:355
* @route '/pcare/referensi/kesadaran'
*/
export const kesadaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

kesadaran.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:355
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.url = (options?: RouteQueryOptions) => {
    return kesadaran.definition.url + queryParams(options)
}

/**
* @see routes/web.php:355
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

/**
* @see routes/web.php:355
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kesadaran.url(options),
    method: 'head',
})

/**
* @see routes/web.php:360
* @route '/pcare/referensi/dpho'
*/
export const dpho = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

dpho.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:360
* @route '/pcare/referensi/dpho'
*/
dpho.url = (options?: RouteQueryOptions) => {
    return dpho.definition.url + queryParams(options)
}

/**
* @see routes/web.php:360
* @route '/pcare/referensi/dpho'
*/
dpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

/**
* @see routes/web.php:360
* @route '/pcare/referensi/dpho'
*/
dpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dpho.url(options),
    method: 'head',
})

/**
* @see routes/web.php:365
* @route '/pcare/referensi/provider'
*/
export const provider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

provider.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:365
* @route '/pcare/referensi/provider'
*/
provider.url = (options?: RouteQueryOptions) => {
    return provider.definition.url + queryParams(options)
}

/**
* @see routes/web.php:365
* @route '/pcare/referensi/provider'
*/
provider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

/**
* @see routes/web.php:365
* @route '/pcare/referensi/provider'
*/
provider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provider.url(options),
    method: 'head',
})

/**
* @see routes/web.php:370
* @route '/pcare/referensi/spesialis'
*/
export const spesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

spesialis.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:370
* @route '/pcare/referensi/spesialis'
*/
spesialis.url = (options?: RouteQueryOptions) => {
    return spesialis.definition.url + queryParams(options)
}

/**
* @see routes/web.php:370
* @route '/pcare/referensi/spesialis'
*/
spesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

/**
* @see routes/web.php:370
* @route '/pcare/referensi/spesialis'
*/
spesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: spesialis.url(options),
    method: 'head',
})

const referensi = {
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    kesadaran: Object.assign(kesadaran, kesadaran),
    dpho: Object.assign(dpho, dpho),
    provider: Object.assign(provider, provider),
    spesialis: Object.assign(spesialis, spesialis),
}

export default referensi