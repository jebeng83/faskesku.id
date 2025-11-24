import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:97
* @route '/akutansi/pengaturan-rekening'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/pengaturan-rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:97
* @route '/akutansi/pengaturan-rekening'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:97
* @route '/akutansi/pengaturan-rekening'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:97
* @route '/akutansi/pengaturan-rekening'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const pengaturanRekening = {
    page: Object.assign(page, page),
}

export default pengaturanRekening