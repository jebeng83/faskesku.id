import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::coordinates
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:593
* @route '/api/satusehat/config/coordinates'
*/
export const coordinates = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: coordinates.url(options),
    method: 'get',
})

coordinates.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/config/coordinates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::coordinates
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:593
* @route '/api/satusehat/config/coordinates'
*/
coordinates.url = (options?: RouteQueryOptions) => {
    return coordinates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::coordinates
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:593
* @route '/api/satusehat/config/coordinates'
*/
coordinates.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: coordinates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::coordinates
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:593
* @route '/api/satusehat/config/coordinates'
*/
coordinates.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: coordinates.url(options),
    method: 'head',
})

const config = {
    coordinates: Object.assign(coordinates, coordinates),
}

export default config