import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
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

const surveilansPenyakit = {
    data: Object.assign(data, data),
}

export default surveilansPenyakit