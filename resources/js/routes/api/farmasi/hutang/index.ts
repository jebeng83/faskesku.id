import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PemesananController::index
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/farmasi/hutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::index
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::index
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::index
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stage
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
export const stage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(options),
    method: 'post',
})

stage.definition = {
    methods: ["post"],
    url: '/api/farmasi/hutang/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stage
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
stage.url = (options?: RouteQueryOptions) => {
    return stage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stage
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
stage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::markPaid
* @see app/Http/Controllers/Farmasi/PemesananController.php:129
* @route '/api/farmasi/hutang/{no_faktur}/mark-paid'
*/
export const markPaid = (args: { no_faktur: string | number } | [no_faktur: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markPaid.url(args, options),
    method: 'patch',
})

markPaid.definition = {
    methods: ["patch"],
    url: '/api/farmasi/hutang/{no_faktur}/mark-paid',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::markPaid
* @see app/Http/Controllers/Farmasi/PemesananController.php:129
* @route '/api/farmasi/hutang/{no_faktur}/mark-paid'
*/
markPaid.url = (args: { no_faktur: string | number } | [no_faktur: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_faktur: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_faktur: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_faktur: args.no_faktur,
    }

    return markPaid.definition.url
            .replace('{no_faktur}', parsedArgs.no_faktur.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::markPaid
* @see app/Http/Controllers/Farmasi/PemesananController.php:129
* @route '/api/farmasi/hutang/{no_faktur}/mark-paid'
*/
markPaid.patch = (args: { no_faktur: string | number } | [no_faktur: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markPaid.url(args, options),
    method: 'patch',
})

const hutang = {
    index: Object.assign(index, index),
    stage: Object.assign(stage, stage),
    markPaid: Object.assign(markPaid, markPaid),
}

export default hutang