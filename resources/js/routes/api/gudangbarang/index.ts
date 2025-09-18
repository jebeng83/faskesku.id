import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
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
* @see \App\Http\Controllers\GudangBarangController::totalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
export const totalStok = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: totalStok.url(options),
    method: 'get',
})

totalStok.definition = {
    methods: ["get","head"],
    url: '/api/gudangbarang/total-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GudangBarangController::totalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
totalStok.url = (options?: RouteQueryOptions) => {
    return totalStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::totalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
totalStok.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: totalStok.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GudangBarangController::totalStok
* @see app/Http/Controllers/GudangBarangController.php:74
* @route '/api/gudangbarang/total-stok'
*/
totalStok.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: totalStok.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GudangBarangController::stokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
export const stokDetail = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokDetail.url(options),
    method: 'get',
})

stokDetail.definition = {
    methods: ["get","head"],
    url: '/api/gudangbarang/stok-detail',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GudangBarangController::stokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
stokDetail.url = (options?: RouteQueryOptions) => {
    return stokDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::stokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
stokDetail.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stokDetail.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GudangBarangController::stokDetail
* @see app/Http/Controllers/GudangBarangController.php:117
* @route '/api/gudangbarang/stok-detail'
*/
stokDetail.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stokDetail.url(options),
    method: 'head',
})

const gudangbarang = {
    updateStok: Object.assign(updateStok, updateStok),
    totalStok: Object.assign(totalStok, totalStok),
    stokDetail: Object.assign(stokDetail, stokDetail),
}

export default gudangbarang