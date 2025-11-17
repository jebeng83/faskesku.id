import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamar
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
export const kamar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kamar.url(options),
    method: 'get',
})

kamar.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/ranap/kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamar
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamar.url = (options?: RouteQueryOptions) => {
    return kamar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamar
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kamar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamar
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kamar.url(options),
    method: 'head',
})

const ranap = {
    kamar: Object.assign(kamar, kamar),
}

export default ranap