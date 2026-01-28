import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::index
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:14
* @route '/igd/asuhan-keperawatan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/igd/asuhan-keperawatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::index
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:14
* @route '/igd/asuhan-keperawatan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::index
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:14
* @route '/igd/asuhan-keperawatan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::index
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:14
* @route '/igd/asuhan-keperawatan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::edit
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:54
* @route '/igd/asuhan-keperawatan/{noRawat}/edit'
*/
export const edit = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/igd/asuhan-keperawatan/{noRawat}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::edit
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:54
* @route '/igd/asuhan-keperawatan/{noRawat}/edit'
*/
edit.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            noRawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noRawat: args.noRawat,
    }

    return edit.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::edit
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:54
* @route '/igd/asuhan-keperawatan/{noRawat}/edit'
*/
edit.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::edit
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:54
* @route '/igd/asuhan-keperawatan/{noRawat}/edit'
*/
edit.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::store
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:64
* @route '/igd/asuhan-keperawatan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/igd/asuhan-keperawatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::store
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:64
* @route '/igd/asuhan-keperawatan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::store
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:64
* @route '/igd/asuhan-keperawatan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::update
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:100
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
export const update = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/igd/asuhan-keperawatan/{noRawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::update
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:100
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
update.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            noRawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noRawat: args.noRawat,
    }

    return update.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::update
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:100
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
update.put = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::destroy
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:133
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
export const destroy = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/igd/asuhan-keperawatan/{noRawat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::destroy
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:133
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
destroy.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            noRawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noRawat: args.noRawat,
    }

    return destroy.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGD\AsuhanKeperawatanController::destroy
* @see app/Http/Controllers/IGD/AsuhanKeperawatanController.php:133
* @route '/igd/asuhan-keperawatan/{noRawat}'
*/
destroy.delete = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const asuhanKeperawatan = {
    index: Object.assign(index, index),
    edit: Object.assign(edit, edit),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default asuhanKeperawatan