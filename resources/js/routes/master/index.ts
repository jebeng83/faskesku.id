import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:614
=======
* @see routes/web.php:734
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/master'
*/
export const alias = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alias.url(options),
    method: 'get',
})

alias.definition = {
    methods: ["get","head"],
    url: '/master',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:614
=======
* @see routes/web.php:734
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/master'
*/
alias.url = (options?: RouteQueryOptions) => {
    return alias.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:614
=======
* @see routes/web.php:734
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/master'
*/
alias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alias.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:614
=======
* @see routes/web.php:734
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/master'
*/
alias.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alias.url(options),
    method: 'head',
})

const master = {
    alias: Object.assign(alias, alias),
}

export default master