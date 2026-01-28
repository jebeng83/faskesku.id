import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:90
* @route '/antrian/loket'
*/
export const loket = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loket.url(options),
    method: 'get',
})

loket.definition = {
    methods: ["get","head"],
    url: '/antrian/loket',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:90
* @route '/antrian/loket'
*/
loket.url = (options?: RouteQueryOptions) => {
    return loket.definition.url + queryParams(options)
}

/**
* @see routes/web.php:90
* @route '/antrian/loket'
*/
loket.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loket.url(options),
    method: 'get',
})

/**
* @see routes/web.php:90
* @route '/antrian/loket'
*/
loket.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loket.url(options),
    method: 'head',
})

/**
* @see routes/web.php:254
* @route '/antrian/display'
*/
export const display = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: display.url(options),
    method: 'get',
})

display.definition = {
    methods: ["get","head"],
    url: '/antrian/display',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:254
* @route '/antrian/display'
*/
display.url = (options?: RouteQueryOptions) => {
    return display.definition.url + queryParams(options)
}

/**
* @see routes/web.php:254
* @route '/antrian/display'
*/
display.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: display.url(options),
    method: 'get',
})

/**
* @see routes/web.php:254
* @route '/antrian/display'
*/
display.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: display.url(options),
    method: 'head',
})

/**
* @see routes/web.php:287
* @route '/antrian/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/antrian/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:287
* @route '/antrian/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:287
* @route '/antrian/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:287
* @route '/antrian/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see routes/web.php:411
* @route '/antrian/suara'
*/
export const suara = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suara.url(options),
    method: 'get',
})

suara.definition = {
    methods: ["get","head"],
    url: '/antrian/suara',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:411
* @route '/antrian/suara'
*/
suara.url = (options?: RouteQueryOptions) => {
    return suara.definition.url + queryParams(options)
}

/**
* @see routes/web.php:411
* @route '/antrian/suara'
*/
suara.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suara.url(options),
    method: 'get',
})

/**
* @see routes/web.php:411
* @route '/antrian/suara'
*/
suara.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suara.url(options),
    method: 'head',
})

const antrian = {
    loket: Object.assign(loket, loket),
    display: Object.assign(display, display),
    poli: Object.assign(poli, poli),
    suara: Object.assign(suara, suara),
}

export default antrian