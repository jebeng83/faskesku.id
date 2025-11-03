import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::get
* @see app/Http/Controllers/Pcare/PcareController.php:892
* @route '/pcare/api/mapping/poli'
*/
export const get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::get
* @see app/Http/Controllers/Pcare/PcareController.php:892
* @route '/pcare/api/mapping/poli'
*/
get.url = (options?: RouteQueryOptions) => {
    return get.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::get
* @see app/Http/Controllers/Pcare/PcareController.php:892
* @route '/pcare/api/mapping/poli'
*/
get.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::get
* @see app/Http/Controllers/Pcare/PcareController.php:892
* @route '/pcare/api/mapping/poli'
*/
get.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:908
* @route '/pcare/api/mapping/poli'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:908
* @route '/pcare/api/mapping/poli'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:908
* @route '/pcare/api/mapping/poli'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMethod
* @see app/Http/Controllers/Pcare/PcareController.php:969
* @route '/pcare/api/mapping/poli'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMethod
* @see app/Http/Controllers/Pcare/PcareController.php:969
* @route '/pcare/api/mapping/poli'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMethod
* @see app/Http/Controllers/Pcare/PcareController.php:969
* @route '/pcare/api/mapping/poli'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const poli = {
    get: Object.assign(get, get),
    store: Object.assign(store, store),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default poli