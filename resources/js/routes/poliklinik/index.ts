import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:76
* @route '/poliklinik'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/poliklinik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:76
* @route '/poliklinik'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:76
* @route '/poliklinik'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:102
* @route '/poliklinik/{kd_poli}'
*/
export const update = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/poliklinik/{kd_poli}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:102
* @route '/poliklinik/{kd_poli}'
*/
update.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return update.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:102
* @route '/poliklinik/{kd_poli}'
*/
update.put = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PoliklinikController::destroy
* @see app/Http/Controllers/PoliklinikController.php:174
* @route '/poliklinik/{kd_poli}'
*/
export const destroy = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/poliklinik/{kd_poli}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PoliklinikController::destroy
* @see app/Http/Controllers/PoliklinikController.php:174
* @route '/poliklinik/{kd_poli}'
*/
destroy.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return destroy.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::destroy
* @see app/Http/Controllers/PoliklinikController.php:174
* @route '/poliklinik/{kd_poli}'
*/
destroy.delete = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:126
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
export const toggleStatus = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/poliklinik/{kd_poli}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:126
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
toggleStatus.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return toggleStatus.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:126
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
toggleStatus.patch = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PoliklinikController::generateKode
* @see app/Http/Controllers/PoliklinikController.php:144
* @route '/poliklinik/generate-kode'
*/
export const generateKode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

generateKode.definition = {
    methods: ["get","head"],
    url: '/poliklinik/generate-kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PoliklinikController::generateKode
* @see app/Http/Controllers/PoliklinikController.php:144
* @route '/poliklinik/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::generateKode
* @see app/Http/Controllers/PoliklinikController.php:144
* @route '/poliklinik/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PoliklinikController::generateKode
* @see app/Http/Controllers/PoliklinikController.php:144
* @route '/poliklinik/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

const poliklinik = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggleStatus: Object.assign(toggleStatus, toggleStatus),
    generateKode: Object.assign(generateKode, generateKode),
}

export default poliklinik