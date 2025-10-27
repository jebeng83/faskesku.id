import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:223
* @route '/farmasi/farmasi/data-opname'
*/
export const dataOpname = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

dataOpname.definition = {
    methods: ["get","head"],
    url: '/farmasi/farmasi/data-opname',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:223
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.url = (options?: RouteQueryOptions) => {
    return dataOpname.definition.url + queryParams(options)
}

/**
* @see routes/web.php:223
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataOpname.url(options),
    method: 'get',
})

/**
* @see routes/web.php:223
* @route '/farmasi/farmasi/data-opname'
*/
dataOpname.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataOpname.url(options),
    method: 'head',
})

const farmasi = {
    dataOpname: Object.assign(dataOpname, dataOpname),
}

export default farmasi