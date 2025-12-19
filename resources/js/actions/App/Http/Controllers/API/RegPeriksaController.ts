import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\API\RegPeriksaController::findByNoRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
export const findByNoRawat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findByNoRawat.url(options),
    method: 'get',
})

findByNoRawat.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/by-rawat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::findByNoRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
findByNoRawat.url = (options?: RouteQueryOptions) => {
    return findByNoRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::findByNoRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
findByNoRawat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findByNoRawat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::findByNoRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:110
* @route '/api/reg-periksa/by-rawat'
*/
findByNoRawat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findByNoRawat.url(options),
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
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:339
* @route '/api/reg-periksa/{regPeriksa}/keputusan'
*/
export const updateKeputusan = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusan.url(args, options),
    method: 'put',
})

updateKeputusan.definition = {
    methods: ["put"],
    url: '/api/reg-periksa/{regPeriksa}/keputusan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:339
* @route '/api/reg-periksa/{regPeriksa}/keputusan'
*/
updateKeputusan.url = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateKeputusan.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:339
* @route '/api/reg-periksa/{regPeriksa}/keputusan'
*/
updateKeputusan.put = (args: { regPeriksa: string | number } | [regPeriksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusan.url(args, options),
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
* @see app/Http/Controllers/API/RegPeriksaController.php:425
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
* @see app/Http/Controllers/API/RegPeriksaController.php:425
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
* @see app/Http/Controllers/API/RegPeriksaController.php:425
* @route '/api/reg-periksa/{regPeriksa}'
*/
destroy.delete = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/API/RegPeriksaController.php:445
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
* @see app/Http/Controllers/API/RegPeriksaController.php:445
* @route '/api/reg-periksa/hitung-umur'
*/
hitungUmur.url = (options?: RouteQueryOptions) => {
    return hitungUmur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/API/RegPeriksaController.php:445
* @route '/api/reg-periksa/hitung-umur'
*/
hitungUmur.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
* @see app/Http/Controllers/API/RegPeriksaController.php:480
* @route '/api/reg-periksa/statistik'
*/
export const getStatistik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistik.url(options),
    method: 'get',
})

getStatistik.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/statistik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
* @see app/Http/Controllers/API/RegPeriksaController.php:480
* @route '/api/reg-periksa/statistik'
*/
getStatistik.url = (options?: RouteQueryOptions) => {
    return getStatistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
* @see app/Http/Controllers/API/RegPeriksaController.php:480
* @route '/api/reg-periksa/statistik'
*/
getStatistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
* @see app/Http/Controllers/API/RegPeriksaController.php:480
* @route '/api/reg-periksa/statistik'
*/
getStatistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
* @see app/Http/Controllers/API/RegPeriksaController.php:516
* @route '/api/reg-periksa/filter-data'
*/
export const getFilterData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFilterData.url(options),
    method: 'get',
})

getFilterData.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa/filter-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
* @see app/Http/Controllers/API/RegPeriksaController.php:516
* @route '/api/reg-periksa/filter-data'
*/
getFilterData.url = (options?: RouteQueryOptions) => {
    return getFilterData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
* @see app/Http/Controllers/API/RegPeriksaController.php:516
* @route '/api/reg-periksa/filter-data'
*/
getFilterData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFilterData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
* @see app/Http/Controllers/API/RegPeriksaController.php:516
* @route '/api/reg-periksa/filter-data'
*/
getFilterData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFilterData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusanByRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:382
* @route '/api/reg-periksa-actions/update-keputusan'
*/
export const updateKeputusanByRawat = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusanByRawat.url(options),
    method: 'put',
})

updateKeputusanByRawat.definition = {
    methods: ["put","post"],
    url: '/api/reg-periksa-actions/update-keputusan',
} satisfies RouteDefinition<["put","post"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusanByRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:382
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusanByRawat.url = (options?: RouteQueryOptions) => {
    return updateKeputusanByRawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusanByRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:382
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusanByRawat.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusanByRawat.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusanByRawat
* @see app/Http/Controllers/API/RegPeriksaController.php:382
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusanByRawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateKeputusanByRawat.url(options),
    method: 'post',
})

const RegPeriksaController = { store, findByNoRawat, updateStatusBayar, updateKeputusan, show, update, destroy, hitungUmur, getStatistik, getFilterData, updateKeputusanByRawat }

export default RegPeriksaController