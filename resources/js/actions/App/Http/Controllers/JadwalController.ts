import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalController::list
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::list
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::list
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::list
* @see app/Http/Controllers/JadwalController.php:80
* @route '/api/jadwal'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
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
* @see \App\Http\Controllers\JadwalController::getHariKerja
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
export const getHariKerja = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHariKerja.url(options),
    method: 'get',
})

getHariKerja.definition = {
    methods: ["get","head"],
    url: '/api/jadwal/hari',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::getHariKerja
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
getHariKerja.url = (options?: RouteQueryOptions) => {
    return getHariKerja.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::getHariKerja
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
getHariKerja.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHariKerja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::getHariKerja
* @see app/Http/Controllers/JadwalController.php:47
* @route '/api/jadwal/hari'
*/
getHariKerja.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHariKerja.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
const describe8df623101bedd8311b56169b2ff4f467 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe8df623101bedd8311b56169b2ff4f467.url(options),
    method: 'get',
})

describe8df623101bedd8311b56169b2ff4f467.definition = {
    methods: ["get","head"],
    url: '/api/jadwal/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe8df623101bedd8311b56169b2ff4f467.url = (options?: RouteQueryOptions) => {
    return describe8df623101bedd8311b56169b2ff4f467.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe8df623101bedd8311b56169b2ff4f467.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe8df623101bedd8311b56169b2ff4f467.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/api/jadwal/describe'
*/
describe8df623101bedd8311b56169b2ff4f467.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe8df623101bedd8311b56169b2ff4f467.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
const describe7947bdf4e4fe71c254e76bacb203d67c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe7947bdf4e4fe71c254e76bacb203d67c.url(options),
    method: 'get',
})

describe7947bdf4e4fe71c254e76bacb203d67c.definition = {
    methods: ["get","head"],
    url: '/master-data/jadwal/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe7947bdf4e4fe71c254e76bacb203d67c.url = (options?: RouteQueryOptions) => {
    return describe7947bdf4e4fe71c254e76bacb203d67c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe7947bdf4e4fe71c254e76bacb203d67c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe7947bdf4e4fe71c254e76bacb203d67c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe7947bdf4e4fe71c254e76bacb203d67c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe7947bdf4e4fe71c254e76bacb203d67c.url(options),
    method: 'head',
})

export const describe = {
    '/api/jadwal/describe': describe8df623101bedd8311b56169b2ff4f467,
    '/master-data/jadwal/describe': describe7947bdf4e4fe71c254e76bacb203d67c,
}

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master-data/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const JadwalController = { list, store, update, destroy, getHariKerja, describe, index }

export default JadwalController