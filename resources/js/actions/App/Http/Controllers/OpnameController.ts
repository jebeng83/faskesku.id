import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OpnameController::getLokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
export const getLokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi.url(options),
    method: 'get',
})

getLokasi.definition = {
    methods: ["get","head"],
    url: '/api/opname/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::getLokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
getLokasi.url = (options?: RouteQueryOptions) => {
    return getLokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::getLokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
getLokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLokasi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::getLokasi
* @see app/Http/Controllers/OpnameController.php:28
* @route '/api/opname/lokasi'
*/
getLokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLokasi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::getDataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
export const getDataBarang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDataBarang.url(options),
    method: 'get',
})

getDataBarang.definition = {
    methods: ["get","head"],
    url: '/api/opname/data-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::getDataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
getDataBarang.url = (options?: RouteQueryOptions) => {
    return getDataBarang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::getDataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
getDataBarang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDataBarang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::getDataBarang
* @see app/Http/Controllers/OpnameController.php:51
* @route '/api/opname/data-barang'
*/
getDataBarang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDataBarang.url(options),
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
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
export const getOpnameData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOpnameData.url(options),
    method: 'get',
})

getOpnameData.definition = {
    methods: ["get","head"],
    url: '/api/opname/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
getOpnameData.url = (options?: RouteQueryOptions) => {
    return getOpnameData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
getOpnameData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOpnameData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/list'
*/
getOpnameData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getOpnameData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
export const searchOpnameData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchOpnameData.url(options),
    method: 'get',
})

searchOpnameData.definition = {
    methods: ["get","head"],
    url: '/api/opname/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
searchOpnameData.url = (options?: RouteQueryOptions) => {
    return searchOpnameData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
searchOpnameData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchOpnameData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:384
* @route '/api/opname/search'
*/
searchOpnameData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchOpnameData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::destroy
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/opname/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\OpnameController::destroy
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::destroy
* @see app/Http/Controllers/OpnameController.php:453
* @route '/api/opname/delete'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const OpnameController = { getLokasi, getDataBarang, store, getOpnameData, searchOpnameData, destroy }

export default OpnameController