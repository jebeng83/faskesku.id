import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/data-barang'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/data-barang'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/data-barang'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::index
* @see app/Http/Controllers/DataBarangController.php:18
* @route '/data-barang'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataBarangController::create
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/data-barang/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::create
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::create
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::create
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataBarangController::store
* @see app/Http/Controllers/DataBarangController.php:46
* @route '/data-barang'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/data-barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataBarangController::store
* @see app/Http/Controllers/DataBarangController.php:46
* @route '/data-barang'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::store
* @see app/Http/Controllers/DataBarangController.php:46
* @route '/data-barang'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataBarangController::show
* @see app/Http/Controllers/DataBarangController.php:103
* @route '/data-barang/{data_barang}'
*/
export const show = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/data-barang/{data_barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::show
* @see app/Http/Controllers/DataBarangController.php:103
* @route '/data-barang/{data_barang}'
*/
show.url = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { data_barang: args }
    }

    if (Array.isArray(args)) {
        args = {
            data_barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        data_barang: args.data_barang,
    }

    return show.definition.url
            .replace('{data_barang}', parsedArgs.data_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::show
* @see app/Http/Controllers/DataBarangController.php:103
* @route '/data-barang/{data_barang}'
*/
show.get = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::show
* @see app/Http/Controllers/DataBarangController.php:103
* @route '/data-barang/{data_barang}'
*/
show.head = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataBarangController::edit
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/{data_barang}/edit'
*/
export const edit = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/data-barang/{data_barang}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::edit
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/{data_barang}/edit'
*/
edit.url = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { data_barang: args }
    }

    if (Array.isArray(args)) {
        args = {
            data_barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        data_barang: args.data_barang,
    }

    return edit.definition.url
            .replace('{data_barang}', parsedArgs.data_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::edit
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/{data_barang}/edit'
*/
edit.get = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::edit
* @see app/Http/Controllers/DataBarangController.php:0
* @route '/data-barang/{data_barang}/edit'
*/
edit.head = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataBarangController::update
* @see app/Http/Controllers/DataBarangController.php:116
* @route '/data-barang/{data_barang}'
*/
export const update = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/data-barang/{data_barang}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DataBarangController::update
* @see app/Http/Controllers/DataBarangController.php:116
* @route '/data-barang/{data_barang}'
*/
update.url = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { data_barang: args }
    }

    if (Array.isArray(args)) {
        args = {
            data_barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        data_barang: args.data_barang,
    }

    return update.definition.url
            .replace('{data_barang}', parsedArgs.data_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::update
* @see app/Http/Controllers/DataBarangController.php:116
* @route '/data-barang/{data_barang}'
*/
update.put = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataBarangController::update
* @see app/Http/Controllers/DataBarangController.php:116
* @route '/data-barang/{data_barang}'
*/
update.patch = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DataBarangController::destroy
* @see app/Http/Controllers/DataBarangController.php:174
* @route '/data-barang/{data_barang}'
*/
export const destroy = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/data-barang/{data_barang}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DataBarangController::destroy
* @see app/Http/Controllers/DataBarangController.php:174
* @route '/data-barang/{data_barang}'
*/
destroy.url = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { data_barang: args }
    }

    if (Array.isArray(args)) {
        args = {
            data_barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        data_barang: args.data_barang,
    }

    return destroy.definition.url
            .replace('{data_barang}', parsedArgs.data_barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::destroy
* @see app/Http/Controllers/DataBarangController.php:174
* @route '/data-barang/{data_barang}'
*/
destroy.delete = (args: { data_barang: string | number } | [data_barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DataBarangController::dropdown
* @see app/Http/Controllers/DataBarangController.php:188
* @route '/data-barang-dropdown'
*/
export const dropdown = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dropdown.url(options),
    method: 'get',
})

dropdown.definition = {
    methods: ["get","head"],
    url: '/data-barang-dropdown',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::dropdown
* @see app/Http/Controllers/DataBarangController.php:188
* @route '/data-barang-dropdown'
*/
dropdown.url = (options?: RouteQueryOptions) => {
    return dropdown.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::dropdown
* @see app/Http/Controllers/DataBarangController.php:188
* @route '/data-barang-dropdown'
*/
dropdown.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dropdown.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::dropdown
* @see app/Http/Controllers/DataBarangController.php:188
* @route '/data-barang-dropdown'
*/
dropdown.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dropdown.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataBarangController::lastCode
* @see app/Http/Controllers/DataBarangController.php:386
* @route '/data-barang-last-code'
*/
export const lastCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lastCode.url(options),
    method: 'get',
})

lastCode.definition = {
    methods: ["get","head"],
    url: '/data-barang-last-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataBarangController::lastCode
* @see app/Http/Controllers/DataBarangController.php:386
* @route '/data-barang-last-code'
*/
lastCode.url = (options?: RouteQueryOptions) => {
    return lastCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataBarangController::lastCode
* @see app/Http/Controllers/DataBarangController.php:386
* @route '/data-barang-last-code'
*/
lastCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lastCode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataBarangController::lastCode
* @see app/Http/Controllers/DataBarangController.php:386
* @route '/data-barang-last-code'
*/
lastCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lastCode.url(options),
    method: 'head',
})

const dataBarang = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    dropdown: Object.assign(dropdown, dropdown),
    lastCode: Object.assign(lastCode, lastCode),
}

export default dataBarang