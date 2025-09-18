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
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store'
*/
const storef5d161647b52810fc6bb66ac40791a30 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef5d161647b52810fc6bb66ac40791a30.url(options),
    method: 'post',
})

storef5d161647b52810fc6bb66ac40791a30.definition = {
    methods: ["post"],
    url: '/api/opname/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store'
*/
storef5d161647b52810fc6bb66ac40791a30.url = (options?: RouteQueryOptions) => {
    return storef5d161647b52810fc6bb66ac40791a30.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store'
*/
storef5d161647b52810fc6bb66ac40791a30.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef5d161647b52810fc6bb66ac40791a30.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store-nocsr'
*/
const storebe29da81c2c1267a34eadb5d4b799f20 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storebe29da81c2c1267a34eadb5d4b799f20.url(options),
    method: 'post',
})

storebe29da81c2c1267a34eadb5d4b799f20.definition = {
    methods: ["post"],
    url: '/api/opname/store-nocsr',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store-nocsr'
*/
storebe29da81c2c1267a34eadb5d4b799f20.url = (options?: RouteQueryOptions) => {
    return storebe29da81c2c1267a34eadb5d4b799f20.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::store
* @see app/Http/Controllers/OpnameController.php:112
* @route '/api/opname/store-nocsr'
*/
storebe29da81c2c1267a34eadb5d4b799f20.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storebe29da81c2c1267a34eadb5d4b799f20.url(options),
    method: 'post',
})

export const store = {
    '/api/opname/store': storef5d161647b52810fc6bb66ac40791a30,
    '/api/opname/store-nocsr': storebe29da81c2c1267a34eadb5d4b799f20,
}

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:266
* @route '/api/opname/data'
*/
export const getOpnameData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOpnameData.url(options),
    method: 'get',
})

getOpnameData.definition = {
    methods: ["get","head"],
    url: '/api/opname/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:266
* @route '/api/opname/data'
*/
getOpnameData.url = (options?: RouteQueryOptions) => {
    return getOpnameData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:266
* @route '/api/opname/data'
*/
getOpnameData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOpnameData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::getOpnameData
* @see app/Http/Controllers/OpnameController.php:266
* @route '/api/opname/data'
*/
getOpnameData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getOpnameData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:325
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
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/search'
*/
searchOpnameData.url = (options?: RouteQueryOptions) => {
    return searchOpnameData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/search'
*/
searchOpnameData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchOpnameData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OpnameController::searchOpnameData
* @see app/Http/Controllers/OpnameController.php:325
* @route '/api/opname/search'
*/
searchOpnameData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchOpnameData.url(options),
    method: 'head',
})

const OpnameController = { getLokasi, getDataBarang, store, getOpnameData, searchOpnameData }

export default OpnameController