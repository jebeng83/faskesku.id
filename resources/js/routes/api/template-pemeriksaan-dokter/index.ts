import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import detail from './detail'
/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::list
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:14
* @route '/api/template-pemeriksaan-dokter/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/template-pemeriksaan-dokter/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::list
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:14
* @route '/api/template-pemeriksaan-dokter/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::list
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:14
* @route '/api/template-pemeriksaan-dokter/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::list
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:14
* @route '/api/template-pemeriksaan-dokter/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::item
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:31
* @route '/api/template-pemeriksaan-dokter/item'
*/
export const item = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: item.url(options),
    method: 'get',
})

item.definition = {
    methods: ["get","head"],
    url: '/api/template-pemeriksaan-dokter/item',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::item
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:31
* @route '/api/template-pemeriksaan-dokter/item'
*/
item.url = (options?: RouteQueryOptions) => {
    return item.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::item
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:31
* @route '/api/template-pemeriksaan-dokter/item'
*/
item.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: item.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::item
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:31
* @route '/api/template-pemeriksaan-dokter/item'
*/
item.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: item.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/template-pemeriksaan-dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::store
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/template-pemeriksaan-dokter',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::update
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const templatePemeriksaanDokter = {
    list: Object.assign(list, list),
    item: Object.assign(item, item),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    detail: Object.assign(detail, detail),
}

export default templatePemeriksaanDokter