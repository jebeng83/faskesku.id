import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::exists
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:34
 * @route '/api/akutansi/nota-jalan/exists'
 */
export const exists = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exists.url(options),
    method: 'get',
})

exists.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/nota-jalan/exists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::exists
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:34
 * @route '/api/akutansi/nota-jalan/exists'
 */
exists.url = (options?: RouteQueryOptions) => {
    return exists.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::exists
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:34
 * @route '/api/akutansi/nota-jalan/exists'
 */
exists.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exists.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::exists
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:34
 * @route '/api/akutansi/nota-jalan/exists'
 */
exists.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exists.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::store
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:51
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
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:51
 * @route '/api/akutansi/nota-jalan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::store
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:51
 * @route '/api/akutansi/nota-jalan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::snapshot
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:441
 * @route '/api/akutansi/nota-jalan/snapshot'
 */
export const snapshot = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snapshot.url(options),
    method: 'post',
})

snapshot.definition = {
    methods: ["post"],
    url: '/api/akutansi/nota-jalan/snapshot',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::snapshot
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:441
 * @route '/api/akutansi/nota-jalan/snapshot'
 */
snapshot.url = (options?: RouteQueryOptions) => {
    return snapshot.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::snapshot
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:441
 * @route '/api/akutansi/nota-jalan/snapshot'
 */
snapshot.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snapshot.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::pdf
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:820
 * @route '/api/akutansi/nota-jalan/{no_rawat}/pdf'
 */
export const pdf = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/nota-jalan/{no_rawat}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::pdf
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:820
 * @route '/api/akutansi/nota-jalan/{no_rawat}/pdf'
 */
pdf.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdf.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::pdf
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:820
 * @route '/api/akutansi/nota-jalan/{no_rawat}/pdf'
 */
pdf.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::pdf
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:820
 * @route '/api/akutansi/nota-jalan/{no_rawat}/pdf'
 */
pdf.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:661
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
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:661
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
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:661
 * @route '/api/akutansi/nota-jalan/{no_rawat}'
 */
show.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::show
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:661
 * @route '/api/akutansi/nota-jalan/{no_rawat}'
 */
show.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\NotaJalanController::destroy
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:0
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
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:0
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
 * @see app/Http/Controllers/Akutansi/NotaJalanController.php:0
 * @route '/api/akutansi/nota-jalan/{no_rawat}'
 */
destroy.delete = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const notaJalan = {
    exists: Object.assign(exists, exists),
store: Object.assign(store, store),
snapshot: Object.assign(snapshot, snapshot),
pdf: Object.assign(pdf, pdf),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default notaJalan