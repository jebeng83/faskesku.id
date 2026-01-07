import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:727
* @route '/tools/scan-whatsapp-credentials'
*/
export const scan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scan.url(options),
    method: 'get',
})

scan.definition = {
    methods: ["get","head"],
    url: '/tools/scan-whatsapp-credentials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:727
* @route '/tools/scan-whatsapp-credentials'
*/
scan.url = (options?: RouteQueryOptions) => {
    return scan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:727
* @route '/tools/scan-whatsapp-credentials'
*/
scan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:727
* @route '/tools/scan-whatsapp-credentials'
*/
scan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scan.url(options),
    method: 'head',
})

const credentials = {
    scan: Object.assign(scan, scan),
}

export default credentials