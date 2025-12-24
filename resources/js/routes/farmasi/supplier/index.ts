import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1147
=======
* @see routes/web.php:1370
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1217
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/supplier'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/supplier',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1147
=======
* @see routes/web.php:1370
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1217
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/supplier'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1147
=======
* @see routes/web.php:1370
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1217
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/supplier'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1147
=======
* @see routes/web.php:1370
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1217
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/farmasi/supplier'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const supplier = {
    index: Object.assign(index, index),
}

export default supplier