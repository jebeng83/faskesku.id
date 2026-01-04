import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1282
=======
* @see routes/web.php:1289
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1294
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/data-peserta-by-nik'
*/
export const cekPesertaNik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

cekPesertaNik.definition = {
    methods: ["get","head"],
    url: '/pcare/data-peserta-by-nik',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1282
=======
* @see routes/web.php:1289
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1294
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.url = (options?: RouteQueryOptions) => {
    return cekPesertaNik.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1282
=======
* @see routes/web.php:1289
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1294
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cekPesertaNik.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1282
=======
* @see routes/web.php:1289
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1294
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/data-peserta-by-nik'
*/
cekPesertaNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cekPesertaNik.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1287
=======
* @see routes/web.php:1294
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1299
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/layanan'
*/
export const pcare = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pcare.url(options),
    method: 'get',
})

pcare.definition = {
    methods: ["get","head"],
    url: '/pcare/layanan',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1287
=======
* @see routes/web.php:1294
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1299
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/layanan'
*/
pcare.url = (options?: RouteQueryOptions) => {
    return pcare.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1287
=======
* @see routes/web.php:1294
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1299
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/layanan'
*/
pcare.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pcare.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1287
=======
* @see routes/web.php:1294
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1299
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
* @route '/pcare/layanan'
*/
pcare.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pcare.url(options),
    method: 'head',
})

const layanan = {
    cekPesertaNik: Object.assign(cekPesertaNik, cekPesertaNik),
    pcare: Object.assign(pcare, pcare),
}

export default layanan