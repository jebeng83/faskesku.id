import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:611
=======
* @see routes/web.php:731
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/masterdata'
*/
export const alias = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alias.url(options),
    method: 'get',
})

alias.definition = {
    methods: ["get","head"],
    url: '/masterdata',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:611
=======
* @see routes/web.php:731
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/masterdata'
*/
alias.url = (options?: RouteQueryOptions) => {
    return alias.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:611
=======
* @see routes/web.php:731
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/masterdata'
*/
alias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alias.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:611
=======
* @see routes/web.php:731
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/masterdata'
*/
alias.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alias.url(options),
    method: 'head',
})

const masterdata = {
    alias: Object.assign(alias, alias),
}

export default masterdata