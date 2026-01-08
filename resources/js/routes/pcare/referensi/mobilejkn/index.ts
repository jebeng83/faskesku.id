import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1272
=======
* @see routes/web.php:1279
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1284
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1289
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1293
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi-mobilejkn/poli',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1272
=======
* @see routes/web.php:1279
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1284
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1289
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1293
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1272
=======
* @see routes/web.php:1279
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1284
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1289
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1293
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1272
=======
* @see routes/web.php:1279
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1284
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1289
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1293
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1277
=======
* @see routes/web.php:1284
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1289
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1294
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1298
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi-mobilejkn/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1277
=======
* @see routes/web.php:1284
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1289
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1294
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1298
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1277
=======
* @see routes/web.php:1284
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1289
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1294
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1298
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1277
=======
* @see routes/web.php:1284
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1289
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1294
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1298
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

const mobilejkn = {
    poli: Object.assign(poli, poli),
    dokter: Object.assign(dokter, dokter),
}

export default mobilejkn