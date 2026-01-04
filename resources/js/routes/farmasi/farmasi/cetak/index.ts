import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
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
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/cetak/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1072
=======
* @see routes/web.php:1079
>>>>>>> c30c174a (qrcode validasi surat)
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