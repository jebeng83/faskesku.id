import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/api.php:140
* @route '/api/dev/bootstrap/reg-periksa'
*/
export const regPeriksa = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regPeriksa.url(options),
    method: 'post',
})

regPeriksa.definition = {
    methods: ["post"],
    url: '/api/dev/bootstrap/reg-periksa',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/api.php:140
* @route '/api/dev/bootstrap/reg-periksa'
*/
regPeriksa.url = (options?: RouteQueryOptions) => {
    return regPeriksa.definition.url + queryParams(options)
}

/**
* @see routes/api.php:140
* @route '/api/dev/bootstrap/reg-periksa'
*/
regPeriksa.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regPeriksa.url(options),
    method: 'post',
})

/**
* @see routes/api.php:205
* @route '/api/dev/bootstrap/alergi-master'
*/
export const alergiMaster = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alergiMaster.url(options),
    method: 'post',
})

alergiMaster.definition = {
    methods: ["post"],
    url: '/api/dev/bootstrap/alergi-master',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/api.php:205
* @route '/api/dev/bootstrap/alergi-master'
*/
alergiMaster.url = (options?: RouteQueryOptions) => {
    return alergiMaster.definition.url + queryParams(options)
}

/**
* @see routes/api.php:205
* @route '/api/dev/bootstrap/alergi-master'
*/
alergiMaster.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alergiMaster.url(options),
    method: 'post',
})

const bootstrap = {
    regPeriksa: Object.assign(regPeriksa, regPeriksa),
    alergiMaster: Object.assign(alergiMaster, alergiMaster),
}

export default bootstrap