import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:14
* @route '/profile'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:14
* @route '/profile'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:14
* @route '/profile'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:14
* @route '/profile'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:28
* @route '/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:28
* @route '/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:28
* @route '/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see routes/web.php:157
* @route '/profile/menu'
*/
export const menu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

menu.definition = {
    methods: ["get","head"],
    url: '/profile/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:157
* @route '/profile/menu'
*/
menu.url = (options?: RouteQueryOptions) => {
    return menu.definition.url + queryParams(options)
}

/**
* @see routes/web.php:157
* @route '/profile/menu'
*/
menu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

/**
* @see routes/web.php:157
* @route '/profile/menu'
*/
menu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: menu.url(options),
    method: 'head',
})

const profile = {
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    menu: Object.assign(menu, menu),
}

export default profile