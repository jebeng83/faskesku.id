import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RegPeriksaController::index
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::index
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::index
* @see app/Http/Controllers/RegPeriksaController.php:16
* @route '/reg-periksa'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::create
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::create
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::create
* @see app/Http/Controllers/RegPeriksaController.php:28
* @route '/reg-periksa/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::store
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::store
* @see app/Http/Controllers/RegPeriksaController.php:43
* @route '/reg-periksa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::show
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
show.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reg_periksa: args.reg_periksa,
    }

    return show.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::show
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
show.get = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::show
* @see app/Http/Controllers/RegPeriksaController.php:95
* @route '/reg-periksa/{reg_periksa}'
*/
show.head = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
edit.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reg_periksa: args.reg_periksa,
    }

    return edit.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
edit.get = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::edit
* @see app/Http/Controllers/RegPeriksaController.php:104
* @route '/reg-periksa/{reg_periksa}/edit'
*/
edit.head = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::update
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
update.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reg_periksa: args.reg_periksa,
    }

    return update.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::update
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
update.put = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::update
* @see app/Http/Controllers/RegPeriksaController.php:120
* @route '/reg-periksa/{reg_periksa}'
*/
update.patch = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::destroy
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
destroy.url = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reg_periksa: args }
    }

    if (Array.isArray(args)) {
        args = {
            reg_periksa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reg_periksa: args.reg_periksa,
    }

    return destroy.definition.url
            .replace('{reg_periksa}', parsedArgs.reg_periksa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::destroy
* @see app/Http/Controllers/RegPeriksaController.php:143
* @route '/reg-periksa/{reg_periksa}'
*/
destroy.delete = (args: { reg_periksa: string | number } | [reg_periksa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
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
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
hitungUmur.url = (options?: RouteQueryOptions) => {
    return hitungUmur.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::hitungUmur
* @see app/Http/Controllers/RegPeriksaController.php:151
* @route '/reg-periksa/hitung-umur'
*/
hitungUmur.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitungUmur.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::statistik
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
export const statistik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})

statistik.definition = {
    methods: ["get","head"],
    url: '/reg-periksa-statistik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegPeriksaController::statistik
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
statistik.url = (options?: RouteQueryOptions) => {
    return statistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegPeriksaController::statistik
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
statistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RegPeriksaController::statistik
* @see app/Http/Controllers/RegPeriksaController.php:164
* @route '/reg-periksa-statistik'
*/
statistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistik.url(options),
    method: 'head',
})

const regPeriksa = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    hitungUmur: Object.assign(hitungUmur, hitungUmur),
    statistik: Object.assign(statistik, statistik),
}

export default regPeriksa