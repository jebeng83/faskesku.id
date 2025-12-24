import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:410
=======
* @see routes/web.php:532
>>>>>>> 697e42ab (BelumFixTVPoli)
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
<<<<<<< HEAD
* @see routes/web.php:410
=======
* @see routes/web.php:532
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/pengaturan-rekening'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:410
=======
* @see routes/web.php:532
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/pengaturan-rekening'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:410
=======
* @see routes/web.php:532
>>>>>>> 697e42ab (BelumFixTVPoli)
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