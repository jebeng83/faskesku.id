import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import prerequisites from './prerequisites'
import interoperabilitas from './interoperabilitas'
/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1722
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1563
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/satusehat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1722
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1563
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/satusehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1722
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1563
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/satusehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1722
>>>>>>> d469a398 (Odontogram)
=======
* @see routes/web.php:1563
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/satusehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const satusehat = {
    index: Object.assign(index, index),
    prerequisites: Object.assign(prerequisites, prerequisites),
    interoperabilitas: Object.assign(interoperabilitas, interoperabilitas),
}

export default satusehat