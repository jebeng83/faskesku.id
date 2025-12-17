import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::index
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:19
 * @route '/api/akutansi/tagihan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/tagihan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::index
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:19
 * @route '/api/akutansi/tagihan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::index
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:19
 * @route '/api/akutansi/tagihan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::index
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:19
 * @route '/api/akutansi/tagihan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::show
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:67
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
export const show = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/tagihan/{no_nota}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::show
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:67
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
show.url = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_nota: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_nota: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_nota: args.no_nota,
                }

    return show.definition.url
            .replace('{no_nota}', parsedArgs.no_nota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::show
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:67
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
show.get = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::show
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:67
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
show.head = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::store
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:82
 * @route '/api/akutansi/tagihan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/tagihan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::store
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:82
 * @route '/api/akutansi/tagihan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::store
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:82
 * @route '/api/akutansi/tagihan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::update
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:157
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
export const update = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/tagihan/{no_nota}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::update
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:157
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
update.url = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_nota: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_nota: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_nota: args.no_nota,
                }

    return update.definition.url
            .replace('{no_nota}', parsedArgs.no_nota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::update
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:157
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
update.put = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::addPayment
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:191
 * @route '/api/akutansi/tagihan/{no_nota}/payment'
 */
export const addPayment = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPayment.url(args, options),
    method: 'post',
})

addPayment.definition = {
    methods: ["post"],
    url: '/api/akutansi/tagihan/{no_nota}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::addPayment
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:191
 * @route '/api/akutansi/tagihan/{no_nota}/payment'
 */
addPayment.url = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_nota: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_nota: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_nota: args.no_nota,
                }

    return addPayment.definition.url
            .replace('{no_nota}', parsedArgs.no_nota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::addPayment
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:191
 * @route '/api/akutansi/tagihan/{no_nota}/payment'
 */
addPayment.post = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPayment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::destroy
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:225
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
export const destroy = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/tagihan/{no_nota}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::destroy
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:225
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
destroy.url = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_nota: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_nota: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_nota: args.no_nota,
                }

    return destroy.definition.url
            .replace('{no_nota}', parsedArgs.no_nota.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\TagihanSadewaController::destroy
 * @see app/Http/Controllers/Akutansi/TagihanSadewaController.php:225
 * @route '/api/akutansi/tagihan/{no_nota}'
 */
destroy.delete = (args: { no_nota: string | number } | [no_nota: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const tagihan = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
store: Object.assign(store, store),
update: Object.assign(update, update),
addPayment: Object.assign(addPayment, addPayment),
destroy: Object.assign(destroy, destroy),
}

export default tagihan