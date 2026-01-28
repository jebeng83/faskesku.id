import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TriaseUgdController::index
* @see app/Http/Controllers/TriaseUgdController.php:12
* @route '/triase-ugd'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/triase-ugd',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TriaseUgdController::index
* @see app/Http/Controllers/TriaseUgdController.php:12
* @route '/triase-ugd'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriaseUgdController::index
* @see app/Http/Controllers/TriaseUgdController.php:12
* @route '/triase-ugd'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::index
* @see app/Http/Controllers/TriaseUgdController.php:12
* @route '/triase-ugd'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::store
* @see app/Http/Controllers/TriaseUgdController.php:36
* @route '/triase-ugd'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/triase-ugd',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TriaseUgdController::store
* @see app/Http/Controllers/TriaseUgdController.php:36
* @route '/triase-ugd'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriaseUgdController::store
* @see app/Http/Controllers/TriaseUgdController.php:36
* @route '/triase-ugd'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::show
* @see app/Http/Controllers/TriaseUgdController.php:28
* @route '/triase-ugd/{no_rawat}'
*/
export const show = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/triase-ugd/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TriaseUgdController::show
* @see app/Http/Controllers/TriaseUgdController.php:28
* @route '/triase-ugd/{no_rawat}'
*/
show.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriaseUgdController::show
* @see app/Http/Controllers/TriaseUgdController.php:28
* @route '/triase-ugd/{no_rawat}'
*/
show.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::show
* @see app/Http/Controllers/TriaseUgdController.php:28
* @route '/triase-ugd/{no_rawat}'
*/
show.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::update
* @see app/Http/Controllers/TriaseUgdController.php:50
* @route '/triase-ugd/{no_rawat}'
*/
export const update = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/triase-ugd/{no_rawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TriaseUgdController::update
* @see app/Http/Controllers/TriaseUgdController.php:50
* @route '/triase-ugd/{no_rawat}'
*/
update.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriaseUgdController::update
* @see app/Http/Controllers/TriaseUgdController.php:50
* @route '/triase-ugd/{no_rawat}'
*/
update.put = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TriaseUgdController::destroy
* @see app/Http/Controllers/TriaseUgdController.php:68
* @route '/triase-ugd/{no_rawat}'
*/
export const destroy = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/triase-ugd/{no_rawat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TriaseUgdController::destroy
* @see app/Http/Controllers/TriaseUgdController.php:68
* @route '/triase-ugd/{no_rawat}'
*/
destroy.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriaseUgdController::destroy
* @see app/Http/Controllers/TriaseUgdController.php:68
* @route '/triase-ugd/{no_rawat}'
*/
destroy.delete = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TriaseUgdController = { index, store, show, update, destroy }

export default TriaseUgdController