import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::index
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:13
* @route '/farmasi/satuan-barang'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/satuan-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::index
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:13
* @route '/farmasi/satuan-barang'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::index
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:13
* @route '/farmasi/satuan-barang'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::index
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:13
* @route '/farmasi/satuan-barang'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::store
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:41
* @route '/farmasi/satuan-barang'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/satuan-barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::store
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:41
* @route '/farmasi/satuan-barang'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::store
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:41
* @route '/farmasi/satuan-barang'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
const updateb8483c0a3c0299af128e9aabba794c53 = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb8483c0a3c0299af128e9aabba794c53.url(args, options),
    method: 'put',
})

updateb8483c0a3c0299af128e9aabba794c53.definition = {
    methods: ["put"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
updateb8483c0a3c0299af128e9aabba794c53.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_sat: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
    }

    return updateb8483c0a3c0299af128e9aabba794c53.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
updateb8483c0a3c0299af128e9aabba794c53.put = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb8483c0a3c0299af128e9aabba794c53.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
const updateb8483c0a3c0299af128e9aabba794c53 = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb8483c0a3c0299af128e9aabba794c53.url(args, options),
    method: 'patch',
})

updateb8483c0a3c0299af128e9aabba794c53.definition = {
    methods: ["patch"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
updateb8483c0a3c0299af128e9aabba794c53.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_sat: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
    }

    return updateb8483c0a3c0299af128e9aabba794c53.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::update
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
updateb8483c0a3c0299af128e9aabba794c53.patch = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb8483c0a3c0299af128e9aabba794c53.url(args, options),
    method: 'patch',
})

export const update = {
    '/farmasi/satuan-barang/{kode_sat}': updateb8483c0a3c0299af128e9aabba794c53,
    '/farmasi/satuan-barang/{kode_sat}': updateb8483c0a3c0299af128e9aabba794c53,
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::destroy
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:73
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
export const destroy = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::destroy
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:73
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
destroy.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_sat: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
    }

    return destroy.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::destroy
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:73
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
destroy.delete = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SatuanBarangController = { index, store, update, destroy }

export default SatuanBarangController