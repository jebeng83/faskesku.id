import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::index
* @see app/Http/Controllers/Akutansi/SetAkunController.php:30
* @route '/api/akutansi/pengaturan-rekening'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pengaturan-rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::index
* @see app/Http/Controllers/Akutansi/SetAkunController.php:30
* @route '/api/akutansi/pengaturan-rekening'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::index
* @see app/Http/Controllers/Akutansi/SetAkunController.php:30
* @route '/api/akutansi/pengaturan-rekening'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::index
* @see app/Http/Controllers/Akutansi/SetAkunController.php:30
* @route '/api/akutansi/pengaturan-rekening'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::rekening
* @see app/Http/Controllers/Akutansi/SetAkunController.php:153
* @route '/api/akutansi/pengaturan-rekening/rekening'
*/
export const rekening = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekening.url(options),
    method: 'get',
})

rekening.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pengaturan-rekening/rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::rekening
* @see app/Http/Controllers/Akutansi/SetAkunController.php:153
* @route '/api/akutansi/pengaturan-rekening/rekening'
*/
rekening.url = (options?: RouteQueryOptions) => {
    return rekening.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::rekening
* @see app/Http/Controllers/Akutansi/SetAkunController.php:153
* @route '/api/akutansi/pengaturan-rekening/rekening'
*/
rekening.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekening.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::rekening
* @see app/Http/Controllers/Akutansi/SetAkunController.php:153
* @route '/api/akutansi/pengaturan-rekening/rekening'
*/
rekening.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rekening.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::show
* @see app/Http/Controllers/Akutansi/SetAkunController.php:71
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
export const show = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pengaturan-rekening/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::show
* @see app/Http/Controllers/Akutansi/SetAkunController.php:71
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
show.url = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

    if (Array.isArray(args)) {
        args = {
            section: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        section: args.section,
    }

    return show.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::show
* @see app/Http/Controllers/Akutansi/SetAkunController.php:71
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
show.get = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::show
* @see app/Http/Controllers/Akutansi/SetAkunController.php:71
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
show.head = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::update
* @see app/Http/Controllers/Akutansi/SetAkunController.php:94
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
export const update = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/pengaturan-rekening/{section}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::update
* @see app/Http/Controllers/Akutansi/SetAkunController.php:94
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
update.url = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

    if (Array.isArray(args)) {
        args = {
            section: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        section: args.section,
    }

    return update.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\SetAkunController::update
* @see app/Http/Controllers/Akutansi/SetAkunController.php:94
* @route '/api/akutansi/pengaturan-rekening/{section}'
*/
update.put = (args: { section: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

const pengaturanRekening = {
    index: Object.assign(index, index),
    rekening: Object.assign(rekening, rekening),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
}

export default pengaturanRekening