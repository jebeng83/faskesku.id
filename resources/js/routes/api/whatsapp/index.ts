import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import credentials from './credentials'
/**
* @see routes/api.php:303
* @route '/api/whatsapp/send'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/api/whatsapp/send',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/api.php:303
* @route '/api/whatsapp/send'
*/
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see routes/api.php:303
* @route '/api/whatsapp/send'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

const whatsapp = {
    send: Object.assign(send, send),
    credentials: Object.assign(credentials, credentials),
}

export default whatsapp