import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import pemeriksaanRalanC19e15 from './pemeriksaan-ralan'
import suratSehat47d9f7 from './surat-sehat'
import suratSakit4a9f0c from './surat-sakit'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:169
* @route '/rawat-jalan/lanjutan'
*/
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:169
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:169
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:169
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:220
* @route '/rawat-jalan/riwayat'
*/
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:220
* @route '/rawat-jalan/riwayat'
*/
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:220
* @route '/rawat-jalan/riwayat'
*/
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:220
* @route '/rawat-jalan/riwayat'
*/
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:251
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
export const riwayatPemeriksaan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatPemeriksaan.url(options),
    method: 'get',
})

riwayatPemeriksaan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/riwayat-pemeriksaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:251
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
riwayatPemeriksaan.url = (options?: RouteQueryOptions) => {
    return riwayatPemeriksaan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:251
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
riwayatPemeriksaan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatPemeriksaan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:251
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
riwayatPemeriksaan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayatPemeriksaan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:292
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const pemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

pemeriksaanRalan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:292
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:292
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:292
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::obatRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:447
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
export const obatRalan = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obatRalan.url(args, options),
    method: 'get',
})

obatRalan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/obat-ralan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::obatRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:447
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
obatRalan.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return obatRalan.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::obatRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:447
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
obatRalan.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obatRalan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::obatRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:447
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
obatRalan.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: obatRalan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lab
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:371
* @route '/rawat-jalan/lab/{no_rawat}'
*/
export const lab = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lab.url(args, options),
    method: 'get',
})

lab.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/lab/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lab
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:371
* @route '/rawat-jalan/lab/{no_rawat}'
*/
lab.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return lab.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lab
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:371
* @route '/rawat-jalan/lab/{no_rawat}'
*/
lab.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lab.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lab
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:371
* @route '/rawat-jalan/lab/{no_rawat}'
*/
lab.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lab.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::radiologi
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:438
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
export const radiologi = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: radiologi.url(args, options),
    method: 'get',
})

radiologi.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/radiologi/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::radiologi
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:438
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
radiologi.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return radiologi.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::radiologi
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:438
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
radiologi.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: radiologi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::radiologi
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:438
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
radiologi.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: radiologi.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::statistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan-statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::statistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::statistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::statistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:797
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
export const suratSehat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSehat.url(args, options),
    method: 'get',
})

suratSehat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:797
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return suratSehat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:797
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSehat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:797
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suratSehat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:848
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
export const suratSakit = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakit.url(args, options),
    method: 'get',
})

suratSakit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:848
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return suratSakit.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:848
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:848
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suratSakit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:21
* @route '/rawat-jalan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:21
* @route '/rawat-jalan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:21
* @route '/rawat-jalan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:21
* @route '/rawat-jalan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:94
* @route '/rawat-jalan/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:94
* @route '/rawat-jalan/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:94
* @route '/rawat-jalan/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:94
* @route '/rawat-jalan/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:596
* @route '/rawat-jalan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:596
* @route '/rawat-jalan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:596
* @route '/rawat-jalan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:664
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const show = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:664
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return show.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:664
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:664
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:675
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
export const edit = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:675
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return edit.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:675
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:675
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:751
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const update = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:751
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return update.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:751
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.put = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:751
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.patch = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:786
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const destroy = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:786
* @route '/rawat-jalan/{rawat_jalan}'
*/
destroy.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return destroy.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:786
* @route '/rawat-jalan/{rawat_jalan}'
*/
destroy.delete = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const rawatJalan = {
    lanjutan: Object.assign(lanjutan, lanjutan),
    riwayat: Object.assign(riwayat, riwayat),
    riwayatPemeriksaan: Object.assign(riwayatPemeriksaan, riwayatPemeriksaan),
    pemeriksaanRalan: Object.assign(pemeriksaanRalan, pemeriksaanRalanC19e15),
    obatRalan: Object.assign(obatRalan, obatRalan),
    lab: Object.assign(lab, lab),
    radiologi: Object.assign(radiologi, radiologi),
    statistics: Object.assign(statistics, statistics),
    suratSehat: Object.assign(suratSehat, suratSehat47d9f7),
    suratSakit: Object.assign(suratSakit, suratSakit4a9f0c),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default rawatJalan