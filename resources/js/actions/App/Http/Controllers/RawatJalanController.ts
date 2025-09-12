import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\RawatJalanController::storePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
export const storePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRalan.url(options),
    method: 'post',
})

storePemeriksaanRalan.definition = {
    methods: ["post"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalanController::storePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
storePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return storePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::storePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
storePemeriksaanRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::deletePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
export const deletePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRalan.url(options),
    method: 'delete',
})

deletePemeriksaanRalan.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalanController::deletePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
deletePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return deletePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::deletePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
deletePemeriksaanRalan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRalan.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalanController::updatePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
export const updatePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRalan.url(options),
    method: 'put',
})

updatePemeriksaanRalan.definition = {
    methods: ["put"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalanController::updatePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
updatePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return updatePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::updatePemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
updatePemeriksaanRalan.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRalan.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
export const searchPegawai = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPegawai.url(options),
    method: 'get',
})

searchPegawai.definition = {
    methods: ["get","head"],
    url: '/pegawai/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
searchPegawai.url = (options?: RouteQueryOptions) => {
    return searchPegawai.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
searchPegawai.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPegawai.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
searchPegawai.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPegawai.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
export const getStatistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

getStatistics.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan-statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
getStatistics.url = (options?: RouteQueryOptions) => {
    return getStatistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
getStatistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
getStatistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistics.url(options),
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
const RawatJalanController = { lanjutan, riwayat, pemeriksaanRalan, storePemeriksaanRalan, deletePemeriksaanRalan, updatePemeriksaanRalan, searchPegawai, getStatistics, index, create, store, show, edit, update, destroy }

export default RawatJalanController