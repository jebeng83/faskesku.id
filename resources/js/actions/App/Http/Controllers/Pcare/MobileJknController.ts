import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:22
* @route '/api/mobilejkn/config'
*/
export const config = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

config.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:22
* @route '/api/mobilejkn/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:22
* @route '/api/mobilejkn/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:22
* @route '/api/mobilejkn/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
export const getReferensiPoli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiPoli.url(options),
    method: 'get',
})

getReferensiPoli.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/ref/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.url = (options?: RouteQueryOptions) => {
    return getReferensiPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiPoli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:33
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiPoli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:317
* @route '/api/mobilejkn/ref/dokter'
*/
export const getReferensiDokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiDokter.url(options),
    method: 'get',
})

getReferensiDokter.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/ref/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:317
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.url = (options?: RouteQueryOptions) => {
    return getReferensiDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:317
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:317
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::addAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:93
* @route '/api/mobilejkn/antrean/add'
*/
export const addAntrean = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAntrean.url(options),
    method: 'post',
})

addAntrean.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::addAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:93
* @route '/api/mobilejkn/antrean/add'
*/
addAntrean.url = (options?: RouteQueryOptions) => {
    return addAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::addAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:93
* @route '/api/mobilejkn/antrean/add'
*/
addAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAntrean.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggilAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:393
* @route '/api/mobilejkn/antrean/panggil'
*/
export const panggilAntrean = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: panggilAntrean.url(options),
    method: 'post',
})

panggilAntrean.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/panggil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggilAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:393
* @route '/api/mobilejkn/antrean/panggil'
*/
panggilAntrean.url = (options?: RouteQueryOptions) => {
    return panggilAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggilAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:393
* @route '/api/mobilejkn/antrean/panggil'
*/
panggilAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: panggilAntrean.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batalAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:564
* @route '/api/mobilejkn/antrean/batal'
*/
export const batalAntrean = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batalAntrean.url(options),
    method: 'post',
})

batalAntrean.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/antrean/batal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batalAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:564
* @route '/api/mobilejkn/antrean/batal'
*/
batalAntrean.url = (options?: RouteQueryOptions) => {
    return batalAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batalAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:564
* @route '/api/mobilejkn/antrean/batal'
*/
batalAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batalAntrean.url(options),
    method: 'post',
})

const MobileJknController = { config, getReferensiPoli, getReferensiDokter, addAntrean, panggilAntrean, batalAntrean }

export default MobileJknController