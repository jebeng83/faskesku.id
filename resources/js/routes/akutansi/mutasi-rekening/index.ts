import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:906
* @route '/akutansi/mutasi-rekening'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/mutasi-rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:906
* @route '/akutansi/mutasi-rekening'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:906
* @route '/akutansi/mutasi-rekening'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:906
* @route '/akutansi/mutasi-rekening'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const mutasiRekening = {
    page: Object.assign(page, page),
}

export default mutasiRekening