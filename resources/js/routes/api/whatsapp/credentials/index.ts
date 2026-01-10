import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/whatsapp/credentials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::store
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/whatsapp/credentials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::store
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::store
* @see [unknown]:0
* @route '/api/whatsapp/credentials'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
export const show = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
show.url = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: args.credential,
    }

    return show.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
show.get = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
show.head = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
export const update = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
update.url = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: args.credential,
    }

    return update.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
update.put = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
export const destroy = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
destroy.url = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: args.credential,
    }

    return destroy.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see [unknown]:0
* @route '/api/whatsapp/credentials/{credential}'
*/
destroy.delete = (args: { credential: string | number } | [credential: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const credentials = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default credentials