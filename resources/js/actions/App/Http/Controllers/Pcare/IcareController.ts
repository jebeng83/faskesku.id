import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
const proxy035c4e1364d594da7ce746478e0900c6 = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'get',
})

proxy035c4e1364d594da7ce746478e0900c6.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/icare/proxy/test/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return proxy035c4e1364d594da7ce746478e0900c6.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
proxy035c4e1364d594da7ce746478e0900c6.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy035c4e1364d594da7ce746478e0900c6.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
const proxyab61df5c5f4730acadf5b77db74344ff = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'get',
})

proxyab61df5c5f4730acadf5b77db74344ff.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/icare/proxy/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return proxyab61df5c5f4730acadf5b77db74344ff.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::proxy
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/{endpoint}'
*/
proxyab61df5c5f4730acadf5b77db74344ff.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxyab61df5c5f4730acadf5b77db74344ff.url(args, options),
    method: 'head',
})

export const proxy = {
    '/api/icare/proxy/test/{endpoint}': proxy035c4e1364d594da7ce746478e0900c6,
    '/api/icare/proxy/{endpoint}': proxyab61df5c5f4730acadf5b77db74344ff,
}

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
* @see \App\Http\Controllers\Pcare\IcareController::validateIcare
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
export const validateIcare = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateIcare.url(options),
    method: 'post',
})

validateIcare.definition = {
    methods: ["post"],
    url: '/api/icare/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::validateIcare
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
validateIcare.url = (options?: RouteQueryOptions) => {
    return validateIcare.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::validateIcare
* @see app/Http/Controllers/Pcare/IcareController.php:168
* @route '/api/icare/validate'
*/
validateIcare.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateIcare.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::getPeserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
export const getPeserta = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

getPeserta.definition = {
    methods: ["get","head"],
    url: '/api/icare/peserta/{noka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::getPeserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
getPeserta.url = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPeserta.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::getPeserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
getPeserta.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::getPeserta
* @see app/Http/Controllers/Pcare/IcareController.php:133
* @route '/api/icare/peserta/{noka}'
*/
getPeserta.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPeserta.url(args, options),
    method: 'head',
})

const IcareController = { proxy, ping, validateIcare, getPeserta }

export default IcareController