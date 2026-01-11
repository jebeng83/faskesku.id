import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::index
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:18
* @route '/api/akutansi/closing-kasir'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/closing-kasir',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::index
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:18
* @route '/api/akutansi/closing-kasir'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::index
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:18
* @route '/api/akutansi/closing-kasir'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::index
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:18
* @route '/api/akutansi/closing-kasir'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::store
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:42
* @route '/api/akutansi/closing-kasir'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/closing-kasir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::store
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:42
* @route '/api/akutansi/closing-kasir'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::store
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:42
* @route '/api/akutansi/closing-kasir'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::update
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:63
* @route '/api/akutansi/closing-kasir/{shift}'
*/
export const update = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/closing-kasir/{shift}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::update
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:63
* @route '/api/akutansi/closing-kasir/{shift}'
*/
update.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: args.shift,
    }

    return update.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::update
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:63
* @route '/api/akutansi/closing-kasir/{shift}'
*/
update.put = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::destroy
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:105
* @route '/api/akutansi/closing-kasir/{shift}'
*/
export const destroy = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/closing-kasir/{shift}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::destroy
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:105
* @route '/api/akutansi/closing-kasir/{shift}'
*/
destroy.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: args.shift,
    }

    return destroy.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\ClosingKasirController::destroy
* @see app/Http/Controllers/Akutansi/ClosingKasirController.php:105
* @route '/api/akutansi/closing-kasir/{shift}'
*/
destroy.delete = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ClosingKasirController = { index, store, update, destroy }

export default ClosingKasirController