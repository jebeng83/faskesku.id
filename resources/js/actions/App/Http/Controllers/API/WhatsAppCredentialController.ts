import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:12
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
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:12
* @route '/api/whatsapp/credentials'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:12
* @route '/api/whatsapp/credentials'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::index
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:12
* @route '/api/whatsapp/credentials'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::store
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:32
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
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:32
* @route '/api/whatsapp/credentials'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::store
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:32
* @route '/api/whatsapp/credentials'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:65
* @route '/api/whatsapp/credentials/{credential}'
*/
export const show = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:65
* @route '/api/whatsapp/credentials/{credential}'
*/
show.url = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { credential: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: typeof args.credential === 'object'
        ? args.credential.id
        : args.credential,
    }

    return show.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:65
* @route '/api/whatsapp/credentials/{credential}'
*/
show.get = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::show
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:65
* @route '/api/whatsapp/credentials/{credential}'
*/
show.head = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:83
* @route '/api/whatsapp/credentials/{credential}'
*/
export const update = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:83
* @route '/api/whatsapp/credentials/{credential}'
*/
update.url = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { credential: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: typeof args.credential === 'object'
        ? args.credential.id
        : args.credential,
    }

    return update.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::update
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:83
* @route '/api/whatsapp/credentials/{credential}'
*/
update.put = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:134
* @route '/api/whatsapp/credentials/{credential}'
*/
export const destroy = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/whatsapp/credentials/{credential}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:134
* @route '/api/whatsapp/credentials/{credential}'
*/
destroy.url = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credential: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { credential: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            credential: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credential: typeof args.credential === 'object'
        ? args.credential.id
        : args.credential,
    }

    return destroy.definition.url
            .replace('{credential}', parsedArgs.credential.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WhatsAppCredentialController::destroy
* @see app/Http/Controllers/API/WhatsAppCredentialController.php:134
* @route '/api/whatsapp/credentials/{credential}'
*/
destroy.delete = (args: { credential: number | { id: number } } | [credential: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const WhatsAppCredentialController = { index, store, show, update, destroy }

export default WhatsAppCredentialController