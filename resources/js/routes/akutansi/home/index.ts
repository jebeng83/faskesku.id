import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:392
=======
* @see routes/web.php:514
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/home'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/home',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:392
=======
* @see routes/web.php:514
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/home'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:392
=======
* @see routes/web.php:514
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/home'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:392
=======
* @see routes/web.php:514
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/home'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const home = {
    page: Object.assign(page, page),
}

export default home