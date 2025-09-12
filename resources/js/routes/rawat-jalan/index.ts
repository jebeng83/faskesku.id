import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import pemeriksaanRalan from './pemeriksaan-ralan'
/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
export const pemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

pemeriksaanRalan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
pemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
pemeriksaanRalan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
pemeriksaanRalan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::statistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan-statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::statistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::statistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::statistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::index
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::index
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::index
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::index
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::create
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::create
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::create
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::create
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::store
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::show
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
export const show = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::show
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
show.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rawat_jalan: args.rawat_jalan,
                }

    return show.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::show
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
show.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::show
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
show.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::edit
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
export const edit = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::edit
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
edit.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rawat_jalan: args.rawat_jalan,
                }

    return edit.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::edit
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
edit.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::edit
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
edit.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::update
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
export const update = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatJalanController::update
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
update.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rawat_jalan: args.rawat_jalan,
                }

    return update.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::update
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
update.put = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RawatJalanController::update
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
update.patch = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatJalanController::destroy
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
export const destroy = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalanController::destroy
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
destroy.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rawat_jalan: args.rawat_jalan,
                }

    return destroy.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::destroy
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
destroy.delete = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const rawatJalan = {
    lanjutan,
riwayat,
pemeriksaanRalan,
statistics,
index,
create,
store,
show,
edit,
update,
destroy,
}

export default rawatJalan