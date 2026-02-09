import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchSubstance
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:111
* @route '/api/satusehat/mapping-alergi/substance'
*/
export const searchSubstance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchSubstance.url(options),
    method: 'get',
})

searchSubstance.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-alergi/substance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchSubstance
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:111
* @route '/api/satusehat/mapping-alergi/substance'
*/
searchSubstance.url = (options?: RouteQueryOptions) => {
    return searchSubstance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchSubstance
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:111
* @route '/api/satusehat/mapping-alergi/substance'
*/
searchSubstance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchSubstance.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchSubstance
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:111
* @route '/api/satusehat/mapping-alergi/substance'
*/
searchSubstance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchSubstance.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchManifestation
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:125
* @route '/api/satusehat/mapping-alergi/manifestation'
*/
export const searchManifestation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchManifestation.url(options),
    method: 'get',
})

searchManifestation.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-alergi/manifestation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchManifestation
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:125
* @route '/api/satusehat/mapping-alergi/manifestation'
*/
searchManifestation.url = (options?: RouteQueryOptions) => {
    return searchManifestation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchManifestation
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:125
* @route '/api/satusehat/mapping-alergi/manifestation'
*/
searchManifestation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchManifestation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::searchManifestation
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:125
* @route '/api/satusehat/mapping-alergi/manifestation'
*/
searchManifestation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchManifestation.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::getMappings
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:22
* @route '/api/satusehat/mapping-alergi/data'
*/
export const getMappings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappings.url(options),
    method: 'get',
})

getMappings.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-alergi/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::getMappings
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:22
* @route '/api/satusehat/mapping-alergi/data'
*/
getMappings.url = (options?: RouteQueryOptions) => {
    return getMappings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::getMappings
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:22
* @route '/api/satusehat/mapping-alergi/data'
*/
getMappings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::getMappings
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:22
* @route '/api/satusehat/mapping-alergi/data'
*/
getMappings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::lookup
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:69
* @route '/api/satusehat/mapping-alergi/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-alergi/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::lookup
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:69
* @route '/api/satusehat/mapping-alergi/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::lookup
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:69
* @route '/api/satusehat/mapping-alergi/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::lookup
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:69
* @route '/api/satusehat/mapping-alergi/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:28
* @route '/api/satusehat/mapping-alergi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping-alergi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:28
* @route '/api/satusehat/mapping-alergi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:28
* @route '/api/satusehat/mapping-alergi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:55
* @route '/api/satusehat/mapping-alergi/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping-alergi/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:55
* @route '/api/satusehat/mapping-alergi/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatAllergyMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatAllergyMappingController.php:55
* @route '/api/satusehat/mapping-alergi/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

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

const SatuSehatAllergyMappingController = { searchSubstance, searchManifestation, getMappings, lookup, store, destroy, index }

export default SatuSehatAllergyMappingController