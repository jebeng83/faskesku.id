import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1084
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1089
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1093
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
export const dataOpname = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

dataOpname.definition = {
    methods: ["get","head"],
    url: '/farmasi/farmasi/cetak/data-opname',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1084
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1089
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1093
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1084
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1089
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1093
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1084
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1089
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1093
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
dataOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataOpname.url(options),
    method: 'head',
})

const cetak = {
    dataOpname: Object.assign(dataOpname, dataOpname),
}

export default cetak