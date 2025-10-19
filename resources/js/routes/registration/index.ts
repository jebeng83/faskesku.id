import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:20
* @route '/registration'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/registration',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:20
* @route '/registration'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:20
* @route '/registration'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::index
* @see app/Http/Controllers/RegistrationController.php:20
* @route '/registration'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:44
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
* @see app/Http/Controllers/RegistrationController.php:44
* @route '/registration/search-patients'
*/
searchPatients.url = (options?: RouteQueryOptions) => {
    return searchPatients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:44
* @route '/registration/search-patients'
*/
searchPatients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPatients.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::searchPatients
* @see app/Http/Controllers/RegistrationController.php:44
* @route '/registration/search-patients'
*/
searchPatients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPatients.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::registerPatient
* @see app/Http/Controllers/RegistrationController.php:65
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
* @see app/Http/Controllers/RegistrationController.php:65
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
* @see app/Http/Controllers/RegistrationController.php:65
* @route '/registration/{patient}/register'
*/
registerPatient.post = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerPatient.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegistrationController::checkPoliStatus
* @see app/Http/Controllers/RegistrationController.php:136
* @route '/registration/{patient}/check-poli-status'
*/
export const checkPoliStatus = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'get',
})

checkPoliStatus.definition = {
    methods: ["get","head"],
    url: '/registration/{patient}/check-poli-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistrationController::checkPoliStatus
* @see app/Http/Controllers/RegistrationController.php:136
* @route '/registration/{patient}/check-poli-status'
*/
checkPoliStatus.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
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

    return checkPoliStatus.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::checkPoliStatus
* @see app/Http/Controllers/RegistrationController.php:136
* @route '/registration/{patient}/check-poli-status'
*/
checkPoliStatus.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::checkPoliStatus
* @see app/Http/Controllers/RegistrationController.php:136
* @route '/registration/{patient}/check-poli-status'
*/
checkPoliStatus.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:179
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
* @see app/Http/Controllers/RegistrationController.php:179
* @route '/registration/get-registrations'
*/
getRegistrations.url = (options?: RouteQueryOptions) => {
    return getRegistrations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:179
* @route '/registration/get-registrations'
*/
getRegistrations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegistrations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegistrationController::getRegistrations
* @see app/Http/Controllers/RegistrationController.php:179
* @route '/registration/get-registrations'
*/
getRegistrations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRegistrations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegistrationController::cancel
* @see app/Http/Controllers/RegistrationController.php:236
* @route '/registration/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/registration/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegistrationController::cancel
* @see app/Http/Controllers/RegistrationController.php:236
* @route '/registration/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistrationController::cancel
* @see app/Http/Controllers/RegistrationController.php:236
* @route '/registration/cancel'
*/
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

const registration = {
    index: Object.assign(index, index),
    searchPatients: Object.assign(searchPatients, searchPatients),
    registerPatient: Object.assign(registerPatient, registerPatient),
    checkPoliStatus: Object.assign(checkPoliStatus, checkPoliStatus),
    getRegistrations: Object.assign(getRegistrations, getRegistrations),
    cancel: Object.assign(cancel, cancel),
}

export default registration