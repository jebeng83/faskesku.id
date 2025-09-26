import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::active
* @see app/Http/Controllers/SettingController.php:396
* @route '/settings/active'
*/
export const active = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

active.definition = {
    methods: ["get","head"],
    url: '/settings/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::active
* @see app/Http/Controllers/SettingController.php:396
* @route '/settings/active'
*/
active.url = (options?: RouteQueryOptions) => {
    return active.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::active
* @see app/Http/Controllers/SettingController.php:396
* @route '/settings/active'
*/
active.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::active
* @see app/Http/Controllers/SettingController.php:396
* @route '/settings/active'
*/
active.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::image
* @see app/Http/Controllers/SettingController.php:290
* @route '/settings/{setting}/image/{type}'
*/
export const image = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image.url(args, options),
    method: 'get',
})

image.definition = {
    methods: ["get","head"],
    url: '/settings/{setting}/image/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::image
* @see app/Http/Controllers/SettingController.php:290
* @route '/settings/{setting}/image/{type}'
*/
image.url = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            setting: args[0],
            type: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        setting: args.setting,
        type: args.type,
    }

    return image.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::image
* @see app/Http/Controllers/SettingController.php:290
* @route '/settings/{setting}/image/{type}'
*/
image.get = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::image
* @see app/Http/Controllers/SettingController.php:290
* @route '/settings/{setting}/image/{type}'
*/
image.head = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: image.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:31
* @route '/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:31
* @route '/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:31
* @route '/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:31
* @route '/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:82
* @route '/settings/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/settings/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:82
* @route '/settings/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:82
* @route '/settings/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:82
* @route '/settings/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::store
* @see app/Http/Controllers/SettingController.php:90
* @route '/settings'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::store
* @see app/Http/Controllers/SettingController.php:90
* @route '/settings'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::store
* @see app/Http/Controllers/SettingController.php:90
* @route '/settings'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:169
* @route '/settings/{nama_instansi}'
*/
export const show = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/settings/{nama_instansi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:169
* @route '/settings/{nama_instansi}'
*/
show.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_instansi: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_instansi: args.nama_instansi,
    }

    return show.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:169
* @route '/settings/{nama_instansi}'
*/
show.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:169
* @route '/settings/{nama_instansi}'
*/
show.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:177
* @route '/settings/{nama_instansi}/edit'
*/
export const edit = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/{nama_instansi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:177
* @route '/settings/{nama_instansi}/edit'
*/
edit.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_instansi: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_instansi: args.nama_instansi,
    }

    return edit.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:177
* @route '/settings/{nama_instansi}/edit'
*/
edit.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:177
* @route '/settings/{nama_instansi}/edit'
*/
edit.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:185
* @route '/settings/{nama_instansi}'
*/
export const update = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/settings/{nama_instansi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:185
* @route '/settings/{nama_instansi}'
*/
update.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_instansi: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_instansi: args.nama_instansi,
    }

    return update.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:185
* @route '/settings/{nama_instansi}'
*/
update.put = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:185
* @route '/settings/{nama_instansi}'
*/
update.patch = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SettingController::destroy
* @see app/Http/Controllers/SettingController.php:262
* @route '/settings/{nama_instansi}'
*/
export const destroy = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/{nama_instansi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::destroy
* @see app/Http/Controllers/SettingController.php:262
* @route '/settings/{nama_instansi}'
*/
destroy.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nama_instansi: args }
    }

    if (Array.isArray(args)) {
        args = {
            nama_instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nama_instansi: args.nama_instansi,
    }

    return destroy.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::destroy
* @see app/Http/Controllers/SettingController.php:262
* @route '/settings/{nama_instansi}'
*/
destroy.delete = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SettingController::activate
* @see app/Http/Controllers/SettingController.php:275
* @route '/settings/{setting}/activate'
*/
export const activate = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/settings/{setting}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::activate
* @see app/Http/Controllers/SettingController.php:275
* @route '/settings/{setting}/activate'
*/
activate.url = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'nama_instansi' in args) {
        args = { setting: args.nama_instansi }
    }

    if (Array.isArray(args)) {
        args = {
            setting: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        setting: typeof args.setting === 'object'
        ? args.setting.nama_instansi
        : args.setting,
    }

    return activate.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::activate
* @see app/Http/Controllers/SettingController.php:275
* @route '/settings/{setting}/activate'
*/
activate.post = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

const settings = {
    active: Object.assign(active, active),
    image: Object.assign(image, image),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    activate: Object.assign(activate, activate),
}

export default settings