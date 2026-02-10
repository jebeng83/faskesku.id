import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:14
* @route '/satusehat/mapping-alergi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat/mapping-alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:14
* @route '/satusehat/mapping-alergi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:14
* @route '/satusehat/mapping-alergi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:14
* @route '/satusehat/mapping-alergi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const mappingAlergi = {
    index: Object.assign(index, index),
}

export default mappingAlergi