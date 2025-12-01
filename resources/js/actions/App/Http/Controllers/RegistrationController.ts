import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration'
*/
const index016aa40327deb618c821eec07d8f4bf4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index016aa40327deb618c821eec07d8f4bf4.url(options),
    method: 'get',
})

index016aa40327deb618c821eec07d8f4bf4.definition = {
    methods: ["get","head"],
    url: '/registration',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration'
*/
index016aa40327deb618c821eec07d8f4bf4.url = (options?: RouteQueryOptions) => {
    return index016aa40327deb618c821eec07d8f4bf4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration'
*/
index016aa40327deb618c821eec07d8f4bf4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index016aa40327deb618c821eec07d8f4bf4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration'
*/
index016aa40327deb618c821eec07d8f4bf4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index016aa40327deb618c821eec07d8f4bf4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration/lanjutan'
*/
const index0d9a431ded397ff676b7690b4935855e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d9a431ded397ff676b7690b4935855e.url(options),
    method: 'get',
})

index0d9a431ded397ff676b7690b4935855e.definition = {
    methods: ["get","head"],
    url: '/registration/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration/lanjutan'
*/
index0d9a431ded397ff676b7690b4935855e.url = (options?: RouteQueryOptions) => {
    return index0d9a431ded397ff676b7690b4935855e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration/lanjutan'
*/
index0d9a431ded397ff676b7690b4935855e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d9a431ded397ff676b7690b4935855e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:22
* @route '/registration/lanjutan'
*/
index0d9a431ded397ff676b7690b4935855e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0d9a431ded397ff676b7690b4935855e.url(options),
    method: 'head',
})

export const index = {
    '/registration': index016aa40327deb618c821eec07d8f4bf4,
    '/registration/lanjutan': index0d9a431ded397ff676b7690b4935855e,
}

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:46
* @route '/registration/search-patients'
*/
export const searchPatients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPatients.url(options),
    method: 'get',
})

searchPatients.definition = {
    methods: ["get","head"],
    url: '/registration/search-patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:46
* @route '/registration/search-patients'
*/
searchPatients.url = (options?: RouteQueryOptions) => {
    return searchPatients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:46
* @route '/registration/search-patients'
*/
searchPatients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPatients.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:46
* @route '/registration/search-patients'
*/
searchPatients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPatients.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::registerPatient
* @see app/Http/Controllers/RegistrationController.php:67
* @route '/registration/{patient}/register'
*/
export const registerPatient = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerPatient.url(args, options),
    method: 'post',
})

registerPatient.definition = {
    methods: ["post"],
    url: '/registration/{patient}/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegistrationController::registerPatient
* @see app/Http/Controllers/RegistrationController.php:67
* @route '/registration/{patient}/register'
*/
registerPatient.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }

    return registerPatient.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::registerPatient
* @see app/Http/Controllers/RegistrationController.php:67
* @route '/registration/{patient}/register'
*/
registerPatient.post = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerPatient.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegistrationController::checkPatientPoliStatus
* @see app/Http/Controllers/RegistrationController.php:147
* @route '/registration/{patient}/check-poli-status'
*/
export const checkPatientPoliStatus = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPatientPoliStatus.url(args, options),
    method: 'get',
})

checkPatientPoliStatus.definition = {
    methods: ["get","head"],
    url: '/registration/{patient}/check-poli-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::checkPatientPoliStatus
* @see app/Http/Controllers/RegistrationController.php:147
* @route '/registration/{patient}/check-poli-status'
*/
checkPatientPoliStatus.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }

    return checkPatientPoliStatus.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::checkPatientPoliStatus
* @see app/Http/Controllers/RegistrationController.php:147
* @route '/registration/{patient}/check-poli-status'
*/
checkPatientPoliStatus.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPatientPoliStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::checkPatientPoliStatus
* @see app/Http/Controllers/RegistrationController.php:147
* @route '/registration/{patient}/check-poli-status'
*/
checkPatientPoliStatus.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkPatientPoliStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:190
* @route '/registration/get-registrations'
*/
export const getRegistrations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegistrations.url(options),
    method: 'get',
})

getRegistrations.definition = {
    methods: ["get","head"],
    url: '/registration/get-registrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:190
* @route '/registration/get-registrations'
*/
getRegistrations.url = (options?: RouteQueryOptions) => {
    return getRegistrations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:190
* @route '/registration/get-registrations'
*/
getRegistrations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegistrations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:190
* @route '/registration/get-registrations'
*/
getRegistrations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRegistrations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::poliMonthlyStats
* @see app/Http/Controllers/RegistrationController.php:321
* @route '/registration/poli-monthly-stats'
*/
export const poliMonthlyStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poliMonthlyStats.url(options),
    method: 'get',
})

poliMonthlyStats.definition = {
    methods: ["get","head"],
    url: '/registration/poli-monthly-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::poliMonthlyStats
* @see app/Http/Controllers/RegistrationController.php:321
* @route '/registration/poli-monthly-stats'
*/
poliMonthlyStats.url = (options?: RouteQueryOptions) => {
    return poliMonthlyStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::poliMonthlyStats
* @see app/Http/Controllers/RegistrationController.php:321
* @route '/registration/poli-monthly-stats'
*/
poliMonthlyStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poliMonthlyStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::poliMonthlyStats
* @see app/Http/Controllers/RegistrationController.php:321
* @route '/registration/poli-monthly-stats'
*/
poliMonthlyStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poliMonthlyStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::cancelRegistration
* @see app/Http/Controllers/RegistrationController.php:275
* @route '/registration/cancel'
*/
export const cancelRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelRegistration.url(options),
    method: 'post',
})

cancelRegistration.definition = {
    methods: ["post"],
    url: '/registration/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegistrationController::cancelRegistration
* @see app/Http/Controllers/RegistrationController.php:275
* @route '/registration/cancel'
*/
cancelRegistration.url = (options?: RouteQueryOptions) => {
    return cancelRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::cancelRegistration
* @see app/Http/Controllers/RegistrationController.php:275
* @route '/registration/cancel'
*/
cancelRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegistrationController::print
* @see app/Http/Controllers/RegistrationController.php:385
* @route '/registration/{no_rawat}/print'
*/
export const print = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/registration/{no_rawat}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::print
* @see app/Http/Controllers/RegistrationController.php:385
* @route '/registration/{no_rawat}/print'
*/
print.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return print.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::print
* @see app/Http/Controllers/RegistrationController.php:385
* @route '/registration/{no_rawat}/print'
*/
print.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::print
* @see app/Http/Controllers/RegistrationController.php:385
* @route '/registration/{no_rawat}/print'
*/
print.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

const RegistrationController = { index, searchPatients, registerPatient, checkPatientPoliStatus, getRegistrations, poliMonthlyStats, cancelRegistration, print }

export default RegistrationController