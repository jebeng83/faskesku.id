import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1505
=======
* @see routes/web.php:1512
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1517
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
export const encounter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

encounter.definition = {
    methods: ["get","head"],
    url: '/satusehat/interoperabilitas/rajal/encounter',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1505
=======
* @see routes/web.php:1512
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1517
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.url = (options?: RouteQueryOptions) => {
    return encounter.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1505
=======
* @see routes/web.php:1512
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1517
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1505
=======
* @see routes/web.php:1512
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1517
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounter.url(options),
    method: 'head',
})

const rajal = {
    encounter: Object.assign(encounter, encounter),
}

export default rajal