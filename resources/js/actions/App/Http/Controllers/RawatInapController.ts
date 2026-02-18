import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::getJenisTindakan
* @see app/Http/Controllers/RawatInapController.php:719
* @route '/api/rawat-inap/jenis-tindakan'
*/
export const getJenisTindakan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisTindakan.url(options),
    method: 'get',
})

getJenisTindakan.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/jenis-tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::getJenisTindakan
* @see app/Http/Controllers/RawatInapController.php:719
* @route '/api/rawat-inap/jenis-tindakan'
*/
getJenisTindakan.url = (options?: RouteQueryOptions) => {
    return getJenisTindakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::getJenisTindakan
* @see app/Http/Controllers/RawatInapController.php:719
* @route '/api/rawat-inap/jenis-tindakan'
*/
getJenisTindakan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisTindakan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::getJenisTindakan
* @see app/Http/Controllers/RawatInapController.php:719
* @route '/api/rawat-inap/jenis-tindakan'
*/
getJenisTindakan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenisTindakan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::getDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1055
* @route '/api/rawat-inap/diagnosa'
*/
export const getDiagnosaPasien = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'get',
})

getDiagnosaPasien.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::getDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1055
* @route '/api/rawat-inap/diagnosa'
*/
getDiagnosaPasien.url = (options?: RouteQueryOptions) => {
    return getDiagnosaPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::getDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1055
* @route '/api/rawat-inap/diagnosa'
*/
getDiagnosaPasien.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::getDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1055
* @route '/api/rawat-inap/diagnosa'
*/
getDiagnosaPasien.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1081
* @route '/api/rawat-inap/diagnosa'
*/
export const storeDiagnosaPasien = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDiagnosaPasien.url(options),
    method: 'post',
})

storeDiagnosaPasien.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/diagnosa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1081
* @route '/api/rawat-inap/diagnosa'
*/
storeDiagnosaPasien.url = (options?: RouteQueryOptions) => {
    return storeDiagnosaPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatInapController.php:1081
* @route '/api/rawat-inap/diagnosa'
*/
storeDiagnosaPasien.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDiagnosaPasien.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::cekBillingStatus
* @see app/Http/Controllers/RawatInapController.php:771
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
export const cekBillingStatus = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekBillingStatus.url(args, options),
    method: 'get',
})

cekBillingStatus.definition = {
    methods: ["get","head"],
    url: '/api/rawat-inap/cek-billing/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::cekBillingStatus
* @see app/Http/Controllers/RawatInapController.php:771
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBillingStatus.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cekBillingStatus.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::cekBillingStatus
* @see app/Http/Controllers/RawatInapController.php:771
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBillingStatus.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekBillingStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::cekBillingStatus
* @see app/Http/Controllers/RawatInapController.php:771
* @route '/api/rawat-inap/cek-billing/{noRawat}'
*/
cekBillingStatus.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekBillingStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokter
* @see app/Http/Controllers/RawatInapController.php:784
* @route '/api/rawat-inap/tindakan-dokter'
*/
export const storeTindakanDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokter.url(options),
    method: 'post',
})

storeTindakanDokter.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/tindakan-dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokter
* @see app/Http/Controllers/RawatInapController.php:784
* @route '/api/rawat-inap/tindakan-dokter'
*/
storeTindakanDokter.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokter
* @see app/Http/Controllers/RawatInapController.php:784
* @route '/api/rawat-inap/tindakan-dokter'
*/
storeTindakanDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanPerawat
* @see app/Http/Controllers/RawatInapController.php:874
* @route '/api/rawat-inap/tindakan-perawat'
*/
export const storeTindakanPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanPerawat.url(options),
    method: 'post',
})

storeTindakanPerawat.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/tindakan-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanPerawat
* @see app/Http/Controllers/RawatInapController.php:874
* @route '/api/rawat-inap/tindakan-perawat'
*/
storeTindakanPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanPerawat
* @see app/Http/Controllers/RawatInapController.php:874
* @route '/api/rawat-inap/tindakan-perawat'
*/
storeTindakanPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokterPerawat
* @see app/Http/Controllers/RawatInapController.php:964
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
export const storeTindakanDokterPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokterPerawat.url(options),
    method: 'post',
})

storeTindakanDokterPerawat.definition = {
    methods: ["post"],
    url: '/api/rawat-inap/tindakan-dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokterPerawat
* @see app/Http/Controllers/RawatInapController.php:964
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
storeTindakanDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeTindakanDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storeTindakanDokterPerawat
* @see app/Http/Controllers/RawatInapController.php:964
* @route '/api/rawat-inap/tindakan-dokter-perawat'
*/
storeTindakanDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTindakanDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:198
* @route '/rawat-inap/lanjutan'
*/
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:198
* @route '/rawat-inap/lanjutan'
*/
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:198
* @route '/rawat-inap/lanjutan'
*/
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:198
* @route '/rawat-inap/lanjutan'
*/
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::canvas
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/rawat-inap/canvas'
*/
export const canvas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: canvas.url(options),
    method: 'get',
})

canvas.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/canvas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::canvas
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/rawat-inap/canvas'
*/
canvas.url = (options?: RouteQueryOptions) => {
    return canvas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::canvas
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/rawat-inap/canvas'
*/
canvas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: canvas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::canvas
* @see app/Http/Controllers/RawatInapController.php:297
* @route '/rawat-inap/canvas'
*/
canvas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: canvas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:417
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const pemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'get',
})

pemeriksaanRanap.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:417
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:417
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:417
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:449
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const storePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRanap.url(options),
    method: 'post',
})

storePemeriksaanRanap.definition = {
    methods: ["post"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:449
* @route '/rawat-inap/pemeriksaan-ranap'
*/
storePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return storePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:449
* @route '/rawat-inap/pemeriksaan-ranap'
*/
storePemeriksaanRanap.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRanap.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:562
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const deletePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRanap.url(options),
    method: 'delete',
})

deletePemeriksaanRanap.definition = {
    methods: ["delete"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:562
* @route '/rawat-inap/pemeriksaan-ranap'
*/
deletePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return deletePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:562
* @route '/rawat-inap/pemeriksaan-ranap'
*/
deletePemeriksaanRanap.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRanap.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:586
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const updatePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRanap.url(options),
    method: 'put',
})

updatePemeriksaanRanap.definition = {
    methods: ["put"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:586
* @route '/rawat-inap/pemeriksaan-ranap'
*/
updatePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return updatePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:586
* @route '/rawat-inap/pemeriksaan-ranap'
*/
updatePemeriksaanRanap.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRanap.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:16
* @route '/rawat-inap'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:16
* @route '/rawat-inap'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:16
* @route '/rawat-inap'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:16
* @route '/rawat-inap'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:161
* @route '/rawat-inap/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:161
* @route '/rawat-inap/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:161
* @route '/rawat-inap/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:161
* @route '/rawat-inap/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:171
* @route '/rawat-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:171
* @route '/rawat-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:171
* @route '/rawat-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:181
* @route '/rawat-inap/{rawat_inap}'
*/
export const show = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:181
* @route '/rawat-inap/{rawat_inap}'
*/
show.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return show.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:181
* @route '/rawat-inap/{rawat_inap}'
*/
show.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:181
* @route '/rawat-inap/{rawat_inap}'
*/
show.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:191
* @route '/rawat-inap/{rawat_inap}/edit'
*/
export const edit = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:191
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return edit.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:191
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:191
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:699
* @route '/rawat-inap/{rawat_inap}'
*/
export const update = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:699
* @route '/rawat-inap/{rawat_inap}'
*/
update.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return update.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:699
* @route '/rawat-inap/{rawat_inap}'
*/
update.put = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:699
* @route '/rawat-inap/{rawat_inap}'
*/
update.patch = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:709
* @route '/rawat-inap/{rawat_inap}'
*/
export const destroy = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:709
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return destroy.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:709
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.delete = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const RawatInapController = { getJenisTindakan, getDiagnosaPasien, storeDiagnosaPasien, cekBillingStatus, storeTindakanDokter, storeTindakanPerawat, storeTindakanDokterPerawat, lanjutan, canvas, pemeriksaanRanap, storePemeriksaanRanap, deletePemeriksaanRanap, updatePemeriksaanRanap, index, create, store, show, edit, update, destroy }

export default RawatInapController