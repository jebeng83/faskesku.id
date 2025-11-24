import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:18
* @route '/api/akutansi/nota-jalan/{no_rawat}'
*/
export const show = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/nota-jalan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:18
* @route '/api/akutansi/nota-jalan/{no_rawat}'
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
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:18
* @route '/api/akutansi/nota-jalan/{no_rawat}'
*/
show.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:18
* @route '/api/akutansi/nota-jalan/{no_rawat}'
*/
show.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::store
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:44
* @route '/api/akutansi/nota-jalan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/nota-jalan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::store
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:44
* @route '/api/akutansi/nota-jalan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::store
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:44
* @route '/api/akutansi/nota-jalan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:89
* @route '/api/akutansi/nota-jalan/{no_rawat}'
*/
export const destroy = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/nota-jalan/{no_rawat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:89
* @route '/api/akutansi/nota-jalan/{no_rawat}'
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
* @see \App\Http\Controllers\Akutansi\NotaJalanController::destroy
* @see app/Http/Controllers/Akutansi/NotaJalanController.php:89
* @route '/api/akutansi/nota-jalan/{no_rawat}'
*/
destroy.delete = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const notaJalan = {
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default notaJalan