import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::UjaQEOlE4y1Qyh0u
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
export const UjaQEOlE4y1Qyh0u = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UjaQEOlE4y1Qyh0u.url(args, options),
    method: 'patch',
})

UjaQEOlE4y1Qyh0u.definition = {
    methods: ["patch"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::UjaQEOlE4y1Qyh0u
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
UjaQEOlE4y1Qyh0u.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return UjaQEOlE4y1Qyh0u.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::UjaQEOlE4y1Qyh0u
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
UjaQEOlE4y1Qyh0u.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UjaQEOlE4y1Qyh0u.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::BgvBwvDxM6eKs1CI
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
export const BgvBwvDxM6eKs1CI = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: BgvBwvDxM6eKs1CI.url(args, options),
    method: 'patch',
})

BgvBwvDxM6eKs1CI.definition = {
    methods: ["patch"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::BgvBwvDxM6eKs1CI
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
BgvBwvDxM6eKs1CI.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return BgvBwvDxM6eKs1CI.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::BgvBwvDxM6eKs1CI
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
BgvBwvDxM6eKs1CI.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: BgvBwvDxM6eKs1CI.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::yTqTgo5MoIZ3oxai
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
export const yTqTgo5MoIZ3oxai = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: yTqTgo5MoIZ3oxai.url(args, options),
    method: 'patch',
})

yTqTgo5MoIZ3oxai.definition = {
    methods: ["patch"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::yTqTgo5MoIZ3oxai
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
yTqTgo5MoIZ3oxai.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return yTqTgo5MoIZ3oxai.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::yTqTgo5MoIZ3oxai
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
yTqTgo5MoIZ3oxai.patch = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: yTqTgo5MoIZ3oxai.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::method1zsDsisbPgWRCt68
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const method1zsDsisbPgWRCt68 = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: method1zsDsisbPgWRCt68.url(args, options),
    method: 'patch',
})

method1zsDsisbPgWRCt68.definition = {
    methods: ["patch"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::method1zsDsisbPgWRCt68
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
method1zsDsisbPgWRCt68.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return method1zsDsisbPgWRCt68.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::method1zsDsisbPgWRCt68
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
method1zsDsisbPgWRCt68.patch = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: method1zsDsisbPgWRCt68.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::NIJAtFmR2fBK42hJ
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
export const NIJAtFmR2fBK42hJ = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: NIJAtFmR2fBK42hJ.url(args, options),
    method: 'patch',
})

NIJAtFmR2fBK42hJ.definition = {
    methods: ["patch"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::NIJAtFmR2fBK42hJ
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
NIJAtFmR2fBK42hJ.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return NIJAtFmR2fBK42hJ.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::NIJAtFmR2fBK42hJ
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
NIJAtFmR2fBK42hJ.patch = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: NIJAtFmR2fBK42hJ.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::wgS8QQ2XMVbYQP9d
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
export const wgS8QQ2XMVbYQP9d = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: wgS8QQ2XMVbYQP9d.url(args, options),
    method: 'patch',
})

wgS8QQ2XMVbYQP9d.definition = {
    methods: ["patch"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::wgS8QQ2XMVbYQP9d
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
wgS8QQ2XMVbYQP9d.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return wgS8QQ2XMVbYQP9d.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::wgS8QQ2XMVbYQP9d
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
wgS8QQ2XMVbYQP9d.patch = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: wgS8QQ2XMVbYQP9d.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::Eaj4z9t1Trq0O2sd
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const Eaj4z9t1Trq0O2sd = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Eaj4z9t1Trq0O2sd.url(args, options),
    method: 'patch',
})

Eaj4z9t1Trq0O2sd.definition = {
    methods: ["patch"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::Eaj4z9t1Trq0O2sd
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
Eaj4z9t1Trq0O2sd.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
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

    return Eaj4z9t1Trq0O2sd.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::Eaj4z9t1Trq0O2sd
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
Eaj4z9t1Trq0O2sd.patch = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Eaj4z9t1Trq0O2sd.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::hXQk4XDyql6qV6V6
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
export const hXQk4XDyql6qV6V6 = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: hXQk4XDyql6qV6V6.url(args, options),
    method: 'patch',
})

hXQk4XDyql6qV6V6.definition = {
    methods: ["patch"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::hXQk4XDyql6qV6V6
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
hXQk4XDyql6qV6V6.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hXQk4XDyql6qV6V6.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::hXQk4XDyql6qV6V6
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
hXQk4XDyql6qV6V6.patch = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: hXQk4XDyql6qV6V6.url(args, options),
    method: 'patch',
})

const generated = {
    UjaQEOlE4y1Qyh0u: Object.assign(UjaQEOlE4y1Qyh0u, UjaQEOlE4y1Qyh0u),
    BgvBwvDxM6eKs1CI: Object.assign(BgvBwvDxM6eKs1CI, BgvBwvDxM6eKs1CI),
    yTqTgo5MoIZ3oxai: Object.assign(yTqTgo5MoIZ3oxai, yTqTgo5MoIZ3oxai),
    1zsDsisbPgWRCt68: Object.assign(method1zsDsisbPgWRCt68, method1zsDsisbPgWRCt68),
    NIJAtFmR2fBK42hJ: Object.assign(NIJAtFmR2fBK42hJ, NIJAtFmR2fBK42hJ),
    wgS8QQ2XMVbYQP9d: Object.assign(wgS8QQ2XMVbYQP9d, wgS8QQ2XMVbYQP9d),
    Eaj4z9t1Trq0O2sd: Object.assign(Eaj4z9t1Trq0O2sd, Eaj4z9t1Trq0O2sd),
    hXQk4XDyql6qV6V6: Object.assign(hXQk4XDyql6qV6V6, hXQk4XDyql6qV6V6),
}

export default generated