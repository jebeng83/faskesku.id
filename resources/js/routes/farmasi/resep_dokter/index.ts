import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:826
* @route '/farmasi/resep_dokter/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/farmasi/resep_dokter/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:826
* @route '/farmasi/resep_dokter/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see routes/web.php:826
* @route '/farmasi/resep_dokter/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see routes/web.php:826
* @route '/farmasi/resep_dokter/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

const resep_dokter = {
    describe: Object.assign(describe, describe),
}

export default resep_dokter