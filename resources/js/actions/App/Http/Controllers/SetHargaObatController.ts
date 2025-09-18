import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SetHargaObatController::index
* @see app/Http/Controllers/SetHargaObatController.php:17
* @route '/set-harga-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/set-harga-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetHargaObatController::index
* @see app/Http/Controllers/SetHargaObatController.php:17
* @route '/set-harga-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaObatController::index
* @see app/Http/Controllers/SetHargaObatController.php:17
* @route '/set-harga-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::index
* @see app/Http/Controllers/SetHargaObatController.php:17
* @route '/set-harga-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::update
* @see app/Http/Controllers/SetHargaObatController.php:52
* @route '/set-harga-obat'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/set-harga-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetHargaObatController::update
* @see app/Http/Controllers/SetHargaObatController.php:52
* @route '/set-harga-obat'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaObatController::update
* @see app/Http/Controllers/SetHargaObatController.php:52
* @route '/set-harga-obat'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
export const getPercentageData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPercentageData.url(options),
    method: 'get',
})

getPercentageData.definition = {
    methods: ["get","head"],
    url: '/api/set-harga-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
getPercentageData.url = (options?: RouteQueryOptions) => {
    return getPercentageData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
getPercentageData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPercentageData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/SetHargaObatController.php:92
* @route '/api/set-harga-obat'
*/
getPercentageData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPercentageData.url(options),
    method: 'head',
})

const SetHargaObatController = { index, update, getPercentageData }

export default SetHargaObatController