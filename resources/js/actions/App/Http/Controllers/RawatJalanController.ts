import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:158
* @route '/rawat-jalan/lanjutan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:158
* @route '/rawat-jalan/lanjutan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
>>>>>>> kohsun
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:158
* @route '/rawat-jalan/lanjutan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
>>>>>>> kohsun
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalanController.php:158
* @route '/rawat-jalan/lanjutan'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::lanjutan
 * @see app/Http/Controllers/RawatJalanController.php:158
 * @route '/rawat-jalan/lanjutan'
 */
>>>>>>> kohsun
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:202
* @route '/rawat-jalan/riwayat'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:202
* @route '/rawat-jalan/riwayat'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
>>>>>>> kohsun
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:202
* @route '/rawat-jalan/riwayat'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
>>>>>>> kohsun
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalanController.php:202
* @route '/rawat-jalan/riwayat'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::riwayat
 * @see app/Http/Controllers/RawatJalanController.php:202
 * @route '/rawat-jalan/riwayat'
 */
>>>>>>> kohsun
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:233
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:233
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
pemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:233
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
pemeriksaanRalan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalanController.php:233
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::pemeriksaanRalan
 * @see app/Http/Controllers/RawatJalanController.php:233
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
pemeriksaanRalan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::storePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
storePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return storePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::storePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
storePemeriksaanRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::deletePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
deletePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return deletePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::deletePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
deletePemeriksaanRalan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRalan.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalanController::updatePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
updatePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return updatePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::updatePemeriksaanRalan
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
updatePemeriksaanRalan.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRalan.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
searchPegawai.url = (options?: RouteQueryOptions) => {
    return searchPegawai.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
searchPegawai.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPegawai.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::searchPegawai
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
searchPegawai.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPegawai.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:570
* @route '/rawat-jalan-statistics'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:570
* @route '/rawat-jalan-statistics'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
>>>>>>> kohsun
getStatistics.url = (options?: RouteQueryOptions) => {
    return getStatistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:570
* @route '/rawat-jalan-statistics'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
>>>>>>> kohsun
getStatistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
* @see app/Http/Controllers/RawatJalanController.php:570
* @route '/rawat-jalan-statistics'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::getStatistics
 * @see app/Http/Controllers/RawatJalanController.php:570
 * @route '/rawat-jalan-statistics'
 */
>>>>>>> kohsun
getStatistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::index
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:17
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:17
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::index
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:17
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::index
* @see app/Http/Controllers/RawatJalanController.php:17
* @route '/rawat-jalan'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::index
 * @see app/Http/Controllers/RawatJalanController.php:17
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::create
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:90
* @route '/rawat-jalan/create'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:90
* @route '/rawat-jalan/create'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
>>>>>>> kohsun
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::create
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:90
* @route '/rawat-jalan/create'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
>>>>>>> kohsun
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::create
* @see app/Http/Controllers/RawatJalanController.php:90
* @route '/rawat-jalan/create'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::create
 * @see app/Http/Controllers/RawatJalanController.php:90
 * @route '/rawat-jalan/create'
 */
>>>>>>> kohsun
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:392
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:392
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:392
* @route '/rawat-jalan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:392
 * @route '/rawat-jalan'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::show
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:431
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:431
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
show.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        rawat_jalan: args.rawat_jalan,
    }
=======
                        rawat_jalan: args.rawat_jalan,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::show
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:431
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
show.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::show
* @see app/Http/Controllers/RawatJalanController.php:431
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::show
 * @see app/Http/Controllers/RawatJalanController.php:431
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
show.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:442
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:442
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
>>>>>>> kohsun
edit.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        rawat_jalan: args.rawat_jalan,
    }
=======
                        rawat_jalan: args.rawat_jalan,
                }
>>>>>>> kohsun

    return edit.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:442
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
>>>>>>> kohsun
edit.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalanController.php:442
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::edit
 * @see app/Http/Controllers/RawatJalanController.php:442
 * @route '/rawat-jalan/{rawat_jalan}/edit'
 */
>>>>>>> kohsun
edit.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalanController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:500
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:500
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
update.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        rawat_jalan: args.rawat_jalan,
    }
=======
                        rawat_jalan: args.rawat_jalan,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:500
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
update.put = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::update
* @see app/Http/Controllers/RawatJalanController.php:500
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::update
 * @see app/Http/Controllers/RawatJalanController.php:500
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
update.patch = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatJalanController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:536
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:536
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
destroy.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    rawat_jalan: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        rawat_jalan: args.rawat_jalan,
    }
=======
                        rawat_jalan: args.rawat_jalan,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:536
* @route '/rawat-jalan/{rawat_jalan}'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:536
 * @route '/rawat-jalan/{rawat_jalan}'
 */
>>>>>>> kohsun
destroy.delete = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const RawatJalanController = { lanjutan, riwayat, pemeriksaanRalan, storePemeriksaanRalan, deletePemeriksaanRalan, updatePemeriksaanRalan, searchPegawai, getStatistics, index, create, store, show, edit, update, destroy }

export default RawatJalanController