import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::index
* @see app/Http/Controllers/Akutansi/JurnalController.php:34
* @route '/api/akutansi/jurnal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/jurnal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::index
* @see app/Http/Controllers/Akutansi/JurnalController.php:34
* @route '/api/akutansi/jurnal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::index
* @see app/Http/Controllers/Akutansi/JurnalController.php:34
* @route '/api/akutansi/jurnal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::index
* @see app/Http/Controllers/Akutansi/JurnalController.php:34
* @route '/api/akutansi/jurnal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::show
* @see app/Http/Controllers/Akutansi/JurnalController.php:117
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
export const show = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/jurnal/{no_jurnal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::show
* @see app/Http/Controllers/Akutansi/JurnalController.php:117
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
show.url = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_jurnal: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_jurnal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_jurnal: args.no_jurnal,
    }

    return show.definition.url
            .replace('{no_jurnal}', parsedArgs.no_jurnal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::show
* @see app/Http/Controllers/Akutansi/JurnalController.php:117
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
show.get = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::show
* @see app/Http/Controllers/Akutansi/JurnalController.php:117
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
show.head = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::store
* @see app/Http/Controllers/Akutansi/JurnalController.php:149
* @route '/api/akutansi/jurnal'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/jurnal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::store
* @see app/Http/Controllers/Akutansi/JurnalController.php:149
* @route '/api/akutansi/jurnal'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::store
* @see app/Http/Controllers/Akutansi/JurnalController.php:149
* @route '/api/akutansi/jurnal'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::update
* @see app/Http/Controllers/Akutansi/JurnalController.php:270
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
export const update = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/jurnal/{no_jurnal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::update
* @see app/Http/Controllers/Akutansi/JurnalController.php:270
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
update.url = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_jurnal: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_jurnal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_jurnal: args.no_jurnal,
    }

    return update.definition.url
            .replace('{no_jurnal}', parsedArgs.no_jurnal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::update
* @see app/Http/Controllers/Akutansi/JurnalController.php:270
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
update.put = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::destroy
* @see app/Http/Controllers/Akutansi/JurnalController.php:346
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
export const destroy = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/jurnal/{no_jurnal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::destroy
* @see app/Http/Controllers/Akutansi/JurnalController.php:346
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
destroy.url = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_jurnal: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_jurnal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_jurnal: args.no_jurnal,
    }

    return destroy.definition.url
            .replace('{no_jurnal}', parsedArgs.no_jurnal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::destroy
* @see app/Http/Controllers/Akutansi/JurnalController.php:346
* @route '/api/akutansi/jurnal/{no_jurnal}'
*/
destroy.delete = (args: { no_jurnal: string | number } | [no_jurnal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::preview
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
export const preview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/api/akutansi/jurnal/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::preview
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::preview
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/api/akutansi/jurnal/post',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::post
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

const jurnal = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    preview: Object.assign(preview, preview),
    post: Object.assign(post, post),
}

export default jurnal