import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:16
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reg-periksa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:16
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::index
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:16
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::index
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::index
 * @see app/Http/Controllers/RegPeriksaController.php:16
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::create
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:28
 * @route '/reg-periksa/create'
 */
>>>>>>> kohsun
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reg-periksa/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::create
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:28
 * @route '/reg-periksa/create'
 */
>>>>>>> kohsun
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::create
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:28
 * @route '/reg-periksa/create'
 */
>>>>>>> kohsun
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::create
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::create
 * @see app/Http/Controllers/RegPeriksaController.php:28
 * @route '/reg-periksa/create'
 */
>>>>>>> kohsun
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:43
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/reg-periksa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:43
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:43
 * @route '/reg-periksa'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::show
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:95
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
export const show = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/reg-periksa/{reg_periksa}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::show
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:95
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
show.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    reg_periksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        reg_periksa: args.reg_periksa,
    }
=======
                        reg_periksa: args.reg_periksa,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::show
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:95
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
show.get = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::show
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::show
 * @see app/Http/Controllers/RegPeriksaController.php:95
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
show.head = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:104
 * @route '/reg-periksa/{reg_periksa}/edit'
 */
>>>>>>> kohsun
export const edit = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/reg-periksa/{reg_periksa}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:104
 * @route '/reg-periksa/{reg_periksa}/edit'
 */
>>>>>>> kohsun
edit.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    reg_periksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        reg_periksa: args.reg_periksa,
    }
=======
                        reg_periksa: args.reg_periksa,
                }
>>>>>>> kohsun

    return edit.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:104
 * @route '/reg-periksa/{reg_periksa}/edit'
 */
>>>>>>> kohsun
edit.get = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::edit
 * @see app/Http/Controllers/RegPeriksaController.php:104
 * @route '/reg-periksa/{reg_periksa}/edit'
 */
>>>>>>> kohsun
edit.head = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:120
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
export const update = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/reg-periksa/{reg_periksa}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:120
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
update.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    reg_periksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        reg_periksa: args.reg_periksa,
    }
=======
                        reg_periksa: args.reg_periksa,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:120
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
update.put = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::update
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::update
 * @see app/Http/Controllers/RegPeriksaController.php:120
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
update.patch = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:143
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
export const destroy = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/reg-periksa/{reg_periksa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:143
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
destroy.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    reg_periksa: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        reg_periksa: args.reg_periksa,
    }
=======
                        reg_periksa: args.reg_periksa,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:143
 * @route '/reg-periksa/{reg_periksa}'
 */
>>>>>>> kohsun
destroy.delete = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::hitungUmur
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:151
 * @route '/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
export const hitungUmur = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

hitungUmur.definition = {
    methods: ["post"],
    url: '/reg-periksa/hitung-umur',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::hitungUmur
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:151
 * @route '/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
hitungUmur.url = (options?: RouteQueryOptions) => {
    return hitungUmur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::hitungUmur
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:151
 * @route '/reg-periksa/hitung-umur'
 */
>>>>>>> kohsun
hitungUmur.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::getStatistik
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:164
 * @route '/reg-periksa-statistik'
 */
>>>>>>> kohsun
export const getStatistik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistik.url(options),
    method: 'get',
})

getStatistik.definition = {
    methods: ["get","head"],
    url: '/reg-periksa-statistik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::getStatistik
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:164
 * @route '/reg-periksa-statistik'
 */
>>>>>>> kohsun
getStatistik.url = (options?: RouteQueryOptions) => {
    return getStatistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::getStatistik
<<<<<<< HEAD
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
=======
 * @see app/Http/Controllers/RegPeriksaController.php:164
 * @route '/reg-periksa-statistik'
 */
>>>>>>> kohsun
getStatistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistik.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RegPeriksaController::getStatistik
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
=======
/**
* @see \App\Http\Controllers\RegPeriksaController::getStatistik
 * @see app/Http/Controllers/RegPeriksaController.php:164
 * @route '/reg-periksa-statistik'
 */
>>>>>>> kohsun
getStatistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistik.url(options),
    method: 'head',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const RegPeriksaController = { index, create, store, show, edit, update, destroy, hitungUmur, getStatistik }

export default RegPeriksaController