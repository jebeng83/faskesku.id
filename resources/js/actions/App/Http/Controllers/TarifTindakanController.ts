import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
export const storeTindakanDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokter.url(options),
    method: 'post',
})

storeTindakanDokter.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
storeTindakanDokter.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokter
* @see app/Http/Controllers/TarifTindakanController.php:144
* @route '/api/tarif-tindakan/dokter'
*/
storeTindakanDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanPerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
export const storeTindakanPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanPerawat.url(options),
    method: 'post',
})

storeTindakanPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanPerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
storeTindakanPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanPerawat
* @see app/Http/Controllers/TarifTindakanController.php:196
* @route '/api/tarif-tindakan/perawat'
*/
storeTindakanPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
export const storeTindakanDokterPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokterPerawat.url(options),
    method: 'post',
})

storeTindakanDokterPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeTindakanDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:248
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeTindakanDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::stageJurnalRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
export const stageJurnalRalan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageJurnalRalan.url(options),
    method: 'post',
})

stageJurnalRalan.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan/stage-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::stageJurnalRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageJurnalRalan.url = (options?: RouteQueryOptions) => {
    return stageJurnalRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::stageJurnalRalan
* @see app/Http/Controllers/TarifTindakanController.php:88
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageJurnalRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageJurnalRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
export const getRiwayatTindakan = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatTindakan.url(args, options),
    method: 'get',
})

getRiwayatTindakan.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan/riwayat/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
getRiwayatTindakan.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayatTindakan.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
getRiwayatTindakan.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatTindakan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:303
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
getRiwayatTindakan.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayatTindakan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
export const deleteTindakan = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteTindakan.url(options),
    method: 'delete',
})

deleteTindakan.definition = {
    methods: ["delete","post"],
    url: '/api/tarif-tindakan',
} satisfies RouteDefinition<["delete","post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteTindakan.url = (options?: RouteQueryOptions) => {
    return deleteTindakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteTindakan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteTindakan.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:403
* @route '/api/tarif-tindakan'
*/
deleteTindakan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteTindakan.url(options),
    method: 'post',
})

const TarifTindakanController = { index, getDokter, getPetugas, storeTindakanDokter, storeTindakanPerawat, storeTindakanDokterPerawat, stageJurnalRalan, getRiwayatTindakan, deleteTindakan }

export default TarifTindakanController