import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:29
* @route '/satusehat/mapping-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat/mapping-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:29
* @route '/satusehat/mapping-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:29
* @route '/satusehat/mapping-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:29
* @route '/satusehat/mapping-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const mappingObat = {
    index: Object.assign(index, index),
}

export default mappingObat