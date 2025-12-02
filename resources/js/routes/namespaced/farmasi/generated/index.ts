import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::jPIycursk7je1b0S
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
export const jPIycursk7je1b0S = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: jPIycursk7je1b0S.url(args, options),
    method: 'patch',
})

jPIycursk7je1b0S.definition = {
    methods: ["patch"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::jPIycursk7je1b0S
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
jPIycursk7je1b0S.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return jPIycursk7je1b0S.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::jPIycursk7je1b0S
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
jPIycursk7je1b0S.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: jPIycursk7je1b0S.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::aTCghYPU7z0W0DNf
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
export const aTCghYPU7z0W0DNf = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: aTCghYPU7z0W0DNf.url(args, options),
    method: 'patch',
})

aTCghYPU7z0W0DNf.definition = {
    methods: ["patch"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::aTCghYPU7z0W0DNf
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
aTCghYPU7z0W0DNf.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return aTCghYPU7z0W0DNf.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::aTCghYPU7z0W0DNf
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
aTCghYPU7z0W0DNf.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: aTCghYPU7z0W0DNf.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::hdauP6qPNU8nlGin
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
export const hdauP6qPNU8nlGin = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: hdauP6qPNU8nlGin.url(args, options),
    method: 'patch',
})

hdauP6qPNU8nlGin.definition = {
    methods: ["patch"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::hdauP6qPNU8nlGin
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
hdauP6qPNU8nlGin.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hdauP6qPNU8nlGin.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::hdauP6qPNU8nlGin
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
hdauP6qPNU8nlGin.patch = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: hdauP6qPNU8nlGin.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::mo4EGGdlCNHNv4sd
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const mo4EGGdlCNHNv4sd = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: mo4EGGdlCNHNv4sd.url(args, options),
    method: 'patch',
})

mo4EGGdlCNHNv4sd.definition = {
    methods: ["patch"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::mo4EGGdlCNHNv4sd
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
mo4EGGdlCNHNv4sd.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_suplier: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_suplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_suplier: args.kode_suplier,
    }

    return mo4EGGdlCNHNv4sd.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::mo4EGGdlCNHNv4sd
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
mo4EGGdlCNHNv4sd.patch = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: mo4EGGdlCNHNv4sd.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::ofMXz8jvHWDkyiHE
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
export const ofMXz8jvHWDkyiHE = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ofMXz8jvHWDkyiHE.url(args, options),
    method: 'patch',
})

ofMXz8jvHWDkyiHE.definition = {
    methods: ["patch"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::ofMXz8jvHWDkyiHE
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
ofMXz8jvHWDkyiHE.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ofMXz8jvHWDkyiHE.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::ofMXz8jvHWDkyiHE
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
ofMXz8jvHWDkyiHE.patch = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ofMXz8jvHWDkyiHE.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::Xw9lUrxT1a7fX5sO
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
export const Xw9lUrxT1a7fX5sO = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Xw9lUrxT1a7fX5sO.url(args, options),
    method: 'patch',
})

Xw9lUrxT1a7fX5sO.definition = {
    methods: ["patch"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::Xw9lUrxT1a7fX5sO
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
Xw9lUrxT1a7fX5sO.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_racik: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_racik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_racik: args.kd_racik,
    }

    return Xw9lUrxT1a7fX5sO.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::Xw9lUrxT1a7fX5sO
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
Xw9lUrxT1a7fX5sO.patch = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Xw9lUrxT1a7fX5sO.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::FzISoUXhWsHtAbIX
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const FzISoUXhWsHtAbIX = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: FzISoUXhWsHtAbIX.url(args, options),
    method: 'patch',
})

FzISoUXhWsHtAbIX.definition = {
    methods: ["patch"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::FzISoUXhWsHtAbIX
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
FzISoUXhWsHtAbIX.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
            sat_konversi: args[1],
            nilai: args[2],
            nilai_konversi: args[3],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
        sat_konversi: args.sat_konversi,
        nilai: args.nilai,
        nilai_konversi: args.nilai_konversi,
    }

    return FzISoUXhWsHtAbIX.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::FzISoUXhWsHtAbIX
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
FzISoUXhWsHtAbIX.patch = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: FzISoUXhWsHtAbIX.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::lQk8jngMR8kD8Aoc
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
export const lQk8jngMR8kD8Aoc = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: lQk8jngMR8kD8Aoc.url(args, options),
    method: 'patch',
})

lQk8jngMR8kD8Aoc.definition = {
    methods: ["patch"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::lQk8jngMR8kD8Aoc
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
lQk8jngMR8kD8Aoc.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdjns: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdjns: args.kdjns,
    }

    return lQk8jngMR8kD8Aoc.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::lQk8jngMR8kD8Aoc
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
lQk8jngMR8kD8Aoc.patch = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: lQk8jngMR8kD8Aoc.url(args, options),
    method: 'patch',
})

const generated = {
    jPIycursk7je1b0S: Object.assign(jPIycursk7je1b0S, jPIycursk7je1b0S),
    aTCghYPU7z0W0DNf: Object.assign(aTCghYPU7z0W0DNf, aTCghYPU7z0W0DNf),
    hdauP6qPNU8nlGin: Object.assign(hdauP6qPNU8nlGin, hdauP6qPNU8nlGin),
    mo4EGGdlCNHNv4sd: Object.assign(mo4EGGdlCNHNv4sd, mo4EGGdlCNHNv4sd),
    ofMXz8jvHWDkyiHE: Object.assign(ofMXz8jvHWDkyiHE, ofMXz8jvHWDkyiHE),
    Xw9lUrxT1a7fX5sO: Object.assign(Xw9lUrxT1a7fX5sO, Xw9lUrxT1a7fX5sO),
    FzISoUXhWsHtAbIX: Object.assign(FzISoUXhWsHtAbIX, FzISoUXhWsHtAbIX),
    lQk8jngMR8kD8Aoc: Object.assign(lQk8jngMR8kD8Aoc, lQk8jngMR8kD8Aoc),
}

export default generated