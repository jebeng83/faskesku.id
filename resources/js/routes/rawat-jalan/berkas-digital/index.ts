import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::kategori
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:553
* @route '/rawat-jalan/berkas-digital/kategori'
*/
export const kategori = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kategori.url(options),
    method: 'get',
})

kategori.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/berkas-digital/kategori',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::kategori
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:553
* @route '/rawat-jalan/berkas-digital/kategori'
*/
kategori.url = (options?: RouteQueryOptions) => {
    return kategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::kategori
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:553
* @route '/rawat-jalan/berkas-digital/kategori'
*/
kategori.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kategori.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::kategori
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:553
* @route '/rawat-jalan/berkas-digital/kategori'
*/
kategori.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kategori.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::file
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:599
* @route '/rawat-jalan/berkas-digital/file/{path}'
*/
export const file = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: file.url(args, options),
    method: 'get',
})

file.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/berkas-digital/file/{path}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::file
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:599
* @route '/rawat-jalan/berkas-digital/file/{path}'
*/
file.url = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    if (Array.isArray(args)) {
        args = {
            path: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        path: args.path,
    }

    return file.definition.url
            .replace('{path}', parsedArgs.path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::file
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:599
* @route '/rawat-jalan/berkas-digital/file/{path}'
*/
file.get = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: file.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::file
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:599
* @route '/rawat-jalan/berkas-digital/file/{path}'
*/
file.head = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: file.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::list
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:570
* @route '/rawat-jalan/berkas-digital/{no_rawat}'
*/
export const list = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/berkas-digital/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::list
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:570
* @route '/rawat-jalan/berkas-digital/{no_rawat}'
*/
list.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return list.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::list
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:570
* @route '/rawat-jalan/berkas-digital/{no_rawat}'
*/
list.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::list
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:570
* @route '/rawat-jalan/berkas-digital/{no_rawat}'
*/
list.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/berkas-digital'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/berkas-digital',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/berkas-digital'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/berkas-digital'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:748
* @route '/rawat-jalan/berkas-digital'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/berkas-digital',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:748
* @route '/rawat-jalan/berkas-digital'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:748
* @route '/rawat-jalan/berkas-digital'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const berkasDigital = {
    kategori: Object.assign(kategori, kategori),
    file: Object.assign(file, file),
    list: Object.assign(list, list),
    store: Object.assign(store, store),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default berkasDigital