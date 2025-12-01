import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:24
* @route '/api/tarif-tindakan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:24
* @route '/api/tarif-tindakan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:24
* @route '/api/tarif-tindakan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:24
* @route '/api/tarif-tindakan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:552
* @route '/api/tarif-tindakan/dokter'
*/
export const getDokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter.url(options),
    method: 'get',
})

getDokter.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:552
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.url = (options?: RouteQueryOptions) => {
    return getDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:552
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:552
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:573
* @route '/api/tarif-tindakan/petugas'
*/
export const getPetugas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

getPetugas.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:573
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.url = (options?: RouteQueryOptions) => {
    return getPetugas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:573
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:573
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPetugas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
export const storeDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokter.url(options),
    method: 'post',
})

storeDokter.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
storeDokter.url = (options?: RouteQueryOptions) => {
    return storeDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
storeDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
export const storePerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePerawat.url(options),
    method: 'post',
})

storePerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
storePerawat.url = (options?: RouteQueryOptions) => {
    return storePerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
storePerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
export const storeDokterPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokterPerawat.url(options),
    method: 'post',
})

storeDokterPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::stageRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
export const stageRalan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageRalan.url(options),
    method: 'post',
})

stageRalan.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/stage-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::stageRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageRalan.url = (options?: RouteQueryOptions) => {
    return stageRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::stageRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
export const riwayat = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan/riwayat/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
riwayat.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            noRawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noRawat: args.noRawat,
    }

    return riwayat.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
riwayat.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
riwayat.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteMethod
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete","post"],
    url: '/api/tarif-tindakan',
} satisfies RouteDefinition<["delete","post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteMethod
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteMethod
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteMethod
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteMethod.url(options),
    method: 'post',
})

const tarifTindakan = {
    index: Object.assign(index, index),
    getDokter: Object.assign(getDokter, getDokter),
    getPetugas: Object.assign(getPetugas, getPetugas),
    storeDokter: Object.assign(storeDokter, storeDokter),
    storePerawat: Object.assign(storePerawat, storePerawat),
    storeDokterPerawat: Object.assign(storeDokterPerawat, storeDokterPerawat),
    stageRalan: Object.assign(stageRalan, stageRalan),
    riwayat: Object.assign(riwayat, riwayat),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default tarifTindakan