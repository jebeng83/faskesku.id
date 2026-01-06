import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPasien
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
export const byPasien = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPasien.url(args, options),
    method: 'get',
})

byPasien.definition = {
    methods: ["get","head"],
    url: '/api/odontogram/pasien/{no_rkm_medis}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPasien
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
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
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPasien
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
byPasien.get = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPasien.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPasien
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
byPasien.head = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byPasien.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/odontogram/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
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
* @see \App\Http\Controllers\Odontogram\OdontogramController::byRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
byRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
byRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::kondisi
* @see app/Http/Controllers/Odontogram/OdontogramController.php:91
* @route '/api/odontogram/kondisi'
*/
export const kondisi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kondisi.url(options),
    method: 'get',
})

kondisi.definition = {
    methods: ["get","head"],
    url: '/api/odontogram/kondisi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::kondisi
* @see app/Http/Controllers/Odontogram/OdontogramController.php:91
* @route '/api/odontogram/kondisi'
*/
kondisi.url = (options?: RouteQueryOptions) => {
    return kondisi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::kondisi
* @see app/Http/Controllers/Odontogram/OdontogramController.php:91
* @route '/api/odontogram/kondisi'
*/
kondisi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kondisi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::kondisi
* @see app/Http/Controllers/Odontogram/OdontogramController.php:91
* @route '/api/odontogram/kondisi'
*/
kondisi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kondisi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
export const storeByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByRawat.url(args, options),
    method: 'post',
})

storeByRawat.definition = {
    methods: ["post"],
    url: '/api/odontogram/rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
storeByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByRawat
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
storeByRawat.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByRawat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
export const storeByMedis = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByMedis.url(args, options),
    method: 'post',
})

storeByMedis.definition = {
    methods: ["post"],
    url: '/api/odontogram/medis/{no_rkm_medis}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
storeByMedis.url = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeByMedis.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
storeByMedis.post = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByMedis.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
export const destroyByMedis = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyByMedis.url(args, options),
    method: 'delete',
})

destroyByMedis.definition = {
    methods: ["delete"],
    url: '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
destroyByMedis.url = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
            tanggal: args[1],
            elemen_gigi: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
        tanggal: args.tanggal,
        elemen_gigi: args.elemen_gigi,
    }

    return destroyByMedis.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace('{elemen_gigi}', parsedArgs.elemen_gigi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByMedis
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
destroyByMedis.delete = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyByMedis.url(args, options),
    method: 'delete',
})

const odontogram = {
    byPasien: Object.assign(byPasien, byPasien),
    byRawat: Object.assign(byRawat, byRawat),
    kondisi: Object.assign(kondisi, kondisi),
    storeByRawat: Object.assign(storeByRawat, storeByRawat),
    storeByMedis: Object.assign(storeByMedis, storeByMedis),
    destroyByMedis: Object.assign(destroyByMedis, destroyByMedis),
}

export default odontogram