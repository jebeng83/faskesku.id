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

const gudangbarang = {
    updateStok: Object.assign(updateStok, updateStok),
}

export default gudangbarang