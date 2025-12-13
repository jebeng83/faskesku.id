import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\ReferenceController::index
* @see app/Http/Controllers/API/ReferenceController.php:66
* @route '/api/cacat-fisik'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/cacat-fisik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\ReferenceController::index
* @see app/Http/Controllers/API/ReferenceController.php:66
* @route '/api/cacat-fisik'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\ReferenceController::index
* @see app/Http/Controllers/API/ReferenceController.php:66
* @route '/api/cacat-fisik'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\ReferenceController::index
* @see app/Http/Controllers/API/ReferenceController.php:66
* @route '/api/cacat-fisik'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const cacatFisik = {
    index: Object.assign(index, index),
}

export default cacatFisik