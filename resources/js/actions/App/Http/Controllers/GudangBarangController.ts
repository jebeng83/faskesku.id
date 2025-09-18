import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
export const updateStok = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok.url(options),
    method: 'post',
})

updateStok.definition = {
    methods: ["post"],
    url: '/api/gudangbarang/update-stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
updateStok.url = (options?: RouteQueryOptions) => {
    return updateStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
updateStok.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GudangBarangController::getTotalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
export const getTotalStok = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTotalStok.url(options),
    method: 'get',
})

getTotalStok.definition = {
    methods: ["get","head"],
    url: '/api/gudangbarang/total-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GudangBarangController::getTotalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
getTotalStok.url = (options?: RouteQueryOptions) => {
    return getTotalStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::getTotalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
getTotalStok.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTotalStok.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GudangBarangController::getTotalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
getTotalStok.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTotalStok.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GudangBarangController::getStokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
export const getStokDetail = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStokDetail.url(options),
    method: 'get',
})

getStokDetail.definition = {
    methods: ["get","head"],
    url: '/api/gudangbarang/stok-detail',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GudangBarangController::getStokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
getStokDetail.url = (options?: RouteQueryOptions) => {
    return getStokDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::getStokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
getStokDetail.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStokDetail.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GudangBarangController::getStokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
getStokDetail.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStokDetail.url(options),
    method: 'head',
})

const GudangBarangController = { updateStok, getTotalStok, getStokDetail }

export default GudangBarangController