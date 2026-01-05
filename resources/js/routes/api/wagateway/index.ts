import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/api.php:137
* @route '/api/wagateway/start'
*/
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post","get","head"],
    url: '/api/wagateway/start',
} satisfies RouteDefinition<["post","get","head"]>

/**
* @see routes/api.php:137
* @route '/api/wagateway/start'
*/
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see routes/api.php:137
* @route '/api/wagateway/start'
*/
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

/**
* @see routes/api.php:137
* @route '/api/wagateway/start'
*/
start.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(options),
    method: 'get',
})

/**
* @see routes/api.php:137
* @route '/api/wagateway/start'
*/
start.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: start.url(options),
    method: 'head',
})

/**
* @see routes/api.php:163
* @route '/api/wagateway/restart'
*/
export const restart = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restart.url(options),
    method: 'post',
})

restart.definition = {
    methods: ["post","get","head"],
    url: '/api/wagateway/restart',
} satisfies RouteDefinition<["post","get","head"]>

/**
* @see routes/api.php:163
* @route '/api/wagateway/restart'
*/
restart.url = (options?: RouteQueryOptions) => {
    return restart.definition.url + queryParams(options)
}

/**
* @see routes/api.php:163
* @route '/api/wagateway/restart'
*/
restart.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restart.url(options),
    method: 'post',
})

/**
* @see routes/api.php:163
* @route '/api/wagateway/restart'
*/
restart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restart.url(options),
    method: 'get',
})

/**
* @see routes/api.php:163
* @route '/api/wagateway/restart'
*/
restart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restart.url(options),
    method: 'head',
})

/**
* @see routes/api.php:180
* @route '/api/wagateway/stop'
*/
export const stop = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

stop.definition = {
    methods: ["post","get","head"],
    url: '/api/wagateway/stop',
} satisfies RouteDefinition<["post","get","head"]>

/**
* @see routes/api.php:180
* @route '/api/wagateway/stop'
*/
stop.url = (options?: RouteQueryOptions) => {
    return stop.definition.url + queryParams(options)
}

/**
* @see routes/api.php:180
* @route '/api/wagateway/stop'
*/
stop.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

/**
* @see routes/api.php:180
* @route '/api/wagateway/stop'
*/
stop.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stop.url(options),
    method: 'get',
})

/**
* @see routes/api.php:180
* @route '/api/wagateway/stop'
*/
stop.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stop.url(options),
    method: 'head',
})

/**
* @see routes/api.php:197
* @route '/api/wagateway/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/api/wagateway/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:197
* @route '/api/wagateway/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see routes/api.php:197
* @route '/api/wagateway/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see routes/api.php:197
* @route '/api/wagateway/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

/**
* @see routes/api.php:225
* @route '/api/wagateway/qr'
*/
export const qr = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: qr.url(options),
    method: 'post',
})

qr.definition = {
    methods: ["post"],
    url: '/api/wagateway/qr',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/api.php:225
* @route '/api/wagateway/qr'
*/
qr.url = (options?: RouteQueryOptions) => {
    return qr.definition.url + queryParams(options)
}

/**
* @see routes/api.php:225
* @route '/api/wagateway/qr'
*/
qr.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: qr.url(options),
    method: 'post',
})

/**
* @see routes/api.php:274
* @route '/api/wagateway/send'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/api/wagateway/send',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/api.php:274
* @route '/api/wagateway/send'
*/
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see routes/api.php:274
* @route '/api/wagateway/send'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

const wagateway = {
    start: Object.assign(start, start),
    restart: Object.assign(restart, restart),
    stop: Object.assign(stop, stop),
    status: Object.assign(status, status),
    qr: Object.assign(qr, qr),
    send: Object.assign(send, send),
}

export default wagateway