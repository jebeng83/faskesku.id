import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::index
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:18
* @route '/api/racikan-template'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/racikan-template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::index
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:18
* @route '/api/racikan-template'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::index
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:18
* @route '/api/racikan-template'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::index
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:18
* @route '/api/racikan-template'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::store
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:39
* @route '/api/racikan-template'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/racikan-template',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::store
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:39
* @route '/api/racikan-template'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::store
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:39
* @route '/api/racikan-template'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::show
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:111
* @route '/api/racikan-template/{no_template}'
*/
export const show = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/racikan-template/{no_template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::show
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:111
* @route '/api/racikan-template/{no_template}'
*/
show.url = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_template: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_template: args.no_template,
    }

    return show.definition.url
            .replace('{no_template}', parsedArgs.no_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::show
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:111
* @route '/api/racikan-template/{no_template}'
*/
show.get = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::show
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:111
* @route '/api/racikan-template/{no_template}'
*/
show.head = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::destroy
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:177
* @route '/api/racikan-template/{no_template}'
*/
export const destroy = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/racikan-template/{no_template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::destroy
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:177
* @route '/api/racikan-template/{no_template}'
*/
destroy.url = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_template: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_template: args.no_template,
    }

    return destroy.definition.url
            .replace('{no_template}', parsedArgs.no_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\TemplateRacikanController::destroy
* @see app/Http/Controllers/Farmasi/TemplateRacikanController.php:177
* @route '/api/racikan-template/{no_template}'
*/
destroy.delete = (args: { no_template: string | number } | [no_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const racikanTemplate = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    destroy: Object.assign(destroy, destroy),
}

export default racikanTemplate