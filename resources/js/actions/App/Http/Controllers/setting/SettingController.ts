import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:57
* @route '/setting'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:57
* @route '/setting'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:57
* @route '/setting'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::index
* @see app/Http/Controllers/setting/SettingController.php:57
* @route '/setting'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:101
* @route '/setting/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/setting/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:101
* @route '/setting/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:101
* @route '/setting/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::describe
* @see app/Http/Controllers/setting/SettingController.php:101
* @route '/setting/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:115
* @route '/setting'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/setting',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:115
* @route '/setting'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::store
* @see app/Http/Controllers/setting/SettingController.php:115
* @route '/setting'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:145
* @route '/setting/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/setting/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:145
* @route '/setting/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::update
* @see app/Http/Controllers/setting/SettingController.php:145
* @route '/setting/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:164
* @route '/setting/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/setting/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:164
* @route '/setting/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
* @see app/Http/Controllers/setting/SettingController.php:164
* @route '/setting/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appIndex
* @see app/Http/Controllers/setting/SettingController.php:182
* @route '/setting/app'
*/
export const appIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appIndex.url(options),
    method: 'get',
})

appIndex.definition = {
    methods: ["get","head"],
    url: '/setting/app',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appIndex
* @see app/Http/Controllers/setting/SettingController.php:182
* @route '/setting/app'
*/
appIndex.url = (options?: RouteQueryOptions) => {
    return appIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appIndex
* @see app/Http/Controllers/setting/SettingController.php:182
* @route '/setting/app'
*/
appIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appIndex
* @see app/Http/Controllers/setting/SettingController.php:182
* @route '/setting/app'
*/
appIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appStore
* @see app/Http/Controllers/setting/SettingController.php:243
* @route '/setting/app'
*/
export const appStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: appStore.url(options),
    method: 'post',
})

appStore.definition = {
    methods: ["post"],
    url: '/setting/app',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appStore
* @see app/Http/Controllers/setting/SettingController.php:243
* @route '/setting/app'
*/
appStore.url = (options?: RouteQueryOptions) => {
    return appStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appStore
* @see app/Http/Controllers/setting/SettingController.php:243
* @route '/setting/app'
*/
appStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: appStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appUpdate
* @see app/Http/Controllers/setting/SettingController.php:297
* @route '/setting/app/{nama_instansi}'
*/
export const appUpdate = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: appUpdate.url(args, options),
    method: 'put',
})

appUpdate.definition = {
    methods: ["put"],
    url: '/setting/app/{nama_instansi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appUpdate
* @see app/Http/Controllers/setting/SettingController.php:297
* @route '/setting/app/{nama_instansi}'
*/
appUpdate.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return appUpdate.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appUpdate
* @see app/Http/Controllers/setting/SettingController.php:297
* @route '/setting/app/{nama_instansi}'
*/
appUpdate.put = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: appUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appDestroy
* @see app/Http/Controllers/setting/SettingController.php:400
* @route '/setting/app/{nama_instansi}'
*/
export const appDestroy = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: appDestroy.url(args, options),
    method: 'delete',
})

appDestroy.definition = {
    methods: ["delete"],
    url: '/setting/app/{nama_instansi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appDestroy
* @see app/Http/Controllers/setting/SettingController.php:400
* @route '/setting/app/{nama_instansi}'
*/
appDestroy.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return appDestroy.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appDestroy
* @see app/Http/Controllers/setting/SettingController.php:400
* @route '/setting/app/{nama_instansi}'
*/
appDestroy.delete = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: appDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appWallpaper
* @see app/Http/Controllers/setting/SettingController.php:413
* @route '/setting/app/{nama_instansi}/wallpaper'
*/
export const appWallpaper = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appWallpaper.url(args, options),
    method: 'get',
})

appWallpaper.definition = {
    methods: ["get","head"],
    url: '/setting/app/{nama_instansi}/wallpaper',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appWallpaper
* @see app/Http/Controllers/setting/SettingController.php:413
* @route '/setting/app/{nama_instansi}/wallpaper'
*/
appWallpaper.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return appWallpaper.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appWallpaper
* @see app/Http/Controllers/setting/SettingController.php:413
* @route '/setting/app/{nama_instansi}/wallpaper'
*/
appWallpaper.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appWallpaper.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appWallpaper
* @see app/Http/Controllers/setting/SettingController.php:413
* @route '/setting/app/{nama_instansi}/wallpaper'
*/
appWallpaper.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appWallpaper.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appLogo
* @see app/Http/Controllers/setting/SettingController.php:442
* @route '/setting/app/{nama_instansi}/logo'
*/
export const appLogo = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appLogo.url(args, options),
    method: 'get',
})

appLogo.definition = {
    methods: ["get","head"],
    url: '/setting/app/{nama_instansi}/logo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::appLogo
* @see app/Http/Controllers/setting/SettingController.php:442
* @route '/setting/app/{nama_instansi}/logo'
*/
appLogo.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return appLogo.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::appLogo
* @see app/Http/Controllers/setting/SettingController.php:442
* @route '/setting/app/{nama_instansi}/logo'
*/
appLogo.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appLogo.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\setting\SettingController::appLogo
* @see app/Http/Controllers/setting/SettingController.php:442
* @route '/setting/app/{nama_instansi}/logo'
*/
appLogo.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appLogo.url(args, options),
    method: 'head',
})

const SettingController = { index, describe, store, update, destroy, appIndex, appStore, appUpdate, appDestroy, appWallpaper, appLogo }

export default SettingController