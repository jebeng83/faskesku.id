import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::verify
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:13
* @route '/api/webhooks/whatsapp'
*/
export const verify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/api/webhooks/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::verify
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:13
* @route '/api/webhooks/whatsapp'
*/
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::verify
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:13
* @route '/api/webhooks/whatsapp'
*/
verify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::verify
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:13
* @route '/api/webhooks/whatsapp'
*/
verify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::handle
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:28
* @route '/api/webhooks/whatsapp'
*/
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/api/webhooks/whatsapp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::handle
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:28
* @route '/api/webhooks/whatsapp'
*/
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Webhook\WhatsAppWebhookController::handle
* @see app/Http/Controllers/Webhook/WhatsAppWebhookController.php:28
* @route '/api/webhooks/whatsapp'
*/
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

const whatsapp = {
    verify: Object.assign(verify, verify),
    handle: Object.assign(handle, handle),
}

export default whatsapp