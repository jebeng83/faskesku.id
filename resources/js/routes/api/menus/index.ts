import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MenuController::hierarchy
 * @see app/Http/Controllers/MenuController.php:244
 * @route '/api/menus/hierarchy'
 */
export const hierarchy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hierarchy.url(options),
    method: 'get',
})

hierarchy.definition = {
    methods: ["get","head"],
    url: '/api/menus/hierarchy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::hierarchy
 * @see app/Http/Controllers/MenuController.php:244
 * @route '/api/menus/hierarchy'
 */
hierarchy.url = (options?: RouteQueryOptions) => {
    return hierarchy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::hierarchy
 * @see app/Http/Controllers/MenuController.php:244
 * @route '/api/menus/hierarchy'
 */
hierarchy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hierarchy.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MenuController::hierarchy
 * @see app/Http/Controllers/MenuController.php:244
 * @route '/api/menus/hierarchy'
 */
hierarchy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hierarchy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::icons
 * @see app/Http/Controllers/MenuController.php:311
 * @route '/api/menus/icons'
 */
export const icons = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: icons.url(options),
    method: 'get',
})

icons.definition = {
    methods: ["get","head"],
    url: '/api/menus/icons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::icons
 * @see app/Http/Controllers/MenuController.php:311
 * @route '/api/menus/icons'
 */
icons.url = (options?: RouteQueryOptions) => {
    return icons.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::icons
 * @see app/Http/Controllers/MenuController.php:311
 * @route '/api/menus/icons'
 */
icons.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: icons.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MenuController::icons
 * @see app/Http/Controllers/MenuController.php:311
 * @route '/api/menus/icons'
 */
icons.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: icons.url(options),
    method: 'head',
})
const menus = {
    hierarchy: Object.assign(hierarchy, hierarchy),
icons: Object.assign(icons, icons),
}

export default menus