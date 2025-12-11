import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/permissions/gudangbarang/update-stok'
*/
const updateStok3730ffceb3779da2076a1c3e3e54ee41 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok3730ffceb3779da2076a1c3e3e54ee41.url(options),
    method: 'post',
})

updateStok3730ffceb3779da2076a1c3e3e54ee41.definition = {
    methods: ["post"],
    url: '/api/permissions/gudangbarang/update-stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/permissions/gudangbarang/update-stok'
*/
updateStok3730ffceb3779da2076a1c3e3e54ee41.url = (options?: RouteQueryOptions) => {
    return updateStok3730ffceb3779da2076a1c3e3e54ee41.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/permissions/gudangbarang/update-stok'
*/
updateStok3730ffceb3779da2076a1c3e3e54ee41.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok3730ffceb3779da2076a1c3e3e54ee41.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
const updateStok1f43aa7c0a0401bb8cb9a6d327ad0757 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.url(options),
    method: 'post',
})

updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.definition = {
    methods: ["post"],
    url: '/api/gudangbarang/update-stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.url = (options?: RouteQueryOptions) => {
    return updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GudangBarangController::updateStok
* @see app/Http/Controllers/GudangBarangController.php:15
* @route '/api/gudangbarang/update-stok'
*/
updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok1f43aa7c0a0401bb8cb9a6d327ad0757.url(options),
    method: 'post',
})

export const updateStok = {
    '/api/permissions/gudangbarang/update-stok': updateStok3730ffceb3779da2076a1c3e3e54ee41,
    '/api/gudangbarang/update-stok': updateStok1f43aa7c0a0401bb8cb9a6d327ad0757,
}

const GudangBarangController = { updateStok }

export default GudangBarangController