import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1069
=======
* @see routes/web.php:1076
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1081
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/farmasi/cetak/data-opname'
*/
export const dataOpname = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

dataOpname.definition = {
    methods: ["get","head"],
    url: '/farmasi/cetak/data-opname',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1069
=======
* @see routes/web.php:1076
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1081
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/farmasi/cetak/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1069
=======
* @see routes/web.php:1076
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1081
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/farmasi/cetak/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1069
=======
* @see routes/web.php:1076
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1081
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/farmasi/cetak/data-opname'
*/
dataOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataOpname.url(options),
    method: 'head',
})

const cetak = {
    dataOpname: Object.assign(dataOpname, dataOpname),
}

export default cetak