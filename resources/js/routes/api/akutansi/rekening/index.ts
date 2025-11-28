import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:23
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:23
* @route '/api/akutansi/rekening'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:23
* @route '/api/akutansi/rekening'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::index
* @see app/Http/Controllers/Akutansi/RekeningController.php:23
* @route '/api/akutansi/rekening'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::store
* @see app/Http/Controllers/Akutansi/RekeningController.php:64
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:64
* @route '/api/akutansi/rekening'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::store
* @see app/Http/Controllers/Akutansi/RekeningController.php:64
* @route '/api/akutansi/rekening'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::update
* @see app/Http/Controllers/Akutansi/RekeningController.php:107
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:107
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:107
* @route '/api/akutansi/rekening/{kd_rek}'
*/
update.put = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::destroy
* @see app/Http/Controllers/Akutansi/RekeningController.php:131
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:131
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
* @see app/Http/Controllers/Akutansi/RekeningController.php:131
* @route '/api/akutansi/rekening/{kd_rek}'
*/
destroy.delete = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeSub
* @see app/Http/Controllers/Akutansi/RekeningController.php:154
* @route '/api/akutansi/rekening/{kd_rek}/make-sub'
*/
export const makeSub = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeSub.url(args, options),
    method: 'post',
})

makeSub.definition = {
    methods: ["post"],
    url: '/api/akutansi/rekening/{kd_rek}/make-sub',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeSub
* @see app/Http/Controllers/Akutansi/RekeningController.php:154
* @route '/api/akutansi/rekening/{kd_rek}/make-sub'
*/
makeSub.url = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return makeSub.definition.url
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeSub
* @see app/Http/Controllers/Akutansi/RekeningController.php:154
* @route '/api/akutansi/rekening/{kd_rek}/make-sub'
*/
makeSub.post = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeSub.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeInduk
* @see app/Http/Controllers/Akutansi/RekeningController.php:187
* @route '/api/akutansi/rekening/{kd_rek}/make-induk'
*/
export const makeInduk = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeInduk.url(args, options),
    method: 'post',
})

makeInduk.definition = {
    methods: ["post"],
    url: '/api/akutansi/rekening/{kd_rek}/make-induk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeInduk
* @see app/Http/Controllers/Akutansi/RekeningController.php:187
* @route '/api/akutansi/rekening/{kd_rek}/make-induk'
*/
makeInduk.url = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return makeInduk.definition.url
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::makeInduk
* @see app/Http/Controllers/Akutansi/RekeningController.php:187
* @route '/api/akutansi/rekening/{kd_rek}/make-induk'
*/
makeInduk.post = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeInduk.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::children
* @see app/Http/Controllers/Akutansi/RekeningController.php:200
* @route '/api/akutansi/rekening/{kd_rek}/children'
*/
export const children = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: children.url(args, options),
    method: 'get',
})

children.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/rekening/{kd_rek}/children',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::children
* @see app/Http/Controllers/Akutansi/RekeningController.php:200
* @route '/api/akutansi/rekening/{kd_rek}/children'
*/
children.url = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return children.definition.url
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::children
* @see app/Http/Controllers/Akutansi/RekeningController.php:200
* @route '/api/akutansi/rekening/{kd_rek}/children'
*/
children.get = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: children.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::children
* @see app/Http/Controllers/Akutansi/RekeningController.php:200
* @route '/api/akutansi/rekening/{kd_rek}/children'
*/
children.head = (args: { kd_rek: string | number } | [kd_rek: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: children.url(args, options),
    method: 'head',
})

const rekening = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    makeSub: Object.assign(makeSub, makeSub),
    makeInduk: Object.assign(makeInduk, makeInduk),
    children: Object.assign(children, children),
}

export default rekening