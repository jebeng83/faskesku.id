import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:132
* @route '/api/jadwal'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/jadwal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:132
* @route '/api/jadwal'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:132
* @route '/api/jadwal'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:190
* @route '/api/jadwal'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/jadwal',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:190
* @route '/api/jadwal'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:190
* @route '/api/jadwal'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:280
* @route '/api/jadwal'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/jadwal',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:280
* @route '/api/jadwal'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:280
* @route '/api/jadwal'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\JadwalController::hari
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
export const hari = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hari.url(options),
    method: 'get',
})

hari.definition = {
    methods: ["get","head"],
    url: '/api/jadwal/hari',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::hari
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
hari.url = (options?: RouteQueryOptions) => {
    return hari.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::hari
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
hari.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hari.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::hari
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
hari.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hari.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/api/jadwal/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

const jadwal = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    hari: Object.assign(hari, hari),
    describe: Object.assign(describe, describe),
}

export default jadwal