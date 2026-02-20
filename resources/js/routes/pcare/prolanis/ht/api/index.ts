import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see routes/web.php:3153
* @route '/pcare/api/prolanis/ht/test'
*/
export const test = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

test.definition = {
    methods: ["get","head"],
    url: '/pcare/api/prolanis/ht/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3153
* @route '/pcare/api/prolanis/ht/test'
*/
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3153
* @route '/pcare/api/prolanis/ht/test'
*/
test.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3153
* @route '/pcare/api/prolanis/ht/test'
*/
test.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(options),
    method: 'head',
})

const api = {
    test: Object.assign(test, test),
}

export default api