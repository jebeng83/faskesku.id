import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
export const show = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
show.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return show.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
show.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
show.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
export const edit = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
edit.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return edit.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
edit.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
edit.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
export const update = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
update.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return update.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
update.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
update.patch = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
export const destroy = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
destroy.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return destroy.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
destroy.delete = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
export const ambilSampel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ambilSampel.url(options),
    method: 'post',
})

ambilSampel.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab/ambil-sampel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
ambilSampel.url = (options?: RouteQueryOptions) => {
    return ambilSampel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
ambilSampel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ambilSampel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
export const updateSampel = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSampel.url(args, options),
    method: 'put',
})

updateSampel.definition = {
    methods: ["put"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/sampel',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
updateSampel.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return updateSampel.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
updateSampel.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSampel.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
export const inputHasil = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputHasil.url(args, options),
    method: 'get',
})

inputHasil.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/hasil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return inputHasil.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputHasil.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inputHasil.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
export const storeHasil = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHasil.url(args, options),
    method: 'post',
})

storeHasil.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/hasil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
storeHasil.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return storeHasil.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
storeHasil.post = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHasil.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
export const preview = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return preview.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
export const cetak = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

cetak.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/cetak',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return cetak.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cetak.url(args, options),
    method: 'head',
})

const permintaanLab = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    ambilSampel: Object.assign(ambilSampel, ambilSampel),
    updateSampel: Object.assign(updateSampel, updateSampel),
    inputHasil: Object.assign(inputHasil, inputHasil),
    storeHasil: Object.assign(storeHasil, storeHasil),
    preview: Object.assign(preview, preview),
    cetak: Object.assign(cetak, cetak),
}

export default permintaanLab