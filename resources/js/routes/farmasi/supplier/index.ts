import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1129
=======
* @see routes/web.php:1136
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1141
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1146
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1150
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/supplier'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/supplier',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1129
=======
* @see routes/web.php:1136
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1141
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1146
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1150
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/supplier'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1129
=======
* @see routes/web.php:1136
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1141
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1146
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1150
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/supplier'
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
* @see routes/web.php:1129
=======
* @see routes/web.php:1136
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1141
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1146
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1150
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/supplier'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const supplier = {
    index: Object.assign(index, index),
}

export default supplier