import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stage
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
* @route '/api/akutansi/setoran-bank/{id}/stage'
*/
export const stage = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(args, options),
    method: 'post',
})

stage.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/{id}/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stage
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
* @route '/api/akutansi/setoran-bank/{id}/stage'
*/
stage.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return stage.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::stage
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:128
* @route '/api/akutansi/setoran-bank/{id}/stage'
*/
stage.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::post
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
* @route '/api/akutansi/setoran-bank/{id}/post'
*/
export const post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(args, options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/api/akutansi/setoran-bank/{id}/post',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::post
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
* @route '/api/akutansi/setoran-bank/{id}/post'
*/
post.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return post.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetoranBankController::post
* @see app/Http/Controllers/Akutansi/SetoranBankController.php:160
* @route '/api/akutansi/setoran-bank/{id}/post'
*/
post.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(args, options),
    method: 'post',
})

const SetoranBankController = { index, store, show, update, destroy, stage, post }

export default SetoranBankController