import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import cetak from './cetak'
/**
<<<<<<< HEAD
* @see routes/web.php:1066
=======
* @see routes/web.php:1073
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/data-opname'
*/
export const dataOpname = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

dataOpname.definition = {
    methods: ["get","head"],
    url: '/farmasi/farmasi/data-opname',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1066
=======
* @see routes/web.php:1073
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1066
=======
* @see routes/web.php:1073
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1066
=======
* @see routes/web.php:1073
>>>>>>> c30c174a (qrcode validasi surat)
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataOpname.url(options),
    method: 'head',
})

const farmasi = {
    dataOpname: Object.assign(dataOpname, dataOpname),
    cetak: Object.assign(cetak, cetak),
}

export default farmasi