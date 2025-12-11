import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\OpnameController::lokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
export const lokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lokasi.url(options),
    method: 'get',
})

lokasi.definition = {
    methods: ["get","head"],
    url: '/api/opname/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::lokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
lokasi.url = (options?: RouteQueryOptions) => {
    return lokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::lokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
lokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lokasi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::lokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
lokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lokasi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::dataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
export const dataBarang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataBarang.url(options),
    method: 'get',
})

dataBarang.definition = {
    methods: ["get","head"],
    url: '/api/opname/data-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::dataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
dataBarang.url = (options?: RouteQueryOptions) => {
    return dataBarang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::dataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
dataBarang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataBarang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::dataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
dataBarang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataBarang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:124
* @route '/api/opname/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/opname/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:124
* @route '/api/opname/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:124
* @route '/api/opname/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OpnameController::list
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/opname/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::list
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::list
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::list
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::search
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/opname/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::search
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::search
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::search
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::deleteMethod
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/api/opname/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\OpnameController::deleteMethod
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::deleteMethod
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const opname = {
    lokasi: Object.assign(lokasi, lokasi),
    dataBarang: Object.assign(dataBarang, dataBarang),
    store: Object.assign(store, store),
    list: Object.assign(list, list),
    search: Object.assign(search, search),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default opname