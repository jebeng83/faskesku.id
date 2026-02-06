import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/template-pemeriksaan-dokter/detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/template-pemeriksaan-dokter/detail',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const detail = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default detail