import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:34
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:34
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.url = (options?: RouteQueryOptions) => {
    return getReferensiPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:34
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiPoli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiPoli
* @see app/Http/Controllers/Pcare/MobileJknController.php:34
* @route '/api/mobilejkn/ref/poli'
*/
getReferensiPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiPoli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:627
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:627
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.url = (options?: RouteQueryOptions) => {
    return getReferensiDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:627
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::getReferensiDokter
* @see app/Http/Controllers/Pcare/MobileJknController.php:627
* @route '/api/mobilejkn/ref/dokter'
*/
getReferensiDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::addAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
* @route '/api/mobilejkn/antrean/add'
*/
addAntrean.url = (options?: RouteQueryOptions) => {
    return addAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::addAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:94
* @route '/api/mobilejkn/antrean/add'
*/
addAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAntrean.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggilAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
* @route '/api/mobilejkn/antrean/panggil'
*/
panggilAntrean.url = (options?: RouteQueryOptions) => {
    return panggilAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::panggilAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:703
* @route '/api/mobilejkn/antrean/panggil'
*/
panggilAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: panggilAntrean.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batalAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:929
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
* @see app/Http/Controllers/Pcare/MobileJknController.php:929
* @route '/api/mobilejkn/antrean/batal'
*/
batalAntrean.url = (options?: RouteQueryOptions) => {
    return batalAntrean.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::batalAntrean
* @see app/Http/Controllers/Pcare/MobileJknController.php:929
* @route '/api/mobilejkn/antrean/batal'
*/
batalAntrean.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batalAntrean.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check'
*/
const cekSrk2b6f5e715de77ff7ac155365dabd92dc = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekSrk2b6f5e715de77ff7ac155365dabd92dc.url(options),
    method: 'post',
})

cekSrk2b6f5e715de77ff7ac155365dabd92dc.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/srk/check',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check'
*/
cekSrk2b6f5e715de77ff7ac155365dabd92dc.url = (options?: RouteQueryOptions) => {
    return cekSrk2b6f5e715de77ff7ac155365dabd92dc.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check'
*/
cekSrk2b6f5e715de77ff7ac155365dabd92dc.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekSrk2b6f5e715de77ff7ac155365dabd92dc.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
const cekSrkb4776f0258f485d7e7bbcc3a371dcbb5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.url(options),
    method: 'post',
})

cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.definition = {
    methods: ["post"],
    url: '/api/mobilejkn/srk/check/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.url = (options?: RouteQueryOptions) => {
    return cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::cekSrk
* @see app/Http/Controllers/Pcare/MobileJknController.php:400
* @route '/api/mobilejkn/srk/check/test'
*/
cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cekSrkb4776f0258f485d7e7bbcc3a371dcbb5.url(options),
    method: 'post',
})

export const cekSrk = {
    '/api/mobilejkn/srk/check': cekSrk2b6f5e715de77ff7ac155365dabd92dc,
    '/api/mobilejkn/srk/check/test': cekSrkb4776f0258f485d7e7bbcc3a371dcbb5,
}

const MobileJknController = { config, getReferensiPoli, getReferensiDokter, addAntrean, panggilAntrean, batalAntrean, cekSrk }

export default MobileJknController