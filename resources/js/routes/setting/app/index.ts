import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\setting\SettingController::index
 * @see app/Http/Controllers/setting/SettingController.php:184
 * @route '/setting/app'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/setting/app',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::index
 * @see app/Http/Controllers/setting/SettingController.php:184
 * @route '/setting/app'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::index
 * @see app/Http/Controllers/setting/SettingController.php:184
 * @route '/setting/app'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\setting\SettingController::index
 * @see app/Http/Controllers/setting/SettingController.php:184
 * @route '/setting/app'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::store
 * @see app/Http/Controllers/setting/SettingController.php:246
 * @route '/setting/app'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/setting/app',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\setting\SettingController::store
 * @see app/Http/Controllers/setting/SettingController.php:246
 * @route '/setting/app'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::store
 * @see app/Http/Controllers/setting/SettingController.php:246
 * @route '/setting/app'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\setting\SettingController::update
 * @see app/Http/Controllers/setting/SettingController.php:301
 * @route '/setting/app/{nama_instansi}'
 */
export const update = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/setting/app/{nama_instansi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\setting\SettingController::update
 * @see app/Http/Controllers/setting/SettingController.php:301
 * @route '/setting/app/{nama_instansi}'
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
* @see \App\Http\Controllers\setting\SettingController::update
 * @see app/Http/Controllers/setting/SettingController.php:301
 * @route '/setting/app/{nama_instansi}'
 */
update.put = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
 * @see app/Http/Controllers/setting/SettingController.php:405
 * @route '/setting/app/{nama_instansi}'
 */
export const destroy = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/setting/app/{nama_instansi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\setting\SettingController::destroy
 * @see app/Http/Controllers/setting/SettingController.php:405
 * @route '/setting/app/{nama_instansi}'
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
* @see \App\Http\Controllers\setting\SettingController::destroy
 * @see app/Http/Controllers/setting/SettingController.php:405
 * @route '/setting/app/{nama_instansi}'
 */
destroy.delete = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\setting\SettingController::wallpaper
 * @see app/Http/Controllers/setting/SettingController.php:419
 * @route '/setting/app/{nama_instansi}/wallpaper'
 */
export const wallpaper = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wallpaper.url(args, options),
    method: 'get',
})

wallpaper.definition = {
    methods: ["get","head"],
    url: '/setting/app/{nama_instansi}/wallpaper',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::wallpaper
 * @see app/Http/Controllers/setting/SettingController.php:419
 * @route '/setting/app/{nama_instansi}/wallpaper'
 */
wallpaper.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return wallpaper.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::wallpaper
 * @see app/Http/Controllers/setting/SettingController.php:419
 * @route '/setting/app/{nama_instansi}/wallpaper'
 */
wallpaper.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wallpaper.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\setting\SettingController::wallpaper
 * @see app/Http/Controllers/setting/SettingController.php:419
 * @route '/setting/app/{nama_instansi}/wallpaper'
 */
wallpaper.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wallpaper.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\setting\SettingController::logo
 * @see app/Http/Controllers/setting/SettingController.php:449
 * @route '/setting/app/{nama_instansi}/logo'
 */
export const logo = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logo.url(args, options),
    method: 'get',
})

logo.definition = {
    methods: ["get","head"],
    url: '/setting/app/{nama_instansi}/logo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\setting\SettingController::logo
 * @see app/Http/Controllers/setting/SettingController.php:449
 * @route '/setting/app/{nama_instansi}/logo'
 */
logo.url = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return logo.definition.url
            .replace('{nama_instansi}', parsedArgs.nama_instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\setting\SettingController::logo
 * @see app/Http/Controllers/setting/SettingController.php:449
 * @route '/setting/app/{nama_instansi}/logo'
 */
logo.get = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logo.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\setting\SettingController::logo
 * @see app/Http/Controllers/setting/SettingController.php:449
 * @route '/setting/app/{nama_instansi}/logo'
 */
logo.head = (args: { nama_instansi: string | number } | [nama_instansi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logo.url(args, options),
    method: 'head',
})
const app = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
wallpaper: Object.assign(wallpaper, wallpaper),
logo: Object.assign(logo, logo),
}

export default app