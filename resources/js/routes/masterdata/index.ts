import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:611
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
* @see routes/web.php:611
* @route '/masterdata'
*/
alias.url = (options?: RouteQueryOptions) => {
    return alias.definition.url + queryParams(options)
}

/**
* @see routes/web.php:611
* @route '/masterdata'
*/
alias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alias.url(options),
    method: 'get',
})

/**
* @see routes/web.php:611
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