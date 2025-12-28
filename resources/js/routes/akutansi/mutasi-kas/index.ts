import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:425
* @route '/akutansi/mutasi-kas'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/mutasi-kas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:425
* @route '/akutansi/mutasi-kas'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:425
* @route '/akutansi/mutasi-kas'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:425
* @route '/akutansi/mutasi-kas'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const mutasiKas = {
    page: Object.assign(page, page),
}

export default mutasiKas