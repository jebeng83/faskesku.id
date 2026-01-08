import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::index
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/surveilans-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::index
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::index
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::index
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::data
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:19
* @route '/laporan/ranap/surveilans-penyakit/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/surveilans-penyakit/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::data
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:19
* @route '/laporan/ranap/surveilans-penyakit/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::data
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:19
* @route '/laporan/ranap/surveilans-penyakit/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::data
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:19
* @route '/laporan/ranap/surveilans-penyakit/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const SurveilansPenyakitRanapController = { index, data }

export default SurveilansPenyakitRanapController