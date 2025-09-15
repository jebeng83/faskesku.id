import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:19
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:19
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:19
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:19
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:19
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:19
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\RegPeriksaController::index
* @see app/Http/Controllers/API/RegPeriksaController.php:19
* @route '/api/reg-periksa'
*/
=======
/**
* @see \App\Http\Controllers\API\RegPeriksaController::index
 * @see app/Http/Controllers/API/RegPeriksaController.php:19
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:97
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:97
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:97
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:97
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:97
* @route '/api/reg-periksa'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:97
 * @route '/api/reg-periksa'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:157
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:157
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:157
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:157
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
show.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
            args = { regPeriksa: args.no_rawat }
        }
    
    if (Array.isArray(args)) {
        args = {
                    regPeriksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }
=======
                        regPeriksa: typeof args.regPeriksa === 'object'
                ? args.regPeriksa.no_rawat
                : args.regPeriksa,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:157
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:157
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
show.get = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
* @see app/Http/Controllers/API/RegPeriksaController.php:157
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
/**
* @see \App\Http\Controllers\API\RegPeriksaController::show
 * @see app/Http/Controllers/API/RegPeriksaController.php:157
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
show.head = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:178
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:178
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:178
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:178
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
update.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
            args = { regPeriksa: args.no_rawat }
        }
    
    if (Array.isArray(args)) {
        args = {
                    regPeriksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }
=======
                        regPeriksa: typeof args.regPeriksa === 'object'
                ? args.regPeriksa.no_rawat
                : args.regPeriksa,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:178
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:178
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
update.put = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:244
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:244
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:244
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:244
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
destroy.url = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regPeriksa: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
        args = { regPeriksa: args.no_rawat }
    }

    if (Array.isArray(args)) {
        args = {
            regPeriksa: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'no_rawat' in args) {
            args = { regPeriksa: args.no_rawat }
        }
    
    if (Array.isArray(args)) {
        args = {
                    regPeriksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        regPeriksa: typeof args.regPeriksa === 'object'
        ? args.regPeriksa.no_rawat
        : args.regPeriksa,
    }
=======
                        regPeriksa: typeof args.regPeriksa === 'object'
                ? args.regPeriksa.no_rawat
                : args.regPeriksa,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{regPeriksa}', parsedArgs.regPeriksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:244
* @route '/api/reg-periksa/{regPeriksa}'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:244
 * @route '/api/reg-periksa/{regPeriksa}'
 */
>>>>>>> kohsun
destroy.delete = (args: { regPeriksa: string | { no_rawat: string } } | [regPeriksa: string | { no_rawat: string } ] | string | { no_rawat: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:264
* @route '/api/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:264
 * @route '/api/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:264
* @route '/api/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:264
 * @route '/api/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
hitungUmur.url = (options?: RouteQueryOptions) => {
    return hitungUmur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::hitungUmur
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:264
* @route '/api/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:264
 * @route '/api/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
hitungUmur.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:299
* @route '/api/reg-periksa/statistik'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:299
 * @route '/api/reg-periksa/statistik'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:299
* @route '/api/reg-periksa/statistik'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:299
 * @route '/api/reg-periksa/statistik'
 */
>>>>>>> kohsun
getStatistik.url = (options?: RouteQueryOptions) => {
    return getStatistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:299
* @route '/api/reg-periksa/statistik'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:299
 * @route '/api/reg-periksa/statistik'
 */
>>>>>>> kohsun
getStatistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistik.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
* @see app/Http/Controllers/API/RegPeriksaController.php:299
* @route '/api/reg-periksa/statistik'
*/
=======
/**
* @see \App\Http\Controllers\API\RegPeriksaController::getStatistik
 * @see app/Http/Controllers/API/RegPeriksaController.php:299
 * @route '/api/reg-periksa/statistik'
 */
>>>>>>> kohsun
getStatistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:335
* @route '/api/reg-periksa/filter-data'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:335
 * @route '/api/reg-periksa/filter-data'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:335
* @route '/api/reg-periksa/filter-data'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:335
 * @route '/api/reg-periksa/filter-data'
 */
>>>>>>> kohsun
getFilterData.url = (options?: RouteQueryOptions) => {
    return getFilterData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
<<<<<<< HEAD
* @see app/Http/Controllers/API/RegPeriksaController.php:335
* @route '/api/reg-periksa/filter-data'
*/
=======
 * @see app/Http/Controllers/API/RegPeriksaController.php:335
 * @route '/api/reg-periksa/filter-data'
 */
>>>>>>> kohsun
getFilterData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFilterData.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
* @see app/Http/Controllers/API/RegPeriksaController.php:335
* @route '/api/reg-periksa/filter-data'
*/
=======
/**
* @see \App\Http\Controllers\API\RegPeriksaController::getFilterData
 * @see app/Http/Controllers/API/RegPeriksaController.php:335
 * @route '/api/reg-periksa/filter-data'
 */
>>>>>>> kohsun
getFilterData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFilterData.url(options),
    method: 'head',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const RegPeriksaController = { index, store, show, update, destroy, hitungUmur, getStatistik, getFilterData }

export default RegPeriksaController