import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:14
* @route '/api/akutansi/pengeluaran-harian'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pengeluaran-harian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:14
* @route '/api/akutansi/pengeluaran-harian'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:14
* @route '/api/akutansi/pengeluaran-harian'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::index
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:14
* @route '/api/akutansi/pengeluaran-harian'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::generateNoKeluar
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:65
* @route '/api/akutansi/pengeluaran-harian/generate-no'
*/
export const generateNoKeluar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoKeluar.url(options),
    method: 'get',
})

generateNoKeluar.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pengeluaran-harian/generate-no',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::generateNoKeluar
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:65
* @route '/api/akutansi/pengeluaran-harian/generate-no'
*/
generateNoKeluar.url = (options?: RouteQueryOptions) => {
    return generateNoKeluar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::generateNoKeluar
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:65
* @route '/api/akutansi/pengeluaran-harian/generate-no'
*/
generateNoKeluar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNoKeluar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::generateNoKeluar
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:65
* @route '/api/akutansi/pengeluaran-harian/generate-no'
*/
generateNoKeluar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNoKeluar.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:90
* @route '/api/akutansi/pengeluaran-harian'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/pengeluaran-harian',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:90
* @route '/api/akutansi/pengeluaran-harian'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::store
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:90
* @route '/api/akutansi/pengeluaran-harian'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::storeMandiri
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:150
* @route '/api/akutansi/pengeluaran-harian/mandiri'
*/
export const storeMandiri = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMandiri.url(options),
    method: 'post',
})

storeMandiri.definition = {
    methods: ["post"],
    url: '/api/akutansi/pengeluaran-harian/mandiri',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::storeMandiri
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:150
* @route '/api/akutansi/pengeluaran-harian/mandiri'
*/
storeMandiri.url = (options?: RouteQueryOptions) => {
    return storeMandiri.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::storeMandiri
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:150
* @route '/api/akutansi/pengeluaran-harian/mandiri'
*/
storeMandiri.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMandiri.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:279
* @route '/api/akutansi/pengeluaran-harian/{no_keluar}'
*/
export const destroy = (args: { no_keluar: string | number } | [no_keluar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/pengeluaran-harian/{no_keluar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:279
* @route '/api/akutansi/pengeluaran-harian/{no_keluar}'
*/
destroy.url = (args: { no_keluar: string | number } | [no_keluar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_keluar: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_keluar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_keluar: args.no_keluar,
    }

    return destroy.definition.url
            .replace('{no_keluar}', parsedArgs.no_keluar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PengeluaranHarianController::destroy
* @see app/Http/Controllers/Akutansi/PengeluaranHarianController.php:279
* @route '/api/akutansi/pengeluaran-harian/{no_keluar}'
*/
destroy.delete = (args: { no_keluar: string | number } | [no_keluar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PengeluaranHarianController = { index, generateNoKeluar, store, storeMandiri, destroy }

export default PengeluaranHarianController