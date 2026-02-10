import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-dm'
*/
export const prolanisDm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

prolanisDm.definition = {
    methods: ["get","head"],
    url: '/pcare/skrining/prolanis-dm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-dm'
*/
prolanisDm.url = (options?: RouteQueryOptions) => {
    return prolanisDm.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-dm'
*/
prolanisDm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisDm.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-dm'
*/
prolanisDm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisDm.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-ht'
*/
export const prolanisHt = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

prolanisHt.definition = {
    methods: ["get","head"],
    url: '/pcare/skrining/prolanis-ht',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-ht'
*/
prolanisHt.url = (options?: RouteQueryOptions) => {
    return prolanisHt.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-ht'
*/
prolanisHt.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prolanisHt.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/prolanis-ht'
*/
prolanisHt.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prolanisHt.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/rekap'
*/
export const rekap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekap.url(options),
    method: 'get',
})

rekap.definition = {
    methods: ["get","head"],
    url: '/pcare/skrining/rekap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/rekap'
*/
rekap.url = (options?: RouteQueryOptions) => {
    return rekap.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/rekap'
*/
rekap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekap.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/pcare/skrining/rekap'
*/
rekap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rekap.url(options),
    method: 'head',
})

const skrining = {
    prolanisDm: Object.assign(prolanisDm, prolanisDm),
    prolanisHt: Object.assign(prolanisHt, prolanisHt),
    rekap: Object.assign(rekap, rekap),
}

export default skrining