import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import byRawat77438b from './by-rawat'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:24
* @route '/api/resep'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resep',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:24
* @route '/api/resep'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:24
* @route '/api/resep'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:850
* @route '/api/resep/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/resep/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:850
* @route '/api/resep/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:850
* @route '/api/resep/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:850
* @route '/api/resep/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1105
* @route '/api/resep/stok-info'
*/
export const stokInfo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokInfo.url(options),
    method: 'get',
})

stokInfo.definition = {
    methods: ["get","head"],
    url: '/api/resep/stok-info',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1105
* @route '/api/resep/stok-info'
*/
stokInfo.url = (options?: RouteQueryOptions) => {
    return stokInfo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1105
* @route '/api/resep/stok-info'
*/
stokInfo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokInfo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1105
* @route '/api/resep/stok-info'
*/
stokInfo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokInfo.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:471
* @route '/api/resep/rawat/{no_rawat}'
*/
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/resep/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:471
* @route '/api/resep/rawat/{no_rawat}'
*/
byRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:471
* @route '/api/resep/rawat/{no_rawat}'
*/
byRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:471
* @route '/api/resep/rawat/{no_rawat}'
*/
byRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byPasien
* @see app/Http/Controllers/RawatJalan/ResepController.php:540
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
export const byPasien = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPasien.url(args, options),
    method: 'get',
})

byPasien.definition = {
    methods: ["get","head"],
    url: '/api/resep/pasien/{no_rkm_medis}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byPasien
* @see app/Http/Controllers/RawatJalan/ResepController.php:540
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
byPasien.url = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rkm_medis: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
    }

    return byPasien.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byPasien
* @see app/Http/Controllers/RawatJalan/ResepController.php:540
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
byPasien.get = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPasien.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::byPasien
* @see app/Http/Controllers/RawatJalan/ResepController.php:540
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
byPasien.head = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byPasien.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
* @see app/Http/Controllers/RawatJalan/ResepController.php:625
* @route '/api/resep/{no_resep}'
*/
export const get = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/api/resep/{no_resep}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
* @see app/Http/Controllers/RawatJalan/ResepController.php:625
* @route '/api/resep/{no_resep}'
*/
get.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return get.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
* @see app/Http/Controllers/RawatJalan/ResepController.php:625
* @route '/api/resep/{no_resep}'
*/
get.get = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::get
* @see app/Http/Controllers/RawatJalan/ResepController.php:625
* @route '/api/resep/{no_resep}'
*/
get.head = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::deleteMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1179
* @route '/api/resep/{no_resep}'
*/
export const deleteMethod = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/api/resep/{no_resep}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::deleteMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1179
* @route '/api/resep/{no_resep}'
*/
deleteMethod.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return deleteMethod.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::deleteMethod
* @see app/Http/Controllers/RawatJalan/ResepController.php:1179
* @route '/api/resep/{no_resep}'
*/
deleteMethod.delete = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:181
* @route '/api/resep/{no_resep}/penyerahan'
*/
export const penyerahan = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyerahan.url(args, options),
    method: 'post',
})

penyerahan.definition = {
    methods: ["post"],
    url: '/api/resep/{no_resep}/penyerahan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:181
* @route '/api/resep/{no_resep}/penyerahan'
*/
penyerahan.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return penyerahan.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:181
* @route '/api/resep/{no_resep}/penyerahan'
*/
penyerahan.post = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyerahan.url(args, options),
    method: 'post',
})

const resep = {
    store: Object.assign(store, store),
    list: Object.assign(list, list),
    stokInfo: Object.assign(stokInfo, stokInfo),
    byRawat: Object.assign(byRawat, byRawat77438b),
    byPasien: Object.assign(byPasien, byPasien),
    get: Object.assign(get, get),
    delete: Object.assign(deleteMethod, deleteMethod),
    penyerahan: Object.assign(penyerahan, penyerahan),
}

export default resep