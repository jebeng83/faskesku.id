import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:942
* @route '/akutansi/rekap-uang-pershift'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/rekap-uang-pershift',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:942
* @route '/akutansi/rekap-uang-pershift'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:942
* @route '/akutansi/rekap-uang-pershift'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:942
* @route '/akutansi/rekap-uang-pershift'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const rekapUangPershift = {
    page: Object.assign(page, page),
}

export default rekapUangPershift