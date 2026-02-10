import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PembelianController::Dz455vsMN7yxAdod
* @see app/Http/Controllers/Farmasi/PembelianController.php:221
* @route '/farmasi/akun-bayar'
*/
export const Dz455vsMN7yxAdod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Dz455vsMN7yxAdod.url(options),
    method: 'get',
})

Dz455vsMN7yxAdod.definition = {
    methods: ["get","head"],
    url: '/farmasi/akun-bayar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::Dz455vsMN7yxAdod
* @see app/Http/Controllers/Farmasi/PembelianController.php:221
* @route '/farmasi/akun-bayar'
*/
Dz455vsMN7yxAdod.url = (options?: RouteQueryOptions) => {
    return Dz455vsMN7yxAdod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::Dz455vsMN7yxAdod
* @see app/Http/Controllers/Farmasi/PembelianController.php:221
* @route '/farmasi/akun-bayar'
*/
Dz455vsMN7yxAdod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Dz455vsMN7yxAdod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PembelianController::Dz455vsMN7yxAdod
* @see app/Http/Controllers/Farmasi/PembelianController.php:221
* @route '/farmasi/akun-bayar'
*/
Dz455vsMN7yxAdod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Dz455vsMN7yxAdod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::A1BcZZCXabLiuXmt
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
export const A1BcZZCXabLiuXmt = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: A1BcZZCXabLiuXmt.url(args, options),
    method: 'patch',
})

A1BcZZCXabLiuXmt.definition = {
    methods: ["patch"],
    url: '/farmasi/data-obat/{kode_brng}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::A1BcZZCXabLiuXmt
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
A1BcZZCXabLiuXmt.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return A1BcZZCXabLiuXmt.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::A1BcZZCXabLiuXmt
* @see app/Http/Controllers/Farmasi/DataBarangController.php:154
* @route '/farmasi/data-obat/{kode_brng}'
*/
A1BcZZCXabLiuXmt.patch = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: A1BcZZCXabLiuXmt.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::z5h5V3oqkbc4tWe8
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
export const z5h5V3oqkbc4tWe8 = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: z5h5V3oqkbc4tWe8.url(args, options),
    method: 'patch',
})

z5h5V3oqkbc4tWe8.definition = {
    methods: ["patch"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::z5h5V3oqkbc4tWe8
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
z5h5V3oqkbc4tWe8.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return z5h5V3oqkbc4tWe8.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::z5h5V3oqkbc4tWe8
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:95
* @route '/farmasi/kategori-obat/{kode}'
*/
z5h5V3oqkbc4tWe8.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: z5h5V3oqkbc4tWe8.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::XTltaxyFGj7nXRSC
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
export const XTltaxyFGj7nXRSC = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: XTltaxyFGj7nXRSC.url(args, options),
    method: 'patch',
})

XTltaxyFGj7nXRSC.definition = {
    methods: ["patch"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::XTltaxyFGj7nXRSC
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
XTltaxyFGj7nXRSC.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return XTltaxyFGj7nXRSC.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::XTltaxyFGj7nXRSC
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:95
* @route '/farmasi/golongan-obat/{kode}'
*/
XTltaxyFGj7nXRSC.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: XTltaxyFGj7nXRSC.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::ZmY8ohjwFKbsi1LG
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
export const ZmY8ohjwFKbsi1LG = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ZmY8ohjwFKbsi1LG.url(args, options),
    method: 'patch',
})

ZmY8ohjwFKbsi1LG.definition = {
    methods: ["patch"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::ZmY8ohjwFKbsi1LG
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
ZmY8ohjwFKbsi1LG.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ZmY8ohjwFKbsi1LG.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::ZmY8ohjwFKbsi1LG
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
ZmY8ohjwFKbsi1LG.patch = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ZmY8ohjwFKbsi1LG.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::LicBSxwblFFm8pE8
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const LicBSxwblFFm8pE8 = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: LicBSxwblFFm8pE8.url(args, options),
    method: 'patch',
})

LicBSxwblFFm8pE8.definition = {
    methods: ["patch"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::LicBSxwblFFm8pE8
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
LicBSxwblFFm8pE8.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return LicBSxwblFFm8pE8.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::LicBSxwblFFm8pE8
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
LicBSxwblFFm8pE8.patch = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: LicBSxwblFFm8pE8.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::Uf8BPmIZQhHEboMK
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
export const Uf8BPmIZQhHEboMK = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Uf8BPmIZQhHEboMK.url(args, options),
    method: 'patch',
})

Uf8BPmIZQhHEboMK.definition = {
    methods: ["patch"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::Uf8BPmIZQhHEboMK
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
Uf8BPmIZQhHEboMK.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return Uf8BPmIZQhHEboMK.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::Uf8BPmIZQhHEboMK
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
Uf8BPmIZQhHEboMK.patch = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: Uf8BPmIZQhHEboMK.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::ApK6nbSfGSiGBDZ2
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
export const ApK6nbSfGSiGBDZ2 = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ApK6nbSfGSiGBDZ2.url(args, options),
    method: 'patch',
})

ApK6nbSfGSiGBDZ2.definition = {
    methods: ["patch"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::ApK6nbSfGSiGBDZ2
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
ApK6nbSfGSiGBDZ2.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ApK6nbSfGSiGBDZ2.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::ApK6nbSfGSiGBDZ2
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
ApK6nbSfGSiGBDZ2.patch = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ApK6nbSfGSiGBDZ2.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::aVrl6ogz25ra33hN
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const aVrl6ogz25ra33hN = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: aVrl6ogz25ra33hN.url(args, options),
    method: 'patch',
})

aVrl6ogz25ra33hN.definition = {
    methods: ["patch"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::aVrl6ogz25ra33hN
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
aVrl6ogz25ra33hN.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
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

    return aVrl6ogz25ra33hN.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::aVrl6ogz25ra33hN
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
aVrl6ogz25ra33hN.patch = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: aVrl6ogz25ra33hN.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::c7KQWTq5S3WBGceg
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
export const c7KQWTq5S3WBGceg = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: c7KQWTq5S3WBGceg.url(args, options),
    method: 'patch',
})

c7KQWTq5S3WBGceg.definition = {
    methods: ["patch"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::c7KQWTq5S3WBGceg
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
c7KQWTq5S3WBGceg.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return c7KQWTq5S3WBGceg.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::c7KQWTq5S3WBGceg
* @see app/Http/Controllers/Farmasi/JenisObatController.php:90
* @route '/farmasi/jenis-obat/{kdjns}'
*/
c7KQWTq5S3WBGceg.patch = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: c7KQWTq5S3WBGceg.url(args, options),
    method: 'patch',
})

const generated = {
    Dz455vsMN7yxAdod: Object.assign(Dz455vsMN7yxAdod, Dz455vsMN7yxAdod),
    A1BcZZCXabLiuXmt: Object.assign(A1BcZZCXabLiuXmt, A1BcZZCXabLiuXmt),
    z5h5V3oqkbc4tWe8: Object.assign(z5h5V3oqkbc4tWe8, z5h5V3oqkbc4tWe8),
    XTltaxyFGj7nXRSC: Object.assign(XTltaxyFGj7nXRSC, XTltaxyFGj7nXRSC),
    ZmY8ohjwFKbsi1LG: Object.assign(ZmY8ohjwFKbsi1LG, ZmY8ohjwFKbsi1LG),
    LicBSxwblFFm8pE8: Object.assign(LicBSxwblFFm8pE8, LicBSxwblFFm8pE8),
    Uf8BPmIZQhHEboMK: Object.assign(Uf8BPmIZQhHEboMK, Uf8BPmIZQhHEboMK),
    ApK6nbSfGSiGBDZ2: Object.assign(ApK6nbSfGSiGBDZ2, ApK6nbSfGSiGBDZ2),
    aVrl6ogz25ra33hN: Object.assign(aVrl6ogz25ra33hN, aVrl6ogz25ra33hN),
    c7KQWTq5S3WBGceg: Object.assign(c7KQWTq5S3WBGceg, c7KQWTq5S3WBGceg),
}

export default generated