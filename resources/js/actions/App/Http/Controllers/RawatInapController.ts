import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:257
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const pemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'get',
})

pemeriksaanRanap.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:257
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:257
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::pemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:257
* @route '/rawat-inap/pemeriksaan-ranap'
*/
pemeriksaanRanap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRanap.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:289
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const storePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRanap.url(options),
    method: 'post',
})

storePemeriksaanRanap.definition = {
    methods: ["post"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:289
* @route '/rawat-inap/pemeriksaan-ranap'
*/
storePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return storePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::storePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:289
* @route '/rawat-inap/pemeriksaan-ranap'
*/
storePemeriksaanRanap.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRanap.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:355
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const deletePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRanap.url(options),
    method: 'delete',
})

deletePemeriksaanRanap.definition = {
    methods: ["delete"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:355
* @route '/rawat-inap/pemeriksaan-ranap'
*/
deletePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return deletePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::deletePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:355
* @route '/rawat-inap/pemeriksaan-ranap'
*/
deletePemeriksaanRanap.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRanap.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:379
* @route '/rawat-inap/pemeriksaan-ranap'
*/
export const updatePemeriksaanRanap = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRanap.url(options),
    method: 'put',
})

updatePemeriksaanRanap.definition = {
    methods: ["put"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:379
* @route '/rawat-inap/pemeriksaan-ranap'
*/
updatePemeriksaanRanap.url = (options?: RouteQueryOptions) => {
    return updatePemeriksaanRanap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::updatePemeriksaanRanap
* @see app/Http/Controllers/RawatInapController.php:379
* @route '/rawat-inap/pemeriksaan-ranap'
*/
updatePemeriksaanRanap.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRanap.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatInapController::getObatRanapPublic
* @see app/Http/Controllers/RawatInapController.php:451
* @route '/rawat-inap/obat-ranap/{no_rawat}'
*/
export const getObatRanapPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getObatRanapPublic.url(args, options),
    method: 'get',
})

getObatRanapPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/obat-ranap/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::getObatRanapPublic
* @see app/Http/Controllers/RawatInapController.php:451
* @route '/rawat-inap/obat-ranap/{no_rawat}'
*/
getObatRanapPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return getObatRanapPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::getObatRanapPublic
* @see app/Http/Controllers/RawatInapController.php:451
* @route '/rawat-inap/obat-ranap/{no_rawat}'
*/
getObatRanapPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getObatRanapPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::getObatRanapPublic
* @see app/Http/Controllers/RawatInapController.php:451
* @route '/rawat-inap/obat-ranap/{no_rawat}'
*/
getObatRanapPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getObatRanapPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatInapController.php:482
* @route '/rawat-inap/lab/{no_rawat}'
*/
export const getPemeriksaanLabPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'get',
})

getPemeriksaanLabPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/lab/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatInapController.php:482
* @route '/rawat-inap/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return getPemeriksaanLabPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatInapController.php:482
* @route '/rawat-inap/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatInapController.php:482
* @route '/rawat-inap/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::getRadiologiPublic
* @see app/Http/Controllers/RawatInapController.php:503
* @route '/rawat-inap/radiologi/{no_rawat}'
*/
export const getRadiologiPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'get',
})

getRadiologiPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/radiologi/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::getRadiologiPublic
* @see app/Http/Controllers/RawatInapController.php:503
* @route '/rawat-inap/radiologi/{no_rawat}'
*/
getRadiologiPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return getRadiologiPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::getRadiologiPublic
* @see app/Http/Controllers/RawatInapController.php:503
* @route '/rawat-inap/radiologi/{no_rawat}'
*/
getRadiologiPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::getRadiologiPublic
* @see app/Http/Controllers/RawatInapController.php:503
* @route '/rawat-inap/radiologi/{no_rawat}'
*/
getRadiologiPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::riwayat
* @see app/Http/Controllers/RawatInapController.php:555
* @route '/rawat-inap/riwayat'
*/
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::riwayat
* @see app/Http/Controllers/RawatInapController.php:555
* @route '/rawat-inap/riwayat'
*/
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::riwayat
* @see app/Http/Controllers/RawatInapController.php:555
* @route '/rawat-inap/riwayat'
*/
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::riwayat
* @see app/Http/Controllers/RawatInapController.php:555
* @route '/rawat-inap/riwayat'
*/
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
export const show = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return show.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
export const edit = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return edit.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:237
* @route '/rawat-inap/{rawat_inap}'
*/
export const update = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:237
* @route '/rawat-inap/{rawat_inap}'
*/
update.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return update.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:237
* @route '/rawat-inap/{rawat_inap}'
*/
update.put = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:237
* @route '/rawat-inap/{rawat_inap}'
*/
update.patch = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:247
* @route '/rawat-inap/{rawat_inap}'
*/
export const destroy = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:247
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return destroy.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:247
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.delete = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const RawatInapController = { pemeriksaanRanap, storePemeriksaanRanap, deletePemeriksaanRanap, updatePemeriksaanRanap, getObatRanapPublic, getPemeriksaanLabPublic, getRadiologiPublic, riwayat, lanjutan, index, create, store, show, edit, update, destroy }

export default RawatInapController