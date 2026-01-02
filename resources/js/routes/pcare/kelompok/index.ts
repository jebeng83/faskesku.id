import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import kegiatan90f170 from './kegiatan'
import club from './club'
import peserta from './peserta'
/**
<<<<<<< HEAD
* @see routes/web.php:1295
=======
* @see routes/web.php:1292
>>>>>>> main
* @route '/pcare/kelompok/club-prolanis'
*/
export const clubProlanis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clubProlanis.url(options),
    method: 'get',
})

clubProlanis.definition = {
    methods: ["get","head"],
    url: '/pcare/kelompok/club-prolanis',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1295
=======
* @see routes/web.php:1292
>>>>>>> main
* @route '/pcare/kelompok/club-prolanis'
*/
clubProlanis.url = (options?: RouteQueryOptions) => {
    return clubProlanis.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1295
=======
* @see routes/web.php:1292
>>>>>>> main
* @route '/pcare/kelompok/club-prolanis'
*/
clubProlanis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clubProlanis.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1295
=======
* @see routes/web.php:1292
>>>>>>> main
* @route '/pcare/kelompok/club-prolanis'
*/
clubProlanis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clubProlanis.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1300
=======
* @see routes/web.php:1297
>>>>>>> main
* @route '/pcare/kelompok/kegiatan'
*/
export const kegiatan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kegiatan.url(options),
    method: 'get',
})

kegiatan.definition = {
    methods: ["get","head"],
    url: '/pcare/kelompok/kegiatan',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1300
=======
* @see routes/web.php:1297
>>>>>>> main
* @route '/pcare/kelompok/kegiatan'
*/
kegiatan.url = (options?: RouteQueryOptions) => {
    return kegiatan.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1300
=======
* @see routes/web.php:1297
>>>>>>> main
* @route '/pcare/kelompok/kegiatan'
*/
kegiatan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kegiatan.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1300
=======
* @see routes/web.php:1297
>>>>>>> main
* @route '/pcare/kelompok/kegiatan'
*/
kegiatan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kegiatan.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1305
=======
* @see routes/web.php:1302
>>>>>>> main
* @route '/pcare/kelompok/entri'
*/
export const entri = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entri.url(options),
    method: 'get',
})

entri.definition = {
    methods: ["get","head"],
    url: '/pcare/kelompok/entri',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1305
=======
* @see routes/web.php:1302
>>>>>>> main
* @route '/pcare/kelompok/entri'
*/
entri.url = (options?: RouteQueryOptions) => {
    return entri.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1305
=======
* @see routes/web.php:1302
>>>>>>> main
* @route '/pcare/kelompok/entri'
*/
entri.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entri.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1305
=======
* @see routes/web.php:1302
>>>>>>> main
* @route '/pcare/kelompok/entri'
*/
entri.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: entri.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1310
=======
* @see routes/web.php:1307
>>>>>>> main
* @route '/pcare/kelompok/peserta-kegiatan'
*/
export const pesertaKegiatan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaKegiatan.url(options),
    method: 'get',
})

pesertaKegiatan.definition = {
    methods: ["get","head"],
    url: '/pcare/kelompok/peserta-kegiatan',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1310
=======
* @see routes/web.php:1307
>>>>>>> main
* @route '/pcare/kelompok/peserta-kegiatan'
*/
pesertaKegiatan.url = (options?: RouteQueryOptions) => {
    return pesertaKegiatan.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1310
=======
* @see routes/web.php:1307
>>>>>>> main
* @route '/pcare/kelompok/peserta-kegiatan'
*/
pesertaKegiatan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaKegiatan.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1310
=======
* @see routes/web.php:1307
>>>>>>> main
* @route '/pcare/kelompok/peserta-kegiatan'
*/
pesertaKegiatan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaKegiatan.url(options),
    method: 'head',
})

const kelompok = {
    clubProlanis: Object.assign(clubProlanis, clubProlanis),
    kegiatan: Object.assign(kegiatan, kegiatan90f170),
    entri: Object.assign(entri, entri),
    pesertaKegiatan: Object.assign(pesertaKegiatan, pesertaKegiatan),
    club: Object.assign(club, club),
    peserta: Object.assign(peserta, peserta),
}

export default kelompok