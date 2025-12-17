import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RadiologiController::index
 * @see app/Http/Controllers/RadiologiController.php:16
 * @route '/radiologi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/radiologi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RadiologiController::index
 * @see app/Http/Controllers/RadiologiController.php:16
 * @route '/radiologi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::index
 * @see app/Http/Controllers/RadiologiController.php:16
 * @route '/radiologi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RadiologiController::index
 * @see app/Http/Controllers/RadiologiController.php:16
 * @route '/radiologi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RadiologiController::create
 * @see app/Http/Controllers/RadiologiController.php:95
 * @route '/radiologi/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/radiologi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RadiologiController::create
 * @see app/Http/Controllers/RadiologiController.php:95
 * @route '/radiologi/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::create
 * @see app/Http/Controllers/RadiologiController.php:95
 * @route '/radiologi/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RadiologiController::create
 * @see app/Http/Controllers/RadiologiController.php:95
 * @route '/radiologi/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RadiologiController::store
 * @see app/Http/Controllers/RadiologiController.php:105
 * @route '/radiologi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/radiologi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RadiologiController::store
 * @see app/Http/Controllers/RadiologiController.php:105
 * @route '/radiologi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::store
 * @see app/Http/Controllers/RadiologiController.php:105
 * @route '/radiologi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RadiologiController::show
 * @see app/Http/Controllers/RadiologiController.php:115
 * @route '/radiologi/{radiologi}'
 */
export const show = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/radiologi/{radiologi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RadiologiController::show
 * @see app/Http/Controllers/RadiologiController.php:115
 * @route '/radiologi/{radiologi}'
 */
show.url = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { radiologi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    radiologi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        radiologi: args.radiologi,
                }

    return show.definition.url
            .replace('{radiologi}', parsedArgs.radiologi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::show
 * @see app/Http/Controllers/RadiologiController.php:115
 * @route '/radiologi/{radiologi}'
 */
show.get = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RadiologiController::show
 * @see app/Http/Controllers/RadiologiController.php:115
 * @route '/radiologi/{radiologi}'
 */
show.head = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RadiologiController::edit
 * @see app/Http/Controllers/RadiologiController.php:134
 * @route '/radiologi/{radiologi}/edit'
 */
export const edit = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/radiologi/{radiologi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RadiologiController::edit
 * @see app/Http/Controllers/RadiologiController.php:134
 * @route '/radiologi/{radiologi}/edit'
 */
edit.url = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { radiologi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    radiologi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        radiologi: args.radiologi,
                }

    return edit.definition.url
            .replace('{radiologi}', parsedArgs.radiologi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::edit
 * @see app/Http/Controllers/RadiologiController.php:134
 * @route '/radiologi/{radiologi}/edit'
 */
edit.get = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RadiologiController::edit
 * @see app/Http/Controllers/RadiologiController.php:134
 * @route '/radiologi/{radiologi}/edit'
 */
edit.head = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RadiologiController::update
 * @see app/Http/Controllers/RadiologiController.php:153
 * @route '/radiologi/{radiologi}'
 */
export const update = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/radiologi/{radiologi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RadiologiController::update
 * @see app/Http/Controllers/RadiologiController.php:153
 * @route '/radiologi/{radiologi}'
 */
update.url = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { radiologi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    radiologi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        radiologi: args.radiologi,
                }

    return update.definition.url
            .replace('{radiologi}', parsedArgs.radiologi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::update
 * @see app/Http/Controllers/RadiologiController.php:153
 * @route '/radiologi/{radiologi}'
 */
update.put = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RadiologiController::update
 * @see app/Http/Controllers/RadiologiController.php:153
 * @route '/radiologi/{radiologi}'
 */
update.patch = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RadiologiController::destroy
 * @see app/Http/Controllers/RadiologiController.php:179
 * @route '/radiologi/{radiologi}'
 */
export const destroy = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/radiologi/{radiologi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RadiologiController::destroy
 * @see app/Http/Controllers/RadiologiController.php:179
 * @route '/radiologi/{radiologi}'
 */
destroy.url = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { radiologi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    radiologi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        radiologi: args.radiologi,
                }

    return destroy.definition.url
            .replace('{radiologi}', parsedArgs.radiologi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RadiologiController::destroy
 * @see app/Http/Controllers/RadiologiController.php:179
 * @route '/radiologi/{radiologi}'
 */
destroy.delete = (args: { radiologi: string | number } | [radiologi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const RadiologiController = { index, create, store, show, edit, update, destroy }

export default RadiologiController