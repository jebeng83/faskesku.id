import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:16
* @route '/akutansi/rekening'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:16
* @route '/akutansi/rekening'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:16
* @route '/akutansi/rekening'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:16
* @route '/akutansi/rekening'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:22
* @route '/api/akutansi/rekening'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:22
* @route '/api/akutansi/rekening'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:22
* @route '/api/akutansi/rekening'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:22
* @route '/api/akutansi/rekening'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::store
* @see app/Http/Controllers/Akutansi/RekeningController.php:51
* @route '/api/akutansi/rekening'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/rekening',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::store
* @see app/Http/Controllers/Akutansi/RekeningController.php:51
* @route '/api/akutansi/rekening'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::store
* @see app/Http/Controllers/Akutansi/RekeningController.php:51
* @route '/api/akutansi/rekening'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::update
* @see app/Http/Controllers/Akutansi/RekeningController.php:70
* @route '/api/akutansi/rekening/{kd_rek}'
*/
export const update = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/rekening/{kd_rek}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::update
* @see app/Http/Controllers/Akutansi/RekeningController.php:70
* @route '/api/akutansi/rekening/{kd_rek}'
*/
update.url = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_rek: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_rek: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_rek: args.kd_rek,
    }

    return update.definition.url
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::update
* @see app/Http/Controllers/Akutansi/RekeningController.php:70
* @route '/api/akutansi/rekening/{kd_rek}'
*/
update.put = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::destroy
* @see app/Http/Controllers/Akutansi/RekeningController.php:91
* @route '/api/akutansi/rekening/{kd_rek}'
*/
export const destroy = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/rekening/{kd_rek}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::destroy
* @see app/Http/Controllers/Akutansi/RekeningController.php:91
* @route '/api/akutansi/rekening/{kd_rek}'
*/
destroy.url = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_rek: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_rek: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_rek: args.kd_rek,
    }

    return destroy.definition.url
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::destroy
* @see app/Http/Controllers/Akutansi/RekeningController.php:91
* @route '/api/akutansi/rekening/{kd_rek}'
*/
destroy.delete = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const RekeningController = { page, index, store, update, destroy }

export default RekeningController