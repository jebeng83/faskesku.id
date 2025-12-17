import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\RegPeriksaController::store
* @see app/Http/Controllers/API/RegPeriksaController.php:150
* @route '/api/reg-periksa'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/reg-periksa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::store
* @see app/Http/Controllers/API/RegPeriksaController.php:150
* @route '/api/reg-periksa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::store
* @see app/Http/Controllers/API/RegPeriksaController.php:150
* @route '/api/reg-periksa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::byRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
export const byRawat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(options),
    method: 'get',
})

byRawat.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/by-rawat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::byRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
byRawat.url = (options?: RouteQueryOptions) => {
    return byRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::byRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
byRawat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byRawat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::byRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
byRawat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byRawat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateStatusBayar
* @see app/Http/Controllers/API/RegPeriksaController.php:297
* @route '/api/reg-periksa/{regPeriksa}/status-bayar'
*/
export const updateStatusBayar = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatusBayar.url(args, options),
    method: 'put',
})

updateStatusBayar.definition = {
    methods: ["put"],
    url: '/api/reg-periksa/{regPeriksa}/status-bayar',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateStatusBayar
* @see app/Http/Controllers/API/RegPeriksaController.php:297
* @route '/api/reg-periksa/{regPeriksa}/status-bayar'
*/
updateStatusBayar.url = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        regPeriksa: args.regPeriksa,
    }

    return updateStatusBayar.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateStatusBayar
* @see app/Http/Controllers/API/RegPeriksaController.php:297
* @route '/api/reg-periksa/{regPeriksa}/status-bayar'
*/
updateStatusBayar.put = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatusBayar.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
* @see app/Http/Controllers/API/RegPeriksaController.php:210
* @route '/api/reg-periksa/{regPeriksa}'
*/
export const show = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/{regPeriksa}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
* @see app/Http/Controllers/API/RegPeriksaController.php:210
* @route '/api/reg-periksa/{regPeriksa}'
*/
show.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }

    return show.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
* @see app/Http/Controllers/API/RegPeriksaController.php:210
* @route '/api/reg-periksa/{regPeriksa}'
*/
show.get = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
* @see app/Http/Controllers/API/RegPeriksaController.php:210
* @route '/api/reg-periksa/{regPeriksa}'
*/
show.head = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:231
* @route '/api/reg-periksa/{regPeriksa}'
*/
export const update = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/reg-periksa/{regPeriksa}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:231
* @route '/api/reg-periksa/{regPeriksa}'
*/
update.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }

    return update.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:231
* @route '/api/reg-periksa/{regPeriksa}'
*/
update.put = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::destroy
* @see app/Http/Controllers/API/RegPeriksaController.php:342
* @route '/api/reg-periksa/{regPeriksa}'
*/
export const destroy = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/reg-periksa/{regPeriksa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::destroy
* @see app/Http/Controllers/API/RegPeriksaController.php:342
* @route '/api/reg-periksa/{regPeriksa}'
*/
destroy.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }

    return destroy.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::destroy
* @see app/Http/Controllers/API/RegPeriksaController.php:342
* @route '/api/reg-periksa/{regPeriksa}'
*/
destroy.delete = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/API/RegPeriksaController.php:362
* @route '/api/reg-periksa/hitung-umur'
*/
export const hitungUmur = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

hitungUmur.definition = {
    methods: ["post"],
    url: '/api/reg-periksa/hitung-umur',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/API/RegPeriksaController.php:362
* @route '/api/reg-periksa/hitung-umur'
*/
hitungUmur.url = (options?: RouteQueryOptions) => {
    return hitungUmur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/API/RegPeriksaController.php:362
* @route '/api/reg-periksa/hitung-umur'
*/
hitungUmur.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::statistik
* @see app/Http/Controllers/API/RegPeriksaController.php:397
* @route '/api/reg-periksa/statistik'
*/
export const statistik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})

statistik.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/statistik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::statistik
* @see app/Http/Controllers/API/RegPeriksaController.php:397
* @route '/api/reg-periksa/statistik'
*/
statistik.url = (options?: RouteQueryOptions) => {
    return statistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::statistik
* @see app/Http/Controllers/API/RegPeriksaController.php:397
* @route '/api/reg-periksa/statistik'
*/
statistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::statistik
* @see app/Http/Controllers/API/RegPeriksaController.php:397
* @route '/api/reg-periksa/statistik'
*/
statistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::filterData
* @see app/Http/Controllers/API/RegPeriksaController.php:433
* @route '/api/reg-periksa/filter-data'
*/
export const filterData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: filterData.url(options),
    method: 'get',
})

filterData.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/filter-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::filterData
* @see app/Http/Controllers/API/RegPeriksaController.php:433
* @route '/api/reg-periksa/filter-data'
*/
filterData.url = (options?: RouteQueryOptions) => {
    return filterData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::filterData
* @see app/Http/Controllers/API/RegPeriksaController.php:433
* @route '/api/reg-periksa/filter-data'
*/
filterData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: filterData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::filterData
* @see app/Http/Controllers/API/RegPeriksaController.php:433
* @route '/api/reg-periksa/filter-data'
*/
filterData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: filterData.url(options),
    method: 'head',
})

const regPeriksa = {
    store: Object.assign(store, store),
    byRawat: Object.assign(byRawat, byRawat),
    updateStatusBayar: Object.assign(updateStatusBayar, updateStatusBayar),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    hitungUmur: Object.assign(hitungUmur, hitungUmur),
    statistik: Object.assign(statistik, statistik),
    filterData: Object.assign(filterData, filterData),
}

export default regPeriksa