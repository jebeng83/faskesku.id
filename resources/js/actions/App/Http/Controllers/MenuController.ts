import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MenuController::getMenuHierarchy
* @see app/Http/Controllers/MenuController.php:244
* @route '/api/menus/hierarchy'
*/
export const getMenuHierarchy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMenuHierarchy.url(options),
    method: 'get',
})

getMenuHierarchy.definition = {
    methods: ["get","head"],
    url: '/api/menus/hierarchy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::getMenuHierarchy
* @see app/Http/Controllers/MenuController.php:244
* @route '/api/menus/hierarchy'
*/
getMenuHierarchy.url = (options?: RouteQueryOptions) => {
    return getMenuHierarchy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::getMenuHierarchy
* @see app/Http/Controllers/MenuController.php:244
* @route '/api/menus/hierarchy'
*/
getMenuHierarchy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMenuHierarchy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::getMenuHierarchy
* @see app/Http/Controllers/MenuController.php:244
* @route '/api/menus/hierarchy'
*/
getMenuHierarchy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMenuHierarchy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::getIcons
* @see app/Http/Controllers/MenuController.php:311
* @route '/api/menus/icons'
*/
export const getIcons = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIcons.url(options),
    method: 'get',
})

getIcons.definition = {
    methods: ["get","head"],
    url: '/api/menus/icons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::getIcons
* @see app/Http/Controllers/MenuController.php:311
* @route '/api/menus/icons'
*/
getIcons.url = (options?: RouteQueryOptions) => {
    return getIcons.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::getIcons
* @see app/Http/Controllers/MenuController.php:311
* @route '/api/menus/icons'
*/
getIcons.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIcons.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::getIcons
* @see app/Http/Controllers/MenuController.php:311
* @route '/api/menus/icons'
*/
getIcons.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getIcons.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:24
* @route '/menus'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/menus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:24
* @route '/menus'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:24
* @route '/menus'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:24
* @route '/menus'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::create
* @see app/Http/Controllers/MenuController.php:75
* @route '/menus/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/menus/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::create
* @see app/Http/Controllers/MenuController.php:75
* @route '/menus/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::create
* @see app/Http/Controllers/MenuController.php:75
* @route '/menus/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::create
* @see app/Http/Controllers/MenuController.php:75
* @route '/menus/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::store
* @see app/Http/Controllers/MenuController.php:93
* @route '/menus'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/menus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MenuController::store
* @see app/Http/Controllers/MenuController.php:93
* @route '/menus'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::store
* @see app/Http/Controllers/MenuController.php:93
* @route '/menus'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MenuController::show
* @see app/Http/Controllers/MenuController.php:137
* @route '/menus/{menu}'
*/
export const show = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/menus/{menu}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::show
* @see app/Http/Controllers/MenuController.php:137
* @route '/menus/{menu}'
*/
show.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return show.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::show
* @see app/Http/Controllers/MenuController.php:137
* @route '/menus/{menu}'
*/
show.get = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::show
* @see app/Http/Controllers/MenuController.php:137
* @route '/menus/{menu}'
*/
show.head = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::edit
* @see app/Http/Controllers/MenuController.php:151
* @route '/menus/{menu}/edit'
*/
export const edit = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/menus/{menu}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::edit
* @see app/Http/Controllers/MenuController.php:151
* @route '/menus/{menu}/edit'
*/
edit.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return edit.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::edit
* @see app/Http/Controllers/MenuController.php:151
* @route '/menus/{menu}/edit'
*/
edit.get = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::edit
* @see app/Http/Controllers/MenuController.php:151
* @route '/menus/{menu}/edit'
*/
edit.head = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::update
* @see app/Http/Controllers/MenuController.php:171
* @route '/menus/{menu}'
*/
export const update = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/menus/{menu}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MenuController::update
* @see app/Http/Controllers/MenuController.php:171
* @route '/menus/{menu}'
*/
update.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return update.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::update
* @see app/Http/Controllers/MenuController.php:171
* @route '/menus/{menu}'
*/
update.put = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MenuController::update
* @see app/Http/Controllers/MenuController.php:171
* @route '/menus/{menu}'
*/
update.patch = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MenuController::destroy
* @see app/Http/Controllers/MenuController.php:227
* @route '/menus/{menu}'
*/
export const destroy = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/menus/{menu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MenuController::destroy
* @see app/Http/Controllers/MenuController.php:227
* @route '/menus/{menu}'
*/
destroy.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return destroy.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::destroy
* @see app/Http/Controllers/MenuController.php:227
* @route '/menus/{menu}'
*/
destroy.delete = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MenuController::toggleStatus
* @see app/Http/Controllers/MenuController.php:281
* @route '/menus/{menu}/toggle-status'
*/
export const toggleStatus = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

toggleStatus.definition = {
    methods: ["post"],
    url: '/menus/{menu}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MenuController::toggleStatus
* @see app/Http/Controllers/MenuController.php:281
* @route '/menus/{menu}/toggle-status'
*/
toggleStatus.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return toggleStatus.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::toggleStatus
* @see app/Http/Controllers/MenuController.php:281
* @route '/menus/{menu}/toggle-status'
*/
toggleStatus.post = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MenuController::reorder
* @see app/Http/Controllers/MenuController.php:257
* @route '/menus/reorder'
*/
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/menus/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MenuController::reorder
* @see app/Http/Controllers/MenuController.php:257
* @route '/menus/reorder'
*/
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::reorder
* @see app/Http/Controllers/MenuController.php:257
* @route '/menus/reorder'
*/
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

const MenuController = { getMenuHierarchy, getIcons, index, create, store, show, edit, update, destroy, toggleStatus, reorder }

export default MenuController