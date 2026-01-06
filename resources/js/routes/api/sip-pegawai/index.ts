import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/api.php:312
=======
* @see routes/api.php:400
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/apoteker'
*/
export const apoteker = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apoteker.url(options),
    method: 'get',
})

apoteker.definition = {
    methods: ["get","head"],
    url: '/api/sip-pegawai/apoteker',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/api.php:312
=======
* @see routes/api.php:400
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.url = (options?: RouteQueryOptions) => {
    return apoteker.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/api.php:312
=======
* @see routes/api.php:400
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apoteker.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/api.php:312
=======
* @see routes/api.php:400
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apoteker.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/api.php:337
=======
* @see routes/api.php:425
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/expiring'
*/
export const expiring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

expiring.definition = {
    methods: ["get","head"],
    url: '/api/sip-pegawai/expiring',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/api.php:337
=======
* @see routes/api.php:425
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/expiring'
*/
expiring.url = (options?: RouteQueryOptions) => {
    return expiring.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/api.php:337
=======
* @see routes/api.php:425
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/expiring'
*/
expiring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/api.php:337
=======
* @see routes/api.php:425
>>>>>>> d469a398 (Odontogram)
* @route '/api/sip-pegawai/expiring'
*/
expiring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: expiring.url(options),
    method: 'head',
})

const sipPegawai = {
    apoteker: Object.assign(apoteker, apoteker),
    expiring: Object.assign(expiring, expiring),
}

export default sipPegawai