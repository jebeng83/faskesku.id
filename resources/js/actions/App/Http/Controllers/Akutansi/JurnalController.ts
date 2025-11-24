import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:20
* @route '/akutansi/jurnal'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/jurnal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:20
* @route '/akutansi/jurnal'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:20
* @route '/akutansi/jurnal'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::page
* @see app/Http/Controllers/Akutansi/JurnalController.php:20
* @route '/akutansi/jurnal'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

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
* @see \App\Http\Controllers\Akutansi\JurnalController::previewFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
export const previewFromTemp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewFromTemp.url(options),
    method: 'post',
})

previewFromTemp.definition = {
    methods: ["post"],
    url: '/api/akutansi/jurnal/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::previewFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
previewFromTemp.url = (options?: RouteQueryOptions) => {
    return previewFromTemp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::previewFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:232
* @route '/api/akutansi/jurnal/preview'
*/
previewFromTemp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewFromTemp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::postFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
export const postFromTemp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: postFromTemp.url(options),
    method: 'post',
})

postFromTemp.definition = {
    methods: ["post"],
    url: '/api/akutansi/jurnal/post',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::postFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
postFromTemp.url = (options?: RouteQueryOptions) => {
    return postFromTemp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\JurnalController::postFromTemp
* @see app/Http/Controllers/Akutansi/JurnalController.php:242
* @route '/api/akutansi/jurnal/post'
*/
postFromTemp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: postFromTemp.url(options),
    method: 'post',
})

const JurnalController = { page, index, show, store, update, destroy, previewFromTemp, postFromTemp }

export default JurnalController