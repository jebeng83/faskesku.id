import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
* @route '/api/mobilejkn/antrean/add'
*/
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
* @route '/api/mobilejkn/antrean/add'
*/
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::add
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
* @route '/api/mobilejkn/antrean/add'
*/
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggil
* @see app/Http/Controllers/Pcare/MobileJknController.php:482
* @route '/api/mobilejkn/antrean/panggil'
*/
export const panggil = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: panggil.url(options),
    method: 'post',
})

panggil.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/panggil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggil
* @see app/Http/Controllers/Pcare/MobileJknController.php:482
* @route '/api/mobilejkn/antrean/panggil'
*/
panggil.url = (options?: RouteQueryOptions) => {
    return panggil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggil
* @see app/Http/Controllers/Pcare/MobileJknController.php:482
* @route '/api/mobilejkn/antrean/panggil'
*/
panggil.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: panggil.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batal
* @see app/Http/Controllers/Pcare/MobileJknController.php:708
* @route '/api/mobilejkn/antrean/batal'
*/
export const batal = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batal.url(options),
    method: 'post',
})

batal.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/batal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batal
* @see app/Http/Controllers/Pcare/MobileJknController.php:708
* @route '/api/mobilejkn/antrean/batal'
*/
batal.url = (options?: RouteQueryOptions) => {
    return batal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batal
* @see app/Http/Controllers/Pcare/MobileJknController.php:708
* @route '/api/mobilejkn/antrean/batal'
*/
batal.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batal.url(options),
    method: 'post',
})

const antrean = {
    add: Object.assign(add, add),
    panggil: Object.assign(panggil, panggil),
    batal: Object.assign(batal, batal),
}

export default antrean