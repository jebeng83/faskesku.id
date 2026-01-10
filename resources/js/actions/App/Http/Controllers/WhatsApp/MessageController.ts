import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\WhatsApp\MessageController::store
* @see app/Http/Controllers/WhatsApp/MessageController.php:13
* @route '/api/messages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsApp\MessageController::store
* @see app/Http/Controllers/WhatsApp/MessageController.php:13
* @route '/api/messages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsApp\MessageController::store
* @see app/Http/Controllers/WhatsApp/MessageController.php:13
* @route '/api/messages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const MessageController = { store }

export default MessageController