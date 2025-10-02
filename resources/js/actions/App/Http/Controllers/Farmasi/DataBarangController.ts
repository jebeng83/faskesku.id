import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::index
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/data-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::index
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::index
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::index
* @see app/Http/Controllers/Farmasi/DataBarangController.php:12
* @route '/farmasi/data-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:80
* @route '/farmasi/data-obat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/data-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:80
* @route '/farmasi/data-obat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::store
* @see app/Http/Controllers/Farmasi/DataBarangController.php:80
* @route '/farmasi/data-obat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
const update1aa76071cf55fe28a96c9f50b67a1b30 = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1aa76071cf55fe28a96c9f50b67a1b30.url(args, options),
    method: 'put',
})

update1aa76071cf55fe28a96c9f50b67a1b30.definition = {
    methods: ["put"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
update1aa76071cf55fe28a96c9f50b67a1b30.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return update1aa76071cf55fe28a96c9f50b67a1b30.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
update1aa76071cf55fe28a96c9f50b67a1b30.put = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1aa76071cf55fe28a96c9f50b67a1b30.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
const update1aa76071cf55fe28a96c9f50b67a1b30 = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1aa76071cf55fe28a96c9f50b67a1b30.url(args, options),
    method: 'patch',
})

update1aa76071cf55fe28a96c9f50b67a1b30.definition = {
    methods: ["patch"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
update1aa76071cf55fe28a96c9f50b67a1b30.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return update1aa76071cf55fe28a96c9f50b67a1b30.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::update
* @see app/Http/Controllers/Farmasi/DataBarangController.php:131
* @route '/farmasi/data-obat/{kode_brng}'
*/
update1aa76071cf55fe28a96c9f50b67a1b30.patch = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1aa76071cf55fe28a96c9f50b67a1b30.url(args, options),
    method: 'patch',
})

export const update = {
    '/farmasi/data-obat/{kode_brng}': update1aa76071cf55fe28a96c9f50b67a1b30,
    '/farmasi/data-obat/{kode_brng}': update1aa76071cf55fe28a96c9f50b67a1b30,
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:166
* @route '/farmasi/data-obat/{kode_brng}'
*/
export const destroy = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:166
* @route '/farmasi/data-obat/{kode_brng}'
*/
destroy.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return destroy.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::destroy
* @see app/Http/Controllers/Farmasi/DataBarangController.php:166
* @route '/farmasi/data-obat/{kode_brng}'
*/
destroy.delete = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const DataBarangController = { index, store, update, destroy }

export default DataBarangController