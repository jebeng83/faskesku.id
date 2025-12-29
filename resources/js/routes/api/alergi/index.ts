import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import pasien from './pasien'
import jenis from './jenis'
/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:13
* @route '/api/alergi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:13
* @route '/api/alergi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:13
* @route '/api/alergi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:13
* @route '/api/alergi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:41
* @route '/api/alergi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/alergi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:41
* @route '/api/alergi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:41
* @route '/api/alergi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::nextCode
* @see app/Http/Controllers/Alergi/AlergiController.php:163
* @route '/api/alergi/next-code'
*/
export const nextCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

nextCode.definition = {
    methods: ["get","head"],
    url: '/api/alergi/next-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::nextCode
* @see app/Http/Controllers/Alergi/AlergiController.php:163
* @route '/api/alergi/next-code'
*/
nextCode.url = (options?: RouteQueryOptions) => {
    return nextCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::nextCode
* @see app/Http/Controllers/Alergi/AlergiController.php:163
* @route '/api/alergi/next-code'
*/
nextCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextCode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::nextCode
* @see app/Http/Controllers/Alergi/AlergiController.php:163
* @route '/api/alergi/next-code'
*/
nextCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextCode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:63
* @route '/api/alergi/{kd_alergi}'
*/
export const update = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/alergi/{kd_alergi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:63
* @route '/api/alergi/{kd_alergi}'
*/
update.url = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_alergi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_alergi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_alergi: args.kd_alergi,
    }

    return update.definition.url
            .replace('{kd_alergi}', parsedArgs.kd_alergi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:63
* @route '/api/alergi/{kd_alergi}'
*/
update.put = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:86
* @route '/api/alergi/{kd_alergi}'
*/
export const destroy = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/alergi/{kd_alergi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:86
* @route '/api/alergi/{kd_alergi}'
*/
destroy.url = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_alergi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_alergi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_alergi: args.kd_alergi,
    }

    return destroy.definition.url
            .replace('{kd_alergi}', parsedArgs.kd_alergi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:86
* @route '/api/alergi/{kd_alergi}'
*/
destroy.delete = (args: { kd_alergi: string | number } | [kd_alergi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const alergi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    nextCode: Object.assign(nextCode, nextCode),
    pasien: Object.assign(pasien, pasien),
    jenis: Object.assign(jenis, jenis),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default alergi