import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::index
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:22
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:20
 * @route '/patients'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::index
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:22
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:20
 * @route '/patients'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::index
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:22
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:20
 * @route '/patients'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::index
* @see app/Http/Controllers/PatientController.php:22
* @route '/patients'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::index
 * @see app/Http/Controllers/PatientController.php:20
 * @route '/patients'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::create
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:52
* @route '/patients/create'
*/
=======
 * @see app/Http/Controllers/PatientController.php:50
 * @route '/patients/create'
 */
>>>>>>> kohsun
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/patients/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::create
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:52
* @route '/patients/create'
*/
=======
 * @see app/Http/Controllers/PatientController.php:50
 * @route '/patients/create'
 */
>>>>>>> kohsun
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::create
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:52
* @route '/patients/create'
*/
=======
 * @see app/Http/Controllers/PatientController.php:50
 * @route '/patients/create'
 */
>>>>>>> kohsun
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::create
* @see app/Http/Controllers/PatientController.php:52
* @route '/patients/create'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::create
 * @see app/Http/Controllers/PatientController.php:50
 * @route '/patients/create'
 */
>>>>>>> kohsun
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::store
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:60
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:58
 * @route '/patients'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/patients',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::store
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:60
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:58
 * @route '/patients'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::store
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:60
* @route '/patients'
*/
=======
 * @see app/Http/Controllers/PatientController.php:58
 * @route '/patients'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PatientController::show
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:152
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:128
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
export const show = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/patients/{patient}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::show
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:152
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:128
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
show.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::show
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:152
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:128
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
show.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::show
* @see app/Http/Controllers/PatientController.php:152
* @route '/patients/{patient}'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::show
 * @see app/Http/Controllers/PatientController.php:128
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
show.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:162
* @route '/patients/{patient}/edit'
*/
=======
 * @see app/Http/Controllers/PatientController.php:138
 * @route '/patients/{patient}/edit'
 */
>>>>>>> kohsun
export const edit = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/patients/{patient}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:162
* @route '/patients/{patient}/edit'
*/
=======
 * @see app/Http/Controllers/PatientController.php:138
 * @route '/patients/{patient}/edit'
 */
>>>>>>> kohsun
edit.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return edit.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:162
* @route '/patients/{patient}/edit'
*/
=======
 * @see app/Http/Controllers/PatientController.php:138
 * @route '/patients/{patient}/edit'
 */
>>>>>>> kohsun
edit.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::edit
* @see app/Http/Controllers/PatientController.php:162
* @route '/patients/{patient}/edit'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:138
 * @route '/patients/{patient}/edit'
 */
>>>>>>> kohsun
edit.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::update
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:172
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:148
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
export const update = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/patients/{patient}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PatientController::update
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:172
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:148
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
update.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::update
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:172
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:148
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
update.put = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::update
* @see app/Http/Controllers/PatientController.php:172
* @route '/patients/{patient}'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:148
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
update.patch = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PatientController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:226
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:195
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
export const destroy = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/patients/{patient}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PatientController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:226
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:195
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
destroy.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:226
* @route '/patients/{patient}'
*/
=======
 * @see app/Http/Controllers/PatientController.php:195
 * @route '/patients/{patient}'
 */
>>>>>>> kohsun
destroy.delete = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PatientController::registerPeriksa
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:237
* @route '/patients/{patient}/register-periksa'
*/
=======
 * @see app/Http/Controllers/PatientController.php:206
 * @route '/patients/{patient}/register-periksa'
 */
>>>>>>> kohsun
export const registerPeriksa = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerPeriksa.url(args, options),
    method: 'post',
})

registerPeriksa.definition = {
    methods: ["post"],
    url: '/patients/{patient}/register-periksa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::registerPeriksa
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:237
* @route '/patients/{patient}/register-periksa'
*/
=======
 * @see app/Http/Controllers/PatientController.php:206
 * @route '/patients/{patient}/register-periksa'
 */
>>>>>>> kohsun
registerPeriksa.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return registerPeriksa.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::registerPeriksa
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:237
* @route '/patients/{patient}/register-periksa'
*/
=======
 * @see app/Http/Controllers/PatientController.php:206
 * @route '/patients/{patient}/register-periksa'
 */
>>>>>>> kohsun
registerPeriksa.post = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerPeriksa.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PatientController::checkPoliStatus
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:304
* @route '/patients/{patient}/check-poli-status'
*/
=======
 * @see app/Http/Controllers/PatientController.php:271
 * @route '/patients/{patient}/check-poli-status'
 */
>>>>>>> kohsun
export const checkPoliStatus = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'get',
})

checkPoliStatus.definition = {
    methods: ["get","head"],
    url: '/patients/{patient}/check-poli-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::checkPoliStatus
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:304
* @route '/patients/{patient}/check-poli-status'
*/
=======
 * @see app/Http/Controllers/PatientController.php:271
 * @route '/patients/{patient}/check-poli-status'
 */
>>>>>>> kohsun
checkPoliStatus.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
        args = { patient: args.no_rkm_medis }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rkm_medis' in args) {
            args = { patient: args.no_rkm_medis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        patient: typeof args.patient === 'object'
        ? args.patient.no_rkm_medis
        : args.patient,
    }
=======
                        patient: typeof args.patient === 'object'
                ? args.patient.no_rkm_medis
                : args.patient,
                }
>>>>>>> kohsun

    return checkPoliStatus.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::checkPoliStatus
<<<<<<< HEAD
* @see app/Http/Controllers/PatientController.php:304
* @route '/patients/{patient}/check-poli-status'
*/
=======
 * @see app/Http/Controllers/PatientController.php:271
 * @route '/patients/{patient}/check-poli-status'
 */
>>>>>>> kohsun
checkPoliStatus.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\PatientController::checkPoliStatus
* @see app/Http/Controllers/PatientController.php:304
* @route '/patients/{patient}/check-poli-status'
*/
=======
/**
* @see \App\Http\Controllers\PatientController::checkPoliStatus
 * @see app/Http/Controllers/PatientController.php:271
 * @route '/patients/{patient}/check-poli-status'
 */
>>>>>>> kohsun
checkPoliStatus.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkPoliStatus.url(args, options),
    method: 'head',
})
<<<<<<< HEAD

const patients = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    registerPeriksa: Object.assign(registerPeriksa, registerPeriksa),
    checkPoliStatus: Object.assign(checkPoliStatus, checkPoliStatus),
=======
const patients = {
    index,
create,
store,
show,
edit,
update,
destroy,
registerPeriksa,
checkPoliStatus,
>>>>>>> kohsun
}

export default patients