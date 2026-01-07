import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
export const test = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(args, options),
    method: 'get',
})

test.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/icare/proxy/test/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return test.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: test.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: test.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\IcareController::test
* @see app/Http/Controllers/Pcare/IcareController.php:29
* @route '/api/icare/proxy/test/{endpoint}'
*/
test.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(args, options),
    method: 'head',
})

