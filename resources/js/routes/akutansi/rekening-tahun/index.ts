import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:397
=======
* @see routes/web.php:519
>>>>>>> 697e42ab (BelumFixTVPoli)
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
<<<<<<< HEAD
* @see routes/web.php:397
=======
* @see routes/web.php:519
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/rekening-tahun'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:397
=======
* @see routes/web.php:519
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/akutansi/rekening-tahun'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:397
=======
* @see routes/web.php:519
>>>>>>> 697e42ab (BelumFixTVPoli)
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