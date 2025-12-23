import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:18
 * @route '/akutansi/billing'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:18
 * @route '/akutansi/billing'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:18
 * @route '/akutansi/billing'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::page
 * @see app/Http/Controllers/Akutansi/BillingController.php:18
 * @route '/akutansi/billing'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::ranapPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
export const ranapPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranapPage.url(options),
    method: 'get',
})

ranapPage.definition = {
    methods: ["get","head"],
    url: '/akutansi/billing-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::ranapPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
ranapPage.url = (options?: RouteQueryOptions) => {
    return ranapPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::ranapPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
ranapPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranapPage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::ranapPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:39
 * @route '/akutansi/billing-ranap'
 */
ranapPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ranapPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::kasirRalanPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:34
 * @route '/akutansi/kasir-ralan'
 */
export const kasirRalanPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasirRalanPage.url(options),
    method: 'get',
})

kasirRalanPage.definition = {
    methods: ["get","head"],
    url: '/akutansi/kasir-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::kasirRalanPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:34
 * @route '/akutansi/kasir-ralan'
 */
kasirRalanPage.url = (options?: RouteQueryOptions) => {
    return kasirRalanPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::kasirRalanPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:34
 * @route '/akutansi/kasir-ralan'
 */
kasirRalanPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasirRalanPage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::kasirRalanPage
 * @see app/Http/Controllers/Akutansi/BillingController.php:34
 * @route '/akutansi/kasir-ralan'
 */
kasirRalanPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kasirRalanPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
 * @see app/Http/Controllers/Akutansi/BillingController.php:56
 * @route '/api/akutansi/billing'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
 * @see app/Http/Controllers/Akutansi/BillingController.php:56
 * @route '/api/akutansi/billing'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
 * @see app/Http/Controllers/Akutansi/BillingController.php:56
 * @route '/api/akutansi/billing'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::index
 * @see app/Http/Controllers/Akutansi/BillingController.php:56
 * @route '/api/akutansi/billing'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::indexRanap
 * @see app/Http/Controllers/Akutansi/BillingController.php:553
 * @route '/api/akutansi/billing-ranap'
 */
export const indexRanap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexRanap.url(options),
    method: 'get',
})

indexRanap.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/billing-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::indexRanap
 * @see app/Http/Controllers/Akutansi/BillingController.php:553
 * @route '/api/akutansi/billing-ranap'
 */
indexRanap.url = (options?: RouteQueryOptions) => {
    return indexRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::indexRanap
 * @see app/Http/Controllers/Akutansi/BillingController.php:553
 * @route '/api/akutansi/billing-ranap'
 */
indexRanap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexRanap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BillingController::indexRanap
 * @see app/Http/Controllers/Akutansi/BillingController.php:553
 * @route '/api/akutansi/billing-ranap'
 */
indexRanap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexRanap.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::store
 * @see app/Http/Controllers/Akutansi/BillingController.php:1026
 * @route '/api/akutansi/billing'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/billing',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::store
 * @see app/Http/Controllers/Akutansi/BillingController.php:1026
 * @route '/api/akutansi/billing'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::store
 * @see app/Http/Controllers/Akutansi/BillingController.php:1026
 * @route '/api/akutansi/billing'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::update
 * @see app/Http/Controllers/Akutansi/BillingController.php:1080
 * @route '/api/akutansi/billing/{noindex}'
 */
export const update = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/billing/{noindex}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::update
 * @see app/Http/Controllers/Akutansi/BillingController.php:1080
 * @route '/api/akutansi/billing/{noindex}'
 */
update.url = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noindex: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noindex: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noindex: args.noindex,
                }

    return update.definition.url
            .replace('{noindex}', parsedArgs.noindex.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::update
 * @see app/Http/Controllers/Akutansi/BillingController.php:1080
 * @route '/api/akutansi/billing/{noindex}'
 */
update.put = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\BillingController::destroy
 * @see app/Http/Controllers/Akutansi/BillingController.php:1126
 * @route '/api/akutansi/billing/{noindex}'
 */
export const destroy = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/billing/{noindex}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\BillingController::destroy
 * @see app/Http/Controllers/Akutansi/BillingController.php:1126
 * @route '/api/akutansi/billing/{noindex}'
 */
destroy.url = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noindex: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noindex: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noindex: args.noindex,
                }

    return destroy.definition.url
            .replace('{noindex}', parsedArgs.noindex.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BillingController::destroy
 * @see app/Http/Controllers/Akutansi/BillingController.php:1126
 * @route '/api/akutansi/billing/{noindex}'
 */
destroy.delete = (args: { noindex: string | number } | [noindex: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const BillingController = { page, ranapPage, kasirRalanPage, index, indexRanap, store, update, destroy }

export default BillingController