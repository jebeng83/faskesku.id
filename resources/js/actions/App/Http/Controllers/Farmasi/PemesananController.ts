import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:236
* @route '/api/pemesanan/generate-no-order'
*/
export const generateNoOrder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoOrder.url(options),
    method: 'get',
})

generateNoOrder.definition = {
    methods: ["get","head"],
    url: '/api/pemesanan/generate-no-order',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:236
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.url = (options?: RouteQueryOptions) => {
    return generateNoOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:236
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoOrder.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::generateNoOrder
* @see app/Http/Controllers/Farmasi/PemesananController.php:236
* @route '/api/pemesanan/generate-no-order'
*/
generateNoOrder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNoOrder.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:145
* @route '/api/pemesanan/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pemesanan/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:145
* @route '/api/pemesanan/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::store
* @see app/Http/Controllers/Farmasi/PemesananController.php:145
* @route '/api/pemesanan/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::listHutang
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
export const listHutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listHutang.url(options),
    method: 'get',
})

listHutang.definition = {
    methods: ["get","head"],
    url: '/api/farmasi/hutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::listHutang
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
listHutang.url = (options?: RouteQueryOptions) => {
    return listHutang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::listHutang
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
listHutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listHutang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::listHutang
* @see app/Http/Controllers/Farmasi/PemesananController.php:12
* @route '/api/farmasi/hutang'
*/
listHutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listHutang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stagePelunasan
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
export const stagePelunasan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stagePelunasan.url(options),
    method: 'post',
})

stagePelunasan.definition = {
    methods: ["post"],
    url: '/api/farmasi/hutang/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stagePelunasan
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
stagePelunasan.url = (options?: RouteQueryOptions) => {
    return stagePelunasan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PemesananController::stagePelunasan
* @see app/Http/Controllers/Farmasi/PemesananController.php:76
* @route '/api/farmasi/hutang/stage'
*/
stagePelunasan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stagePelunasan.url(options),
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

const PemesananController = { generateNoOrder, store, listHutang, stagePelunasan, markPaid }

export default PemesananController