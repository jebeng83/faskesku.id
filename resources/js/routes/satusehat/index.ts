import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import prerequisites from './prerequisites'
import interoperabilitas from './interoperabilitas'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1481
=======
* @see routes/web.php:1488
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1493
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1498
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1502
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1481
=======
* @see routes/web.php:1488
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1493
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1498
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1502
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1481
=======
* @see routes/web.php:1488
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1493
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1498
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1502
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1481
=======
* @see routes/web.php:1488
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1493
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1498
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1502
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const satusehat = {
    index: Object.assign(index, index),
    prerequisites: Object.assign(prerequisites, prerequisites),
    interoperabilitas: Object.assign(interoperabilitas, interoperabilitas),
}

export default satusehat