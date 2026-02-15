import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1117
* @route '/rawat-jalan/status'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/rawat-jalan/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1117
* @route '/rawat-jalan/status'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1117
* @route '/rawat-jalan/status'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

const status = {
    update: Object.assign(update, update),
}

export default status