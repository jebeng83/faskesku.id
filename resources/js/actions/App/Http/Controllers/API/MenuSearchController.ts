import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\MenuSearchController::search
* @see app/Http/Controllers/API/MenuSearchController.php:15
* @route '/api/menu/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/menu/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\MenuSearchController::search
* @see app/Http/Controllers/API/MenuSearchController.php:15
* @route '/api/menu/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\MenuSearchController::search
* @see app/Http/Controllers/API/MenuSearchController.php:15
* @route '/api/menu/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\MenuSearchController::search
* @see app/Http/Controllers/API/MenuSearchController.php:15
* @route '/api/menu/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\MenuSearchController::popular
* @see app/Http/Controllers/API/MenuSearchController.php:50
* @route '/api/menu/popular'
*/
export const popular = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})

popular.definition = {
    methods: ["get","head"],
    url: '/api/menu/popular',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\MenuSearchController::popular
* @see app/Http/Controllers/API/MenuSearchController.php:50
* @route '/api/menu/popular'
*/
popular.url = (options?: RouteQueryOptions) => {
    return popular.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\MenuSearchController::popular
* @see app/Http/Controllers/API/MenuSearchController.php:50
* @route '/api/menu/popular'
*/
popular.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\MenuSearchController::popular
* @see app/Http/Controllers/API/MenuSearchController.php:50
* @route '/api/menu/popular'
*/
popular.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: popular.url(options),
    method: 'head',
})

const MenuSearchController = { search, popular }

export default MenuSearchController