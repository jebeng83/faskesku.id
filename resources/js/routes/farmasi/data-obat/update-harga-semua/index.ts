import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::post
 * @see app/Http/Controllers/Farmasi/DataBarangController.php:202
 * @route '/farmasi/data-obat/update-harga-semua'
 */
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/farmasi/data-obat/update-harga-semua',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::post
 * @see app/Http/Controllers/Farmasi/DataBarangController.php:202
 * @route '/farmasi/data-obat/update-harga-semua'
 */
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataBarangController::post
 * @see app/Http/Controllers/Farmasi/DataBarangController.php:202
 * @route '/farmasi/data-obat/update-harga-semua'
 */
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})
const updateHargaSemua = {
    post: Object.assign(post, post),
}

export default updateHargaSemua