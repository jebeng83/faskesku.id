import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
export const byPatient = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPatient.url(args, options),
    method: 'get',
})

byPatient.definition = {
    methods: ["get","head"],
    url: '/api/odontogram/pasien/{no_rkm_medis}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
byPatient.url = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byPatient.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
byPatient.get = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPatient.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:14
* @route '/api/odontogram/pasien/{no_rkm_medis}'
*/
byPatient.head = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byPatient.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
export const byVisit = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byVisit.url(args, options),
    method: 'get',
})

byVisit.definition = {
    methods: ["get","head"],
    url: '/api/odontogram/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
byVisit.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byVisit.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
byVisit.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byVisit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::byVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:53
* @route '/api/odontogram/rawat/{no_rawat}'
*/
byVisit.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byVisit.url(args, options),
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
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
export const storeByVisit = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByVisit.url(args, options),
    method: 'post',
})

storeByVisit.definition = {
    methods: ["post"],
    url: '/api/odontogram/rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
storeByVisit.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeByVisit.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByVisit
* @see app/Http/Controllers/Odontogram/OdontogramController.php:101
* @route '/api/odontogram/rawat/{no_rawat}'
*/
storeByVisit.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByVisit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
export const storeByPatient = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByPatient.url(args, options),
    method: 'post',
})

storeByPatient.definition = {
    methods: ["post"],
    url: '/api/odontogram/medis/{no_rkm_medis}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
storeByPatient.url = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeByPatient.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::storeByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:165
* @route '/api/odontogram/medis/{no_rkm_medis}'
*/
storeByPatient.post = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeByPatient.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
export const destroyByPatient = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyByPatient.url(args, options),
    method: 'delete',
})

destroyByPatient.definition = {
    methods: ["delete"],
    url: '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
destroyByPatient.url = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions) => {
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

    return destroyByPatient.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace('{elemen_gigi}', parsedArgs.elemen_gigi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Odontogram\OdontogramController::destroyByPatient
* @see app/Http/Controllers/Odontogram/OdontogramController.php:236
* @route '/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}'
*/
destroyByPatient.delete = (args: { no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number } | [no_rkm_medis: string | number, tanggal: string | number, elemen_gigi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyByPatient.url(args, options),
    method: 'delete',
})

const OdontogramController = { byPatient, byVisit, kondisi, storeByVisit, storeByPatient, destroyByPatient }

export default OdontogramController