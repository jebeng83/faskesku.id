import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/pcare/penjab'
*/
const indexfab484ba76b63dc606498c24161828b5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfab484ba76b63dc606498c24161828b5.url(options),
    method: 'get',
})

indexfab484ba76b63dc606498c24161828b5.definition = {
    methods: ["get","head"],
    url: '/pcare/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/pcare/penjab'
*/
indexfab484ba76b63dc606498c24161828b5.url = (options?: RouteQueryOptions) => {
    return indexfab484ba76b63dc606498c24161828b5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/pcare/penjab'
*/
indexfab484ba76b63dc606498c24161828b5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfab484ba76b63dc606498c24161828b5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/pcare/penjab'
*/
indexfab484ba76b63dc606498c24161828b5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexfab484ba76b63dc606498c24161828b5.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/penjab'
*/
const indexd0466d43e06e20c2b45f954575158c36 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd0466d43e06e20c2b45f954575158c36.url(options),
    method: 'get',
})

indexd0466d43e06e20c2b45f954575158c36.definition = {
    methods: ["get","head"],
    url: '/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/penjab'
*/
indexd0466d43e06e20c2b45f954575158c36.url = (options?: RouteQueryOptions) => {
    return indexd0466d43e06e20c2b45f954575158c36.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/penjab'
*/
indexd0466d43e06e20c2b45f954575158c36.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd0466d43e06e20c2b45f954575158c36.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PenjabController::index
* @see app/Http/Controllers/PenjabController.php:13
* @route '/penjab'
*/
indexd0466d43e06e20c2b45f954575158c36.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd0466d43e06e20c2b45f954575158c36.url(options),
    method: 'head',
})

export const index = {
    '/pcare/penjab': indexfab484ba76b63dc606498c24161828b5,
    '/penjab': indexd0466d43e06e20c2b45f954575158c36,
}

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/pcare/penjab'
*/
const storefab484ba76b63dc606498c24161828b5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefab484ba76b63dc606498c24161828b5.url(options),
    method: 'post',
})

storefab484ba76b63dc606498c24161828b5.definition = {
    methods: ["post"],
    url: '/pcare/penjab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/pcare/penjab'
*/
storefab484ba76b63dc606498c24161828b5.url = (options?: RouteQueryOptions) => {
    return storefab484ba76b63dc606498c24161828b5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/pcare/penjab'
*/
storefab484ba76b63dc606498c24161828b5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefab484ba76b63dc606498c24161828b5.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/penjab'
*/
const stored0466d43e06e20c2b45f954575158c36 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored0466d43e06e20c2b45f954575158c36.url(options),
    method: 'post',
})

stored0466d43e06e20c2b45f954575158c36.definition = {
    methods: ["post"],
    url: '/penjab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/penjab'
*/
stored0466d43e06e20c2b45f954575158c36.url = (options?: RouteQueryOptions) => {
    return stored0466d43e06e20c2b45f954575158c36.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::store
* @see app/Http/Controllers/PenjabController.php:34
* @route '/penjab'
*/
stored0466d43e06e20c2b45f954575158c36.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored0466d43e06e20c2b45f954575158c36.url(options),
    method: 'post',
})

export const store = {
    '/pcare/penjab': storefab484ba76b63dc606498c24161828b5,
    '/penjab': stored0466d43e06e20c2b45f954575158c36,
}

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/pcare/penjab/{kd_pj}'
*/
const update56036f1604813ae00186b557b2e6e101 = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update56036f1604813ae00186b557b2e6e101.url(args, options),
    method: 'put',
})

update56036f1604813ae00186b557b2e6e101.definition = {
    methods: ["put"],
    url: '/pcare/penjab/{kd_pj}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/pcare/penjab/{kd_pj}'
*/
update56036f1604813ae00186b557b2e6e101.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_pj: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_pj: args.kd_pj,
    }

    return update56036f1604813ae00186b557b2e6e101.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/pcare/penjab/{kd_pj}'
*/
update56036f1604813ae00186b557b2e6e101.put = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update56036f1604813ae00186b557b2e6e101.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/penjab/{kd_pj}'
*/
const updated674bc55ffd551b30e397572c3df7561 = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated674bc55ffd551b30e397572c3df7561.url(args, options),
    method: 'put',
})

updated674bc55ffd551b30e397572c3df7561.definition = {
    methods: ["put"],
    url: '/penjab/{kd_pj}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/penjab/{kd_pj}'
*/
updated674bc55ffd551b30e397572c3df7561.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_pj: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_pj: args.kd_pj,
    }

    return updated674bc55ffd551b30e397572c3df7561.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::update
* @see app/Http/Controllers/PenjabController.php:110
* @route '/penjab/{kd_pj}'
*/
updated674bc55ffd551b30e397572c3df7561.put = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated674bc55ffd551b30e397572c3df7561.url(args, options),
    method: 'put',
})

export const update = {
    '/pcare/penjab/{kd_pj}': update56036f1604813ae00186b557b2e6e101,
    '/penjab/{kd_pj}': updated674bc55ffd551b30e397572c3df7561,
}

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/pcare/penjab/{kd_pj}/toggle-status'
*/
const toggleStatusdf3eced42e0108ac516047d61e284e07 = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatusdf3eced42e0108ac516047d61e284e07.url(args, options),
    method: 'patch',
})

toggleStatusdf3eced42e0108ac516047d61e284e07.definition = {
    methods: ["patch"],
    url: '/pcare/penjab/{kd_pj}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/pcare/penjab/{kd_pj}/toggle-status'
*/
toggleStatusdf3eced42e0108ac516047d61e284e07.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_pj: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_pj: args.kd_pj,
    }

    return toggleStatusdf3eced42e0108ac516047d61e284e07.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/pcare/penjab/{kd_pj}/toggle-status'
*/
toggleStatusdf3eced42e0108ac516047d61e284e07.patch = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatusdf3eced42e0108ac516047d61e284e07.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/penjab/{kd_pj}/toggle-status'
*/
const toggleStatuscd58cc4237ede117787bb11b624cb72b = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatuscd58cc4237ede117787bb11b624cb72b.url(args, options),
    method: 'patch',
})

toggleStatuscd58cc4237ede117787bb11b624cb72b.definition = {
    methods: ["patch"],
    url: '/penjab/{kd_pj}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/penjab/{kd_pj}/toggle-status'
*/
toggleStatuscd58cc4237ede117787bb11b624cb72b.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_pj: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_pj: args.kd_pj,
    }

    return toggleStatuscd58cc4237ede117787bb11b624cb72b.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
* @see app/Http/Controllers/PenjabController.php:127
* @route '/penjab/{kd_pj}/toggle-status'
*/
toggleStatuscd58cc4237ede117787bb11b624cb72b.patch = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatuscd58cc4237ede117787bb11b624cb72b.url(args, options),
    method: 'patch',
})

export const toggleStatus = {
    '/pcare/penjab/{kd_pj}/toggle-status': toggleStatusdf3eced42e0108ac516047d61e284e07,
    '/penjab/{kd_pj}/toggle-status': toggleStatuscd58cc4237ede117787bb11b624cb72b,
}

/**
* @see \App\Http\Controllers\PenjabController::generateKode
* @see app/Http/Controllers/PenjabController.php:145
* @route '/penjab/generate-kode'
*/
export const generateKode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

generateKode.definition = {
    methods: ["get","head"],
    url: '/penjab/generate-kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PenjabController::generateKode
* @see app/Http/Controllers/PenjabController.php:145
* @route '/penjab/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::generateKode
* @see app/Http/Controllers/PenjabController.php:145
* @route '/penjab/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PenjabController::generateKode
* @see app/Http/Controllers/PenjabController.php:145
* @route '/penjab/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

const PenjabController = { index, store, update, toggleStatus, generateKode }

export default PenjabController