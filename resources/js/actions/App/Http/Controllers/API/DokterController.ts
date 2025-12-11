import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/permissions/dokter'
*/
const index542ecf1ff21d1bf67459a9cfae30e268 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index542ecf1ff21d1bf67459a9cfae30e268.url(options),
    method: 'get',
})

index542ecf1ff21d1bf67459a9cfae30e268.definition = {
    methods: ["get","head"],
    url: '/api/permissions/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/permissions/dokter'
*/
index542ecf1ff21d1bf67459a9cfae30e268.url = (options?: RouteQueryOptions) => {
    return index542ecf1ff21d1bf67459a9cfae30e268.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/permissions/dokter'
*/
index542ecf1ff21d1bf67459a9cfae30e268.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index542ecf1ff21d1bf67459a9cfae30e268.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::index
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/permissions/dokter'
*/
index542ecf1ff21d1bf67459a9cfae30e268.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index542ecf1ff21d1bf67459a9cfae30e268.url(options),
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

export const index = {
    '/api/permissions/dokter': index542ecf1ff21d1bf67459a9cfae30e268,
    '/api/dokter': index2d187505c9fce4532e881abbe2b885ae,
}

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/permissions/dokter/{kd_dokter}'
*/
const show6079b6e54926164ad59e5ddd1b8fafd4 = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6079b6e54926164ad59e5ddd1b8fafd4.url(args, options),
    method: 'get',
})

show6079b6e54926164ad59e5ddd1b8fafd4.definition = {
    methods: ["get","head"],
    url: '/api/permissions/dokter/{kd_dokter}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/permissions/dokter/{kd_dokter}'
*/
show6079b6e54926164ad59e5ddd1b8fafd4.url = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show6079b6e54926164ad59e5ddd1b8fafd4.definition.url
            .replace('{kd_dokter}', parsedArgs.kd_dokter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/permissions/dokter/{kd_dokter}'
*/
show6079b6e54926164ad59e5ddd1b8fafd4.get = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6079b6e54926164ad59e5ddd1b8fafd4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/permissions/dokter/{kd_dokter}'
*/
show6079b6e54926164ad59e5ddd1b8fafd4.head = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show6079b6e54926164ad59e5ddd1b8fafd4.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
const show8663cdb8375035ff7f8e35f757c39896 = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8663cdb8375035ff7f8e35f757c39896.url(args, options),
    method: 'get',
})

show8663cdb8375035ff7f8e35f757c39896.definition = {
    methods: ["get","head"],
    url: '/api/dokter/{kd_dokter}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show8663cdb8375035ff7f8e35f757c39896.url = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show8663cdb8375035ff7f8e35f757c39896.definition.url
            .replace('{kd_dokter}', parsedArgs.kd_dokter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show8663cdb8375035ff7f8e35f757c39896.get = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8663cdb8375035ff7f8e35f757c39896.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::show
* @see app/Http/Controllers/API/DokterController.php:53
* @route '/api/dokter/{kd_dokter}'
*/
show8663cdb8375035ff7f8e35f757c39896.head = (args: { kd_dokter: string | number } | [kd_dokter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show8663cdb8375035ff7f8e35f757c39896.url(args, options),
    method: 'head',
})

export const show = {
    '/api/permissions/dokter/{kd_dokter}': show6079b6e54926164ad59e5ddd1b8fafd4,
    '/api/dokter/{kd_dokter}': show8663cdb8375035ff7f8e35f757c39896,
}

const DokterController = { index, show }

export default DokterController