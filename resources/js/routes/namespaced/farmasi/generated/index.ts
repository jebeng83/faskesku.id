import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::method3VrFe7I0Unx0zuJR
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
export const method3VrFe7I0Unx0zuJR = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: method3VrFe7I0Unx0zuJR.url(args, options),
    method: 'patch',
})

method3VrFe7I0Unx0zuJR.definition = {
    methods: ["patch"],
    url: '/farmasi/kategori-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::method3VrFe7I0Unx0zuJR
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
method3VrFe7I0Unx0zuJR.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return method3VrFe7I0Unx0zuJR.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KategoriBarangController::method3VrFe7I0Unx0zuJR
* @see app/Http/Controllers/Farmasi/KategoriBarangController.php:93
* @route '/farmasi/kategori-obat/{kode}'
*/
method3VrFe7I0Unx0zuJR.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: method3VrFe7I0Unx0zuJR.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::kqSIs4pqpW9yMT9k
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
export const kqSIs4pqpW9yMT9k = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: kqSIs4pqpW9yMT9k.url(args, options),
    method: 'patch',
})

kqSIs4pqpW9yMT9k.definition = {
    methods: ["patch"],
    url: '/farmasi/golongan-obat/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::kqSIs4pqpW9yMT9k
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
kqSIs4pqpW9yMT9k.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return kqSIs4pqpW9yMT9k.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\GolonganBarangController::kqSIs4pqpW9yMT9k
* @see app/Http/Controllers/Farmasi/GolonganBarangController.php:93
* @route '/farmasi/golongan-obat/{kode}'
*/
kqSIs4pqpW9yMT9k.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: kqSIs4pqpW9yMT9k.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::qmZdjhQobzzHVCdS
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
export const qmZdjhQobzzHVCdS = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: qmZdjhQobzzHVCdS.url(args, options),
    method: 'patch',
})

qmZdjhQobzzHVCdS.definition = {
    methods: ["patch"],
    url: '/farmasi/industri-farmasi/{kode_industri}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::qmZdjhQobzzHVCdS
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
qmZdjhQobzzHVCdS.url = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return qmZdjhQobzzHVCdS.definition.url
            .replace('{kode_industri}', parsedArgs.kode_industri.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\IndustriFarmasiController::qmZdjhQobzzHVCdS
* @see app/Http/Controllers/Farmasi/IndustriFarmasiController.php:73
* @route '/farmasi/industri-farmasi/{kode_industri}'
*/
qmZdjhQobzzHVCdS.patch = (args: { kode_industri: string | number } | [kode_industri: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: qmZdjhQobzzHVCdS.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::PyM6Ox6f0ZPvtKtu
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const PyM6Ox6f0ZPvtKtu = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: PyM6Ox6f0ZPvtKtu.url(args, options),
    method: 'patch',
})

PyM6Ox6f0ZPvtKtu.definition = {
    methods: ["patch"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::PyM6Ox6f0ZPvtKtu
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
PyM6Ox6f0ZPvtKtu.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return PyM6Ox6f0ZPvtKtu.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::PyM6Ox6f0ZPvtKtu
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
PyM6Ox6f0ZPvtKtu.patch = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: PyM6Ox6f0ZPvtKtu.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::J5piRXOhA9BKX0sV
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
export const J5piRXOhA9BKX0sV = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: J5piRXOhA9BKX0sV.url(args, options),
    method: 'patch',
})

J5piRXOhA9BKX0sV.definition = {
    methods: ["patch"],
    url: '/farmasi/satuan-barang/{kode_sat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::J5piRXOhA9BKX0sV
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
J5piRXOhA9BKX0sV.url = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return J5piRXOhA9BKX0sV.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SatuanBarangController::J5piRXOhA9BKX0sV
* @see app/Http/Controllers/Farmasi/SatuanBarangController.php:54
* @route '/farmasi/satuan-barang/{kode_sat}'
*/
J5piRXOhA9BKX0sV.patch = (args: { kode_sat: string | number } | [kode_sat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: J5piRXOhA9BKX0sV.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::PW983VdiZYcMWrbv
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
export const PW983VdiZYcMWrbv = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: PW983VdiZYcMWrbv.url(args, options),
    method: 'patch',
})

PW983VdiZYcMWrbv.definition = {
    methods: ["patch"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::PW983VdiZYcMWrbv
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
PW983VdiZYcMWrbv.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return PW983VdiZYcMWrbv.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::PW983VdiZYcMWrbv
* @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
* @route '/farmasi/metode-racik/{kd_racik}'
*/
PW983VdiZYcMWrbv.patch = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: PW983VdiZYcMWrbv.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::iQU57kmfhf7cevID
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const iQU57kmfhf7cevID = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: iQU57kmfhf7cevID.url(args, options),
    method: 'patch',
})

iQU57kmfhf7cevID.definition = {
    methods: ["patch"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::iQU57kmfhf7cevID
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
iQU57kmfhf7cevID.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
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

    return iQU57kmfhf7cevID.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::iQU57kmfhf7cevID
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:86
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
iQU57kmfhf7cevID.patch = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: iQU57kmfhf7cevID.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::wOgolkz3nn3ZNuxK
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
export const wOgolkz3nn3ZNuxK = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: wOgolkz3nn3ZNuxK.url(args, options),
    method: 'patch',
})

wOgolkz3nn3ZNuxK.definition = {
    methods: ["patch"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::wOgolkz3nn3ZNuxK
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
wOgolkz3nn3ZNuxK.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return wOgolkz3nn3ZNuxK.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::wOgolkz3nn3ZNuxK
* @see app/Http/Controllers/Farmasi/JenisObatController.php:88
* @route '/farmasi/jenis-obat/{kdjns}'
*/
wOgolkz3nn3ZNuxK.patch = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: wOgolkz3nn3ZNuxK.url(args, options),
    method: 'patch',
})

const generated = {
    3VrFe7I0Unx0zuJR: Object.assign(method3VrFe7I0Unx0zuJR, method3VrFe7I0Unx0zuJR),
    kqSIs4pqpW9yMT9k: Object.assign(kqSIs4pqpW9yMT9k, kqSIs4pqpW9yMT9k),
    qmZdjhQobzzHVCdS: Object.assign(qmZdjhQobzzHVCdS, qmZdjhQobzzHVCdS),
    PyM6Ox6f0ZPvtKtu: Object.assign(PyM6Ox6f0ZPvtKtu, PyM6Ox6f0ZPvtKtu),
    J5piRXOhA9BKX0sV: Object.assign(J5piRXOhA9BKX0sV, J5piRXOhA9BKX0sV),
    PW983VdiZYcMWrbv: Object.assign(PW983VdiZYcMWrbv, PW983VdiZYcMWrbv),
    iQU57kmfhf7cevID: Object.assign(iQU57kmfhf7cevID, iQU57kmfhf7cevID),
    wOgolkz3nn3ZNuxK: Object.assign(wOgolkz3nn3ZNuxK, wOgolkz3nn3ZNuxK),
}

export default generated