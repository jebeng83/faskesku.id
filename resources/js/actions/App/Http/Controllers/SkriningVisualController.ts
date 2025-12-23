import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SkriningVisualController::index
* @see app/Http/Controllers/SkriningVisualController.php:12
* @route '/skrining-visual'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/skrining-visual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SkriningVisualController::index
* @see app/Http/Controllers/SkriningVisualController.php:12
* @route '/skrining-visual'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SkriningVisualController::index
* @see app/Http/Controllers/SkriningVisualController.php:12
* @route '/skrining-visual'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::index
* @see app/Http/Controllers/SkriningVisualController.php:12
* @route '/skrining-visual'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::store
* @see app/Http/Controllers/SkriningVisualController.php:37
* @route '/skrining-visual'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/skrining-visual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SkriningVisualController::store
* @see app/Http/Controllers/SkriningVisualController.php:37
* @route '/skrining-visual'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SkriningVisualController::store
* @see app/Http/Controllers/SkriningVisualController.php:37
* @route '/skrining-visual'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::show
* @see app/Http/Controllers/SkriningVisualController.php:28
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
export const show = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/skrining-visual/{no_rkm_medis}/{tanggal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SkriningVisualController::show
* @see app/Http/Controllers/SkriningVisualController.php:28
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
show.url = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
            tanggal: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
        tanggal: args.tanggal,
    }

    return show.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SkriningVisualController::show
* @see app/Http/Controllers/SkriningVisualController.php:28
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
show.get = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::show
* @see app/Http/Controllers/SkriningVisualController.php:28
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
show.head = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::update
* @see app/Http/Controllers/SkriningVisualController.php:48
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
export const update = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/skrining-visual/{no_rkm_medis}/{tanggal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SkriningVisualController::update
* @see app/Http/Controllers/SkriningVisualController.php:48
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
update.url = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
            tanggal: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
        tanggal: args.tanggal,
    }

    return update.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SkriningVisualController::update
* @see app/Http/Controllers/SkriningVisualController.php:48
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
update.put = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SkriningVisualController::destroy
* @see app/Http/Controllers/SkriningVisualController.php:65
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
export const destroy = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/skrining-visual/{no_rkm_medis}/{tanggal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SkriningVisualController::destroy
* @see app/Http/Controllers/SkriningVisualController.php:65
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
destroy.url = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
            tanggal: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
        tanggal: args.tanggal,
    }

    return destroy.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SkriningVisualController::destroy
* @see app/Http/Controllers/SkriningVisualController.php:65
* @route '/skrining-visual/{no_rkm_medis}/{tanggal}'
*/
destroy.delete = (args: { no_rkm_medis: string | number, tanggal: string | number } | [no_rkm_medis: string | number, tanggal: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SkriningVisualController = { index, store, show, update, destroy }

export default SkriningVisualController