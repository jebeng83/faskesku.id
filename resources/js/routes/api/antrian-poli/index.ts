import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:538
* @route '/api/antrian-poli/call'
*/
export const call = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

call.definition = {
    methods: ["post"],
    url: '/api/antrian-poli/call',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:538
* @route '/api/antrian-poli/call'
*/
call.url = (options?: RouteQueryOptions) => {
    return call.definition.url + queryParams(options)
}

/**
* @see routes/web.php:538
* @route '/api/antrian-poli/call'
*/
call.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

/**
* @see routes/web.php:568
* @route '/api/antrian-poli/repeat'
*/
export const repeat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: repeat.url(options),
    method: 'post',
})

repeat.definition = {
    methods: ["post"],
    url: '/api/antrian-poli/repeat',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:568
* @route '/api/antrian-poli/repeat'
*/
repeat.url = (options?: RouteQueryOptions) => {
    return repeat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:568
* @route '/api/antrian-poli/repeat'
*/
repeat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: repeat.url(options),
    method: 'post',
})

const antrianPoli = {
    call: Object.assign(call, call),
    repeat: Object.assign(repeat, repeat),
}

export default antrianPoli