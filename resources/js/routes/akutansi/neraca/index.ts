import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:435
=======
* @see routes/web.php:557
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/neraca'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/neraca',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:435
=======
* @see routes/web.php:557
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/neraca'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:435
=======
* @see routes/web.php:557
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/neraca'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:435
=======
* @see routes/web.php:557
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/neraca'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const neraca = {
    page: Object.assign(page, page),
}

export default neraca