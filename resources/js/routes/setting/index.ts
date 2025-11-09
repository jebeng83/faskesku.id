import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import app from './app'
/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:56
* @route '/setting'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:56
* @route '/setting'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:56
* @route '/setting'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:56
* @route '/setting'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:74
* @route '/setting/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/setting/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:74
* @route '/setting/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:74
* @route '/setting/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:74
* @route '/setting/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:88
* @route '/setting'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/setting',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:88
* @route '/setting'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:88
* @route '/setting'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:118
* @route '/setting/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/setting/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:118
* @route '/setting/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:118
* @route '/setting/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:137
* @route '/setting/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/setting/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:137
* @route '/setting/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:137
* @route '/setting/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const setting = {
    index: Object.assign(index, index),
    describe: Object.assign(describe, describe),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    app: Object.assign(app, app),
}

export default setting