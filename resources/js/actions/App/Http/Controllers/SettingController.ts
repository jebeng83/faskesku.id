import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::getImage
* @see app/Http/Controllers/SettingController.php:273
* @route '/settings/{setting}/image/{type}'
*/
export const getImage = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getImage.url(args, options),
    method: 'get',
})

getImage.definition = {
    methods: ["get","head"],
    url: '/settings/{setting}/image/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::getImage
* @see app/Http/Controllers/SettingController.php:273
* @route '/settings/{setting}/image/{type}'
*/
getImage.url = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions) => {
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

    return getImage.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::getImage
* @see app/Http/Controllers/SettingController.php:273
* @route '/settings/{setting}/image/{type}'
*/
getImage.get = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::getImage
* @see app/Http/Controllers/SettingController.php:273
* @route '/settings/{setting}/image/{type}'
*/
getImage.head = (args: { setting: string | number, type: string | number } | [setting: string | number, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getImage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::getActiveSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
export const getActiveSetting = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActiveSetting.url(options),
    method: 'get',
})

getActiveSetting.definition = {
    methods: ["get","head"],
    url: '/api/active-setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::getActiveSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
getActiveSetting.url = (options?: RouteQueryOptions) => {
    return getActiveSetting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::getActiveSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
getActiveSetting.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActiveSetting.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::getActiveSetting
* @see app/Http/Controllers/SettingController.php:307
* @route '/api/active-setting'
*/
getActiveSetting.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getActiveSetting.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::destroy
* @see app/Http/Controllers/SettingController.php:245
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
* @see app/Http/Controllers/SettingController.php:245
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
* @see app/Http/Controllers/SettingController.php:245
* @route '/settings/{nama_instansi}'
*/
destroy.delete = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:14
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
* @see app/Http/Controllers/SettingController.php:14
* @route '/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:14
* @route '/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::index
* @see app/Http/Controllers/SettingController.php:14
* @route '/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:65
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
* @see app/Http/Controllers/SettingController.php:65
* @route '/settings/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:65
* @route '/settings/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::create
* @see app/Http/Controllers/SettingController.php:65
* @route '/settings/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::store
* @see app/Http/Controllers/SettingController.php:73
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
* @see app/Http/Controllers/SettingController.php:73
* @route '/settings'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::store
* @see app/Http/Controllers/SettingController.php:73
* @route '/settings'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:152
* @route '/settings/{setting}'
*/
export const show = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/settings/{setting}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:152
* @route '/settings/{setting}'
*/
show.url = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:152
* @route '/settings/{setting}'
*/
show.get = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::show
* @see app/Http/Controllers/SettingController.php:152
* @route '/settings/{setting}'
*/
show.head = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:160
* @route '/settings/{setting}/edit'
*/
export const edit = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/{setting}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:160
* @route '/settings/{setting}/edit'
*/
edit.url = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:160
* @route '/settings/{setting}/edit'
*/
edit.get = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SettingController::edit
* @see app/Http/Controllers/SettingController.php:160
* @route '/settings/{setting}/edit'
*/
edit.head = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:168
* @route '/settings/{setting}'
*/
export const update = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/settings/{setting}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:168
* @route '/settings/{setting}'
*/
update.url = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:168
* @route '/settings/{setting}'
*/
update.put = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SettingController::update
* @see app/Http/Controllers/SettingController.php:168
* @route '/settings/{setting}'
*/
update.patch = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SettingController::activate
* @see app/Http/Controllers/SettingController.php:258
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
* @see app/Http/Controllers/SettingController.php:258
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
* @see app/Http/Controllers/SettingController.php:258
* @route '/settings/{setting}/activate'
*/
activate.post = (args: { setting: string | { nama_instansi: string } } | [setting: string | { nama_instansi: string } ] | string | { nama_instansi: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

const SettingController = { getImage, getActiveSetting, destroy, index, create, store, show, edit, update, activate }

export default SettingControllerage, getActiveSetting, destroy, index, create, store, show, edit, update, activate }

export default SettingController