import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:963
* @route '/akutansi/pemasukan-lain'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/pemasukan-lain',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:963
* @route '/akutansi/pemasukan-lain'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:963
* @route '/akutansi/pemasukan-lain'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:963
* @route '/akutansi/pemasukan-lain'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const pemasukanLain = {
    page: Object.assign(page, page),
}

export default pemasukanLain