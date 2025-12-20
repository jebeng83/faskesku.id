import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:22
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
* @see app/Http/Controllers/TarifTindakanController.php:22
* @route '/api/tarif-tindakan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:22
* @route '/api/tarif-tindakan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::index
* @see app/Http/Controllers/TarifTindakanController.php:22
* @route '/api/tarif-tindakan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:820
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
* @see app/Http/Controllers/TarifTindakanController.php:820
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.url = (options?: RouteQueryOptions) => {
    return getDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:820
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getDokter
* @see app/Http/Controllers/TarifTindakanController.php:820
* @route '/api/tarif-tindakan/dokter'
*/
getDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:841
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
* @see app/Http/Controllers/TarifTindakanController.php:841
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.url = (options?: RouteQueryOptions) => {
    return getPetugas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:841
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPetugas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getPetugas
* @see app/Http/Controllers/TarifTindakanController.php:841
* @route '/api/tarif-tindakan/petugas'
*/
getPetugas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPetugas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokter
* @see app/Http/Controllers/TarifTindakanController.php:406
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
* @see app/Http/Controllers/TarifTindakanController.php:406
* @route '/api/tarif-tindakan/dokter'
*/
storeTindakanDokter.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokter
* @see app/Http/Controllers/TarifTindakanController.php:406
* @route '/api/tarif-tindakan/dokter'
*/
storeTindakanDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanPerawat
* @see app/Http/Controllers/TarifTindakanController.php:459
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
* @see app/Http/Controllers/TarifTindakanController.php:459
* @route '/api/tarif-tindakan/perawat'
*/
storeTindakanPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanPerawat
* @see app/Http/Controllers/TarifTindakanController.php:459
* @route '/api/tarif-tindakan/perawat'
*/
storeTindakanPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:512
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
* @see app/Http/Controllers/TarifTindakanController.php:512
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeTindakanDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeTindakanDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:512
* @route '/api/tarif-tindakan/dokter-perawat'
*/
storeTindakanDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::stageJurnalRalan
* @see app/Http/Controllers/TarifTindakanController.php:349
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
* @see app/Http/Controllers/TarifTindakanController.php:349
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageJurnalRalan.url = (options?: RouteQueryOptions) => {
    return stageJurnalRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::stageJurnalRalan
* @see app/Http/Controllers/TarifTindakanController.php:349
* @route '/api/tarif-tindakan/stage-ralan'
*/
stageJurnalRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageJurnalRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:568
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
* @see app/Http/Controllers/TarifTindakanController.php:568
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
* @see app/Http/Controllers/TarifTindakanController.php:568
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
getRiwayatTindakan.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatTindakan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakan
* @see app/Http/Controllers/TarifTindakanController.php:568
* @route '/api/tarif-tindakan/riwayat/{noRawat}'
*/
getRiwayatTindakan.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayatTindakan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:668
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
* @see app/Http/Controllers/TarifTindakanController.php:668
* @route '/api/tarif-tindakan'
*/
deleteTindakan.url = (options?: RouteQueryOptions) => {
    return deleteTindakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:668
* @route '/api/tarif-tindakan'
*/
deleteTindakan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteTindakan.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::deleteTindakan
* @see app/Http/Controllers/TarifTindakanController.php:668
* @route '/api/tarif-tindakan'
*/
deleteTindakan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteTindakan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::indexRanap
* @see app/Http/Controllers/TarifTindakanController.php:82
* @route '/api/tarif-tindakan-ranap'
*/
export const indexRanap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexRanap.url(options),
    method: 'get',
})

indexRanap.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::indexRanap
* @see app/Http/Controllers/TarifTindakanController.php:82
* @route '/api/tarif-tindakan-ranap'
*/
indexRanap.url = (options?: RouteQueryOptions) => {
    return indexRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::indexRanap
* @see app/Http/Controllers/TarifTindakanController.php:82
* @route '/api/tarif-tindakan-ranap'
*/
indexRanap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexRanap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::indexRanap
* @see app/Http/Controllers/TarifTindakanController.php:82
* @route '/api/tarif-tindakan-ranap'
*/
indexRanap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexRanap.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokter
* @see app/Http/Controllers/TarifTindakanController.php:127
* @route '/api/tarif-tindakan-ranap/dokter'
*/
export const storeRanapDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapDokter.url(options),
    method: 'post',
})

storeRanapDokter.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokter
* @see app/Http/Controllers/TarifTindakanController.php:127
* @route '/api/tarif-tindakan-ranap/dokter'
*/
storeRanapDokter.url = (options?: RouteQueryOptions) => {
    return storeRanapDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokter
* @see app/Http/Controllers/TarifTindakanController.php:127
* @route '/api/tarif-tindakan-ranap/dokter'
*/
storeRanapDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapPerawat
* @see app/Http/Controllers/TarifTindakanController.php:167
* @route '/api/tarif-tindakan-ranap/perawat'
*/
export const storeRanapPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapPerawat.url(options),
    method: 'post',
})

storeRanapPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapPerawat
* @see app/Http/Controllers/TarifTindakanController.php:167
* @route '/api/tarif-tindakan-ranap/perawat'
*/
storeRanapPerawat.url = (options?: RouteQueryOptions) => {
    return storeRanapPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapPerawat
* @see app/Http/Controllers/TarifTindakanController.php:167
* @route '/api/tarif-tindakan-ranap/perawat'
*/
storeRanapPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:207
* @route '/api/tarif-tindakan-ranap/dokter-perawat'
*/
export const storeRanapDokterPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapDokterPerawat.url(options),
    method: 'post',
})

storeRanapDokterPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:207
* @route '/api/tarif-tindakan-ranap/dokter-perawat'
*/
storeRanapDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeRanapDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeRanapDokterPerawat
* @see app/Http/Controllers/TarifTindakanController.php:207
* @route '/api/tarif-tindakan-ranap/dokter-perawat'
*/
storeRanapDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRanapDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakanRanap
* @see app/Http/Controllers/TarifTindakanController.php:250
* @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
*/
export const getRiwayatTindakanRanap = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatTindakanRanap.url(args, options),
    method: 'get',
})

getRiwayatTindakanRanap.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan-ranap/riwayat/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakanRanap
* @see app/Http/Controllers/TarifTindakanController.php:250
* @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
*/
getRiwayatTindakanRanap.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayatTindakanRanap.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakanRanap
* @see app/Http/Controllers/TarifTindakanController.php:250
* @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
*/
getRiwayatTindakanRanap.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatTindakanRanap.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::getRiwayatTindakanRanap
* @see app/Http/Controllers/TarifTindakanController.php:250
* @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
*/
getRiwayatTindakanRanap.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayatTindakanRanap.url(args, options),
    method: 'head',
})

const TarifTindakanController = { index, getDokter, getPetugas, storeTindakanDokter, storeTindakanPerawat, storeTindakanDokterPerawat, stageJurnalRalan, getRiwayatTindakan, deleteTindakan, indexRanap, storeRanapDokter, storeRanapPerawat, storeRanapDokterPerawat, getRiwayatTindakanRanap }

export default TarifTindakanController