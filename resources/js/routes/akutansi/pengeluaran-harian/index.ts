import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:961
* @route '/akutansi/pengeluaran-harian'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/pengeluaran-harian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:961
* @route '/akutansi/pengeluaran-harian'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:961
* @route '/akutansi/pengeluaran-harian'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:961
* @route '/akutansi/pengeluaran-harian'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const pengeluaranHarian = {
    page: Object.assign(page, page),
}

export default pengeluaranHarian