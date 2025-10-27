import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::index
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:15
* @route '/farmasi/industri-farmasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/industri-farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::index
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:15
* @route '/farmasi/industri-farmasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::index
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:15
* @route '/farmasi/industri-farmasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::index
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:15
* @route '/farmasi/industri-farmasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::store
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:51
* @route '/farmasi/industri-farmasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/industri-farmasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::store
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:51
* @route '/farmasi/industri-farmasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::store
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:51
* @route '/farmasi/industri-farmasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
const update1abd87db7221ca9dec8e1beb2701c07a = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1abd87db7221ca9dec8e1beb2701c07a.url(args, options),
    method: 'put',
})

update1abd87db7221ca9dec8e1beb2701c07a.definition = {
    methods: ["put"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
update1abd87db7221ca9dec8e1beb2701c07a.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_industri: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_industri: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_industri: args.kode_industri,
    }

    return update1abd87db7221ca9dec8e1beb2701c07a.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
update1abd87db7221ca9dec8e1beb2701c07a.put = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1abd87db7221ca9dec8e1beb2701c07a.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
const update1abd87db7221ca9dec8e1beb2701c07a = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1abd87db7221ca9dec8e1beb2701c07a.url(args, options),
    method: 'patch',
})

update1abd87db7221ca9dec8e1beb2701c07a.definition = {
    methods: ["patch"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
update1abd87db7221ca9dec8e1beb2701c07a.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_industri: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_industri: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_industri: args.kode_industri,
    }

    return update1abd87db7221ca9dec8e1beb2701c07a.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::update
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
update1abd87db7221ca9dec8e1beb2701c07a.patch = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1abd87db7221ca9dec8e1beb2701c07a.url(args, options),
    method: 'patch',
})

export const update = {
    '/farmasi/industri-farmasi/{kode_industri}': update1abd87db7221ca9dec8e1beb2701c07a,
    '/farmasi/industri-farmasi/{kode_industri}': update1abd87db7221ca9dec8e1beb2701c07a,
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::destroy
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:94
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
export const destroy = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::destroy
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:94
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
destroy.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_industri: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_industri: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_industri: args.kode_industri,
    }

    return destroy.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::destroy
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:94
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
destroy.delete = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IndustriFarmasiController = { index, store, update, destroy }

export default IndustriFarmasiController