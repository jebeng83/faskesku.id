import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::index
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/surveilans-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::index
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::index
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::index
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::data
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:19
* @route '/laporan/ralan/surveilans-penyakit/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/surveilans-penyakit/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::data
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:19
* @route '/laporan/ralan/surveilans-penyakit/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::data
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:19
* @route '/laporan/ralan/surveilans-penyakit/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::data
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:19
* @route '/laporan/ralan/surveilans-penyakit/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const SurveilansPenyakitRalanController = { index, data }

export default SurveilansPenyakitRalanController