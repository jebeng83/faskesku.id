import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:955
* @route '/akutansi/closing-kasir'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/closing-kasir',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:955
* @route '/akutansi/closing-kasir'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:955
* @route '/akutansi/closing-kasir'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:955
* @route '/akutansi/closing-kasir'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const closingKasir = {
    page: Object.assign(page, page),
}

export default closingKasir