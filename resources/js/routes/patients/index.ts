import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::index
* @see app/Http/Controllers/PatientController.php:15
* @route '/patients'
*/
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
* @see app/Http/Controllers/PatientController.php:15
* @route '/patients'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::index
* @see app/Http/Controllers/PatientController.php:15
* @route '/patients'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PatientController::index
* @see app/Http/Controllers/PatientController.php:15
* @route '/patients'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::create
* @see app/Http/Controllers/PatientController.php:38
* @route '/patients/create'
*/
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
* @see app/Http/Controllers/PatientController.php:38
* @route '/patients/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::create
* @see app/Http/Controllers/PatientController.php:38
* @route '/patients/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PatientController::create
* @see app/Http/Controllers/PatientController.php:38
* @route '/patients/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::store
* @see app/Http/Controllers/PatientController.php:46
* @route '/patients'
*/
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
* @see app/Http/Controllers/PatientController.php:46
* @route '/patients'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::store
* @see app/Http/Controllers/PatientController.php:46
* @route '/patients'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PatientController::show
* @see app/Http/Controllers/PatientController.php:108
* @route '/patients/{patient}'
*/
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
* @see app/Http/Controllers/PatientController.php:108
* @route '/patients/{patient}'
*/
show.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::show
* @see app/Http/Controllers/PatientController.php:108
* @route '/patients/{patient}'
*/
show.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PatientController::show
* @see app/Http/Controllers/PatientController.php:108
* @route '/patients/{patient}'
*/
show.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::edit
* @see app/Http/Controllers/PatientController.php:118
* @route '/patients/{patient}/edit'
*/
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
* @see app/Http/Controllers/PatientController.php:118
* @route '/patients/{patient}/edit'
*/
edit.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::edit
* @see app/Http/Controllers/PatientController.php:118
* @route '/patients/{patient}/edit'
*/
edit.get = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PatientController::edit
* @see app/Http/Controllers/PatientController.php:118
* @route '/patients/{patient}/edit'
*/
edit.head = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::update
* @see app/Http/Controllers/PatientController.php:128
* @route '/patients/{patient}'
*/
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
* @see app/Http/Controllers/PatientController.php:128
* @route '/patients/{patient}'
*/
update.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::update
* @see app/Http/Controllers/PatientController.php:128
* @route '/patients/{patient}'
*/
update.put = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PatientController::update
* @see app/Http/Controllers/PatientController.php:128
* @route '/patients/{patient}'
*/
update.patch = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PatientController::destroy
* @see app/Http/Controllers/PatientController.php:177
* @route '/patients/{patient}'
*/
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
* @see app/Http/Controllers/PatientController.php:177
* @route '/patients/{patient}'
*/
destroy.url = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::destroy
* @see app/Http/Controllers/PatientController.php:177
* @route '/patients/{patient}'
*/
destroy.delete = (args: { patient: string | { no_rkm_medis: string } } | [patient: string | { no_rkm_medis: string } ] | string | { no_rkm_medis: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const patients = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default patients