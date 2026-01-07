import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\IcareController::ping
* @see app/Http/Controllers/Pcare/IcareController.php:15
* @route '/api/icare/ping'
*/
export const ping = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping.url(options),
    method: 'get',
})

ping.definition = {
    methods: ["get","head"],
    url: '/api/icare/ping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::ping
* @see app/Http/Controllers/Pcare/IcareController.php:15
* @route '/api/icare/ping'
*/
ping.url = (options?: RouteQueryOptions) => {
    return ping.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::ping
* @see app/Http/Controllers/Pcare/IcareController.php:15
* @route '/api/icare/ping'
*/
ping.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::ping
* @see app/Http/Controllers/Pcare/IcareController.php:15
* @route '/api/icare/ping'
*/
ping.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ping.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
export const proxy = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy.url(args, options),
    method: 'get',
})

proxy.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/icare/proxy/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { endpoint: args }
    }

    if (Array.isArray(args)) {
        args = {
            endpoint: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        endpoint: args.endpoint,
    }

    return proxy.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxy.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::validate
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
export const validate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/api/icare/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::validate
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
validate.url = (options?: RouteQueryOptions) => {
    return validate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::validate
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
validate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::peserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
export const peserta = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peserta.url(args, options),
    method: 'get',
})

peserta.definition = {
    methods: ["get","head"],
    url: '/api/icare/peserta/{noka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::peserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
peserta.url = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noka: args }
    }

    if (Array.isArray(args)) {
        args = {
            noka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
    }

    return peserta.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::peserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
peserta.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::peserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
peserta.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peserta.url(args, options),
    method: 'head',
})

const icare = {
    proxy: Object.assign(proxy, proxy),
    ping: Object.assign(ping, ping),
    validate: Object.assign(validate, validate),
    peserta: Object.assign(peserta, peserta),
}

export default icare