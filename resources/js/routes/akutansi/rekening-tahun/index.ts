import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:875
* @route '/akutansi/rekening-tahun'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/rekening-tahun',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:875
* @route '/akutansi/rekening-tahun'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:875
* @route '/akutansi/rekening-tahun'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:875
* @route '/akutansi/rekening-tahun'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const rekeningTahun = {
    page: Object.assign(page, page),
}

export default rekeningTahun