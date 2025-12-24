import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:450
=======
* @see routes/web.php:572
>>>>>>> 697e42ab (BelumFixTVPoli)
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
<<<<<<< HEAD
* @see routes/web.php:450
=======
* @see routes/web.php:572
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/mutasi-kas'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:450
=======
* @see routes/web.php:572
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/mutasi-kas'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:450
=======
* @see routes/web.php:572
>>>>>>> 697e42ab (BelumFixTVPoli)
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