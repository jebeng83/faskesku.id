import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import cetak from './cetak'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1084
=======
* @see routes/web.php:1307
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1154
>>>>>>> 697e42ab (BelumFixTVPoli)
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
<<<<<<< HEAD
* @see routes/web.php:1084
=======
* @see routes/web.php:1307
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1154
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1084
=======
* @see routes/web.php:1307
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1154
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1084
=======
* @see routes/web.php:1307
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1154
>>>>>>> 697e42ab (BelumFixTVPoli)
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