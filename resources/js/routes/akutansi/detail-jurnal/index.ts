import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:901
* @route '/akutansi/detail-jurnal'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/detail-jurnal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:901
* @route '/akutansi/detail-jurnal'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:901
* @route '/akutansi/detail-jurnal'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:901
* @route '/akutansi/detail-jurnal'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const detailJurnal = {
    page: Object.assign(page, page),
}

export default detailJurnal