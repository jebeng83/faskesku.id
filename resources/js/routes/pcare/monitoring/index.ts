import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import summary from './summary'
import attempts from './attempts'
import raw from './raw'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1192
=======
* @see routes/web.php:1199
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1204
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1209
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1213
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/monitoring-status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/pcare/monitoring-status',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1192
=======
* @see routes/web.php:1199
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1204
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1209
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1213
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/monitoring-status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1192
=======
* @see routes/web.php:1199
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1204
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1209
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1213
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/monitoring-status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1192
=======
* @see routes/web.php:1199
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1204
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1209
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1213
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/pcare/monitoring-status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

const monitoring = {
    status: Object.assign(status, status),
    summary: Object.assign(summary, summary),
    attempts: Object.assign(attempts, attempts),
    raw: Object.assign(raw, raw),
}

export default monitoring