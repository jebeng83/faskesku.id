import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
export const show = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/dokter/{kd_dokter}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show.url = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_dokter: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_dokter: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_dokter: args.kd_dokter,
    }

    return show.definition.url
            .replace('{kd_dokter}', parsedArgs.kd_dokter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show.get = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show.head = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const dokter = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default dokter