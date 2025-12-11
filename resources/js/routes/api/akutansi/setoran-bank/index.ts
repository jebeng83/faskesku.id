import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::stage
 * @see app/Http/Controllers/Akutansi/JurnalController.php:609
 * @route '/api/akutansi/setoran-bank/stage'
 */
export const stage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(options),
    method: 'post',
})

stage.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::stage
 * @see app/Http/Controllers/Akutansi/JurnalController.php:609
 * @route '/api/akutansi/setoran-bank/stage'
 */
stage.url = (options?: RouteQueryOptions) => {
    return stage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::stage
 * @see app/Http/Controllers/Akutansi/JurnalController.php:609
 * @route '/api/akutansi/setoran-bank/stage'
 */
stage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
 * @see app/Http/Controllers/Akutansi/JurnalController.php:650
 * @route '/api/akutansi/setoran-bank/post'
 */
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/post',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
 * @see app/Http/Controllers/Akutansi/JurnalController.php:650
 * @route '/api/akutansi/setoran-bank/post'
 */
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
 * @see app/Http/Controllers/Akutansi/JurnalController.php:650
 * @route '/api/akutansi/setoran-bank/post'
 */
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::index
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:13
 * @route '/api/akutansi/setoran-bank'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/setoran-bank',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::index
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:13
 * @route '/api/akutansi/setoran-bank'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::index
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:13
 * @route '/api/akutansi/setoran-bank'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::index
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:13
 * @route '/api/akutansi/setoran-bank'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::store
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:67
 * @route '/api/akutansi/setoran-bank'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::store
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:67
 * @route '/api/akutansi/setoran-bank'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::store
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:67
 * @route '/api/akutansi/setoran-bank'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::show
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:58
 * @route '/api/akutansi/setoran-bank/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/setoran-bank/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::show
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:58
 * @route '/api/akutansi/setoran-bank/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::show
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:58
 * @route '/api/akutansi/setoran-bank/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::show
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:58
 * @route '/api/akutansi/setoran-bank/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::update
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:87
 * @route '/api/akutansi/setoran-bank/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/setoran-bank/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::update
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:87
 * @route '/api/akutansi/setoran-bank/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::update
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:87
 * @route '/api/akutansi/setoran-bank/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::destroy
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:115
 * @route '/api/akutansi/setoran-bank/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/setoran-bank/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::destroy
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:115
 * @route '/api/akutansi/setoran-bank/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::destroy
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:115
 * @route '/api/akutansi/setoran-bank/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stageById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
 * @route '/api/akutansi/setoran-bank/{id}/stage'
 */
export const stageById = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageById.url(args, options),
    method: 'post',
})

stageById.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/{id}/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stageById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
 * @route '/api/akutansi/setoran-bank/{id}/stage'
 */
stageById.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return stageById.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stageById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
 * @route '/api/akutansi/setoran-bank/{id}/stage'
 */
stageById.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageById.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::postById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
 * @route '/api/akutansi/setoran-bank/{id}/post'
 */
export const postById = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: postById.url(args, options),
    method: 'post',
})

postById.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/{id}/post',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::postById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
 * @route '/api/akutansi/setoran-bank/{id}/post'
 */
postById.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return postById.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::postById
 * @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
 * @route '/api/akutansi/setoran-bank/{id}/post'
 */
postById.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: postById.url(args, options),
    method: 'post',
})
const setoranBank = {
    stage: Object.assign(stage, stage),
post: Object.assign(post, post),
index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
stageById: Object.assign(stageById, stageById),
postById: Object.assign(postById, postById),
}

export default setoranBank