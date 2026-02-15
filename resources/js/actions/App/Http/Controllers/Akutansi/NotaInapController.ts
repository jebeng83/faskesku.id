import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::exists
* @see app/Http/Controllers/Akutansi/NotaInapController.php:22
* @route '/api/akutansi/nota-inap/exists'
*/
export const exists = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exists.url(options),
    method: 'get',
})

exists.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/nota-inap/exists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::exists
* @see app/Http/Controllers/Akutansi/NotaInapController.php:22
* @route '/api/akutansi/nota-inap/exists'
*/
exists.url = (options?: RouteQueryOptions) => {
    return exists.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::exists
* @see app/Http/Controllers/Akutansi/NotaInapController.php:22
* @route '/api/akutansi/nota-inap/exists'
*/
exists.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exists.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::exists
* @see app/Http/Controllers/Akutansi/NotaInapController.php:22
* @route '/api/akutansi/nota-inap/exists'
*/
exists.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exists.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::store
* @see app/Http/Controllers/Akutansi/NotaInapController.php:34
* @route '/api/akutansi/nota-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/nota-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::store
* @see app/Http/Controllers/Akutansi/NotaInapController.php:34
* @route '/api/akutansi/nota-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::store
* @see app/Http/Controllers/Akutansi/NotaInapController.php:34
* @route '/api/akutansi/nota-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::snapshot
* @see app/Http/Controllers/Akutansi/NotaInapController.php:170
* @route '/api/akutansi/nota-inap/snapshot'
*/
export const snapshot = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snapshot.url(options),
    method: 'post',
})

snapshot.definition = {
    methods: ["post"],
    url: '/api/akutansi/nota-inap/snapshot',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::snapshot
* @see app/Http/Controllers/Akutansi/NotaInapController.php:170
* @route '/api/akutansi/nota-inap/snapshot'
*/
snapshot.url = (options?: RouteQueryOptions) => {
    return snapshot.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::snapshot
* @see app/Http/Controllers/Akutansi/NotaInapController.php:170
* @route '/api/akutansi/nota-inap/snapshot'
*/
snapshot.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snapshot.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::show
* @see app/Http/Controllers/Akutansi/NotaInapController.php:254
* @route '/api/akutansi/nota-inap/{no_rawat}'
*/
export const show = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/nota-inap/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::show
* @see app/Http/Controllers/Akutansi/NotaInapController.php:254
* @route '/api/akutansi/nota-inap/{no_rawat}'
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
* @see \App\Http\Controllers\Akutansi\NotaInapController::show
* @see app/Http/Controllers/Akutansi/NotaInapController.php:254
* @route '/api/akutansi/nota-inap/{no_rawat}'
*/
show.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::show
* @see app/Http/Controllers/Akutansi/NotaInapController.php:254
* @route '/api/akutansi/nota-inap/{no_rawat}'
*/
show.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/nota-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaInapController::page
* @see app/Http/Controllers/Akutansi/NotaInapController.php:15
* @route '/akutansi/nota-inap'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const NotaInapController = { exists, store, snapshot, show, page }

export default NotaInapController