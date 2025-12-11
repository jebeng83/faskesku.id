import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::index
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:18
* @route '/sip-pegawai'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sip-pegawai',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::index
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:18
* @route '/sip-pegawai'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::index
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:18
* @route '/sip-pegawai'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::index
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:18
* @route '/sip-pegawai'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::create
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:48
* @route '/sip-pegawai/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sip-pegawai/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::create
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:48
* @route '/sip-pegawai/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::create
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:48
* @route '/sip-pegawai/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::create
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:48
* @route '/sip-pegawai/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::store
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:72
* @route '/sip-pegawai'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sip-pegawai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::store
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:72
* @route '/sip-pegawai'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::store
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:72
* @route '/sip-pegawai'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::show
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:108
* @route '/sip-pegawai/{nik}'
*/
export const show = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sip-pegawai/{nik}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::show
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:108
* @route '/sip-pegawai/{nik}'
*/
show.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nik: args.nik,
    }

    return show.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::show
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:108
* @route '/sip-pegawai/{nik}'
*/
show.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::show
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:108
* @route '/sip-pegawai/{nik}'
*/
show.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::edit
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:121
* @route '/sip-pegawai/{nik}/edit'
*/
export const edit = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sip-pegawai/{nik}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::edit
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:121
* @route '/sip-pegawai/{nik}/edit'
*/
edit.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nik: args.nik,
    }

    return edit.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::edit
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:121
* @route '/sip-pegawai/{nik}/edit'
*/
edit.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::edit
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:121
* @route '/sip-pegawai/{nik}/edit'
*/
edit.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
const update9cb7eb1ead98ed007dac591fe6e35c5a = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9cb7eb1ead98ed007dac591fe6e35c5a.url(args, options),
    method: 'put',
})

update9cb7eb1ead98ed007dac591fe6e35c5a.definition = {
    methods: ["put"],
    url: '/sip-pegawai/{nik}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
update9cb7eb1ead98ed007dac591fe6e35c5a.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nik: args.nik,
    }

    return update9cb7eb1ead98ed007dac591fe6e35c5a.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
update9cb7eb1ead98ed007dac591fe6e35c5a.put = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9cb7eb1ead98ed007dac591fe6e35c5a.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
const update9cb7eb1ead98ed007dac591fe6e35c5a = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9cb7eb1ead98ed007dac591fe6e35c5a.url(args, options),
    method: 'patch',
})

update9cb7eb1ead98ed007dac591fe6e35c5a.definition = {
    methods: ["patch"],
    url: '/sip-pegawai/{nik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
update9cb7eb1ead98ed007dac591fe6e35c5a.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nik: args.nik,
    }

    return update9cb7eb1ead98ed007dac591fe6e35c5a.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::update
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
* @route '/sip-pegawai/{nik}'
*/
update9cb7eb1ead98ed007dac591fe6e35c5a.patch = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9cb7eb1ead98ed007dac591fe6e35c5a.url(args, options),
    method: 'patch',
})

export const update = {
    '/sip-pegawai/{nik}': update9cb7eb1ead98ed007dac591fe6e35c5a,
    '/sip-pegawai/{nik}': update9cb7eb1ead98ed007dac591fe6e35c5a,
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::destroy
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:186
* @route '/sip-pegawai/{nik}'
*/
export const destroy = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sip-pegawai/{nik}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::destroy
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:186
* @route '/sip-pegawai/{nik}'
*/
destroy.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nik: args.nik,
    }

    return destroy.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::destroy
* @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:186
* @route '/sip-pegawai/{nik}'
*/
destroy.delete = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SipPegawaiController = { index, create, store, show, edit, update, destroy }

export default SipPegawaiController