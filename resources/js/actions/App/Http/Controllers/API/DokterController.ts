import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
const index2ac57bcbeb1d17d3cfbfb60e6e1ea923 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2ac57bcbeb1d17d3cfbfb60e6e1ea923.url(options),
    method: 'get',
})

index2ac57bcbeb1d17d3cfbfb60e6e1ea923.definition = {
    methods: ["get","head"],
    url: '/api/public/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
index2ac57bcbeb1d17d3cfbfb60e6e1ea923.url = (options?: RouteQueryOptions) => {
    return index2ac57bcbeb1d17d3cfbfb60e6e1ea923.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
index2ac57bcbeb1d17d3cfbfb60e6e1ea923.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2ac57bcbeb1d17d3cfbfb60e6e1ea923.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
index2ac57bcbeb1d17d3cfbfb60e6e1ea923.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2ac57bcbeb1d17d3cfbfb60e6e1ea923.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
const index2d187505c9fce4532e881abbe2b885ae = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2d187505c9fce4532e881abbe2b885ae.url(options),
    method: 'get',
})

index2d187505c9fce4532e881abbe2b885ae.definition = {
    methods: ["get","head"],
    url: '/api/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index2d187505c9fce4532e881abbe2b885ae.url = (options?: RouteQueryOptions) => {
    return index2d187505c9fce4532e881abbe2b885ae.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index2d187505c9fce4532e881abbe2b885ae.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2d187505c9fce4532e881abbe2b885ae.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/dokter'
*/
index2d187505c9fce4532e881abbe2b885ae.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2d187505c9fce4532e881abbe2b885ae.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/rawat-jalan/dokter'
*/
const index0dcbc8d7ccddf8ed28e5f7c2b15f980f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0dcbc8d7ccddf8ed28e5f7c2b15f980f.url(options),
    method: 'get',
})

index0dcbc8d7ccddf8ed28e5f7c2b15f980f.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/rawat-jalan/dokter'
*/
index0dcbc8d7ccddf8ed28e5f7c2b15f980f.url = (options?: RouteQueryOptions) => {
    return index0dcbc8d7ccddf8ed28e5f7c2b15f980f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/rawat-jalan/dokter'
*/
index0dcbc8d7ccddf8ed28e5f7c2b15f980f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0dcbc8d7ccddf8ed28e5f7c2b15f980f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/rawat-jalan/dokter'
*/
index0dcbc8d7ccddf8ed28e5f7c2b15f980f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0dcbc8d7ccddf8ed28e5f7c2b15f980f.url(options),
    method: 'head',
})

export const index = {
    '/api/public/dokter': index2ac57bcbeb1d17d3cfbfb60e6e1ea923,
    '/api/dokter': index2d187505c9fce4532e881abbe2b885ae,
    '/rawat-jalan/dokter': index0dcbc8d7ccddf8ed28e5f7c2b15f980f,
}

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

const DokterController = { index, show }

export default DokterController