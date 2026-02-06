import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
const storeMain64d0bdeb01f610ea0270284007f1035e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMain64d0bdeb01f610ea0270284007f1035e.url(options),
    method: 'post',
})

storeMain64d0bdeb01f610ea0270284007f1035e.definition = {
    methods: ["post"],
    url: '/api/template-pemeriksaan-dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
storeMain64d0bdeb01f610ea0270284007f1035e.url = (options?: RouteQueryOptions) => {
    return storeMain64d0bdeb01f610ea0270284007f1035e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
storeMain64d0bdeb01f610ea0270284007f1035e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMain64d0bdeb01f610ea0270284007f1035e.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
const storeMain64d0bdeb01f610ea0270284007f1035e = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: storeMain64d0bdeb01f610ea0270284007f1035e.url(options),
    method: 'put',
})

storeMain64d0bdeb01f610ea0270284007f1035e.definition = {
    methods: ["put"],
    url: '/api/template-pemeriksaan-dokter',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
storeMain64d0bdeb01f610ea0270284007f1035e.url = (options?: RouteQueryOptions) => {
    return storeMain64d0bdeb01f610ea0270284007f1035e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeMain
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:45
* @route '/api/template-pemeriksaan-dokter'
*/
storeMain64d0bdeb01f610ea0270284007f1035e.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: storeMain64d0bdeb01f610ea0270284007f1035e.url(options),
    method: 'put',
})

export const storeMain = {
    '/api/template-pemeriksaan-dokter': storeMain64d0bdeb01f610ea0270284007f1035e,
    '/api/template-pemeriksaan-dokter': storeMain64d0bdeb01f610ea0270284007f1035e,
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
const storeDetail8b762f5b92da740140af57cea292910f = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDetail8b762f5b92da740140af57cea292910f.url(options),
    method: 'post',
})

storeDetail8b762f5b92da740140af57cea292910f.definition = {
    methods: ["post"],
    url: '/api/template-pemeriksaan-dokter/detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
storeDetail8b762f5b92da740140af57cea292910f.url = (options?: RouteQueryOptions) => {
    return storeDetail8b762f5b92da740140af57cea292910f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
storeDetail8b762f5b92da740140af57cea292910f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDetail8b762f5b92da740140af57cea292910f.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
const storeDetail8b762f5b92da740140af57cea292910f = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: storeDetail8b762f5b92da740140af57cea292910f.url(options),
    method: 'put',
})

storeDetail8b762f5b92da740140af57cea292910f.definition = {
    methods: ["put"],
    url: '/api/template-pemeriksaan-dokter/detail',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
storeDetail8b762f5b92da740140af57cea292910f.url = (options?: RouteQueryOptions) => {
    return storeDetail8b762f5b92da740140af57cea292910f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\TemplatePemeriksaanDokterController::storeDetail
* @see app/Http/Controllers/RawatJalan/TemplatePemeriksaanDokterController.php:62
* @route '/api/template-pemeriksaan-dokter/detail'
*/
storeDetail8b762f5b92da740140af57cea292910f.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: storeDetail8b762f5b92da740140af57cea292910f.url(options),
    method: 'put',
})

export const storeDetail = {
    '/api/template-pemeriksaan-dokter/detail': storeDetail8b762f5b92da740140af57cea292910f,
    '/api/template-pemeriksaan-dokter/detail': storeDetail8b762f5b92da740140af57cea292910f,
}

const TemplatePemeriksaanDokterController = { list, item, storeMain, storeDetail }

export default TemplatePemeriksaanDokterController