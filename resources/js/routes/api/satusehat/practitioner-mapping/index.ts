import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::index
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:18
* @route '/api/satusehat/practitioner-mapping'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/practitioner-mapping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::index
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:18
* @route '/api/satusehat/practitioner-mapping'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::index
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:18
* @route '/api/satusehat/practitioner-mapping'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::index
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:18
* @route '/api/satusehat/practitioner-mapping'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::pegawaiList
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:295
* @route '/api/satusehat/practitioner-mapping/pegawai-list'
*/
export const pegawaiList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pegawaiList.url(options),
    method: 'get',
})

pegawaiList.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/practitioner-mapping/pegawai-list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::pegawaiList
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:295
* @route '/api/satusehat/practitioner-mapping/pegawai-list'
*/
pegawaiList.url = (options?: RouteQueryOptions) => {
    return pegawaiList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::pegawaiList
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:295
* @route '/api/satusehat/practitioner-mapping/pegawai-list'
*/
pegawaiList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pegawaiList.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::pegawaiList
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:295
* @route '/api/satusehat/practitioner-mapping/pegawai-list'
*/
pegawaiList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pegawaiList.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::searchCreate
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:126
* @route '/api/satusehat/practitioner-mapping/search-create'
*/
export const searchCreate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: searchCreate.url(options),
    method: 'post',
})

searchCreate.definition = {
    methods: ["post"],
    url: '/api/satusehat/practitioner-mapping/search-create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::searchCreate
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:126
* @route '/api/satusehat/practitioner-mapping/search-create'
*/
searchCreate.url = (options?: RouteQueryOptions) => {
    return searchCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::searchCreate
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:126
* @route '/api/satusehat/practitioner-mapping/search-create'
*/
searchCreate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: searchCreate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::update
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:233
* @route '/api/satusehat/practitioner-mapping/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/practitioner-mapping/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::update
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:233
* @route '/api/satusehat/practitioner-mapping/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::update
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:233
* @route '/api/satusehat/practitioner-mapping/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::destroy
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:279
* @route '/api/satusehat/practitioner-mapping/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/practitioner-mapping/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::destroy
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:279
* @route '/api/satusehat/practitioner-mapping/{id}'
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
* @see \App\Http\Controllers\SatuSehat\PractitionerMappingController::destroy
* @see app/Http/Controllers/SatuSehat/PractitionerMappingController.php:279
* @route '/api/satusehat/practitioner-mapping/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const practitionerMapping = {
    index: Object.assign(index, index),
    pegawaiList: Object.assign(pegawaiList, pegawaiList),
    searchCreate: Object.assign(searchCreate, searchCreate),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default practitionerMapping