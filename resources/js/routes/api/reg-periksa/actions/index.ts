import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:541
* @route '/api/reg-periksa-actions/update-keputusan'
*/
export const updateKeputusan = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusan.url(options),
    method: 'put',
})

updateKeputusan.definition = {
    methods: ["put","post"],
    url: '/api/reg-periksa-actions/update-keputusan',
} satisfies RouteDefinition<["put","post"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:541
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusan.url = (options?: RouteQueryOptions) => {
    return updateKeputusan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:541
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusan.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKeputusan.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::updateKeputusan
* @see app/Http/Controllers/API/RegPeriksaController.php:541
* @route '/api/reg-periksa-actions/update-keputusan'
*/
updateKeputusan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateKeputusan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:340
* @route '/api/reg-periksa-actions/update'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put","post"],
    url: '/api/reg-periksa-actions/update',
} satisfies RouteDefinition<["put","post"]>

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:340
* @route '/api/reg-periksa-actions/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:340
* @route '/api/reg-periksa-actions/update'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\RegPeriksaController::update
* @see app/Http/Controllers/API/RegPeriksaController.php:340
* @route '/api/reg-periksa-actions/update'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

const actions = {
    updateKeputusan: Object.assign(updateKeputusan, updateKeputusan),
    update: Object.assign(update, update),
}

export default actions