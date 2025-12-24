import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:440
=======
* @see routes/web.php:562
>>>>>>> 697e42ab (BelumFixTVPoli)
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
<<<<<<< HEAD
* @see routes/web.php:440
=======
* @see routes/web.php:562
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/detail-jurnal'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:440
=======
* @see routes/web.php:562
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/detail-jurnal'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:440
=======
* @see routes/web.php:562
>>>>>>> 697e42ab (BelumFixTVPoli)
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