import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
* @route '/api/satusehat/token'
*/
export const token = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

token.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
* @route '/api/satusehat/token'
*/
token.url = (options?: RouteQueryOptions) => {
    return token.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
* @route '/api/satusehat/token'
*/
token.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
* @route '/api/satusehat/token'
*/
token.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: token.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
* @route '/api/satusehat/token-debug'
*/
export const tokenDebug = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tokenDebug.url(options),
    method: 'get',
})

tokenDebug.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/token-debug',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
* @route '/api/satusehat/token-debug'
*/
tokenDebug.url = (options?: RouteQueryOptions) => {
    return tokenDebug.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
* @route '/api/satusehat/token-debug'
*/
tokenDebug.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tokenDebug.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
* @route '/api/satusehat/token-debug'
*/
tokenDebug.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tokenDebug.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
* @route '/api/satusehat/metadata'
*/
export const metadata = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metadata.url(options),
    method: 'get',
})

metadata.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/metadata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
* @route '/api/satusehat/metadata'
*/
metadata.url = (options?: RouteQueryOptions) => {
    return metadata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
* @route '/api/satusehat/metadata'
*/
metadata.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metadata.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
* @route '/api/satusehat/metadata'
*/
metadata.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metadata.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:158
* @route '/api/satusehat/organization'
*/
export const organization = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

organization.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/organization',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:158
* @route '/api/satusehat/organization'
*/
organization.url = (options?: RouteQueryOptions) => {
    return organization.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:158
* @route '/api/satusehat/organization'
*/
organization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:158
* @route '/api/satusehat/organization'
*/
organization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organization.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationSubunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:240
* @route '/api/satusehat/organization/subunits'
*/
export const organizationSubunits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizationSubunits.url(options),
    method: 'get',
})

organizationSubunits.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/organization/subunits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationSubunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:240
* @route '/api/satusehat/organization/subunits'
*/
organizationSubunits.url = (options?: RouteQueryOptions) => {
    return organizationSubunits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationSubunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:240
* @route '/api/satusehat/organization/subunits'
*/
organizationSubunits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizationSubunits.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationSubunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:240
* @route '/api/satusehat/organization/subunits'
*/
organizationSubunits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organizationSubunits.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:539
* @route '/api/satusehat/organization/{id}'
*/
export const organizationUpdate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: organizationUpdate.url(args, options),
    method: 'put',
})

organizationUpdate.definition = {
    methods: ["put"],
    url: '/api/satusehat/organization/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:539
* @route '/api/satusehat/organization/{id}'
*/
organizationUpdate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return organizationUpdate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organizationUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:539
* @route '/api/satusehat/organization/{id}'
*/
organizationUpdate.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: organizationUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
export const locationSearch = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locationSearch.url(options),
    method: 'get',
})

locationSearch.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/location',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
locationSearch.url = (options?: RouteQueryOptions) => {
    return locationSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
locationSearch.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locationSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
locationSearch.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locationSearch.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationPatch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
export const locationPatch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: locationPatch.url(args, options),
    method: 'patch',
})

locationPatch.definition = {
    methods: ["patch"],
    url: '/api/satusehat/location/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationPatch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
locationPatch.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return locationPatch.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::locationPatch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
locationPatch.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: locationPatch.url(args, options),
    method: 'patch',
})

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

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::practitionerSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1635
* @route '/api/satusehat/practitioner'
*/
export const practitionerSearch = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitionerSearch.url(options),
    method: 'get',
})

practitionerSearch.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::practitionerSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1635
* @route '/api/satusehat/practitioner'
*/
practitionerSearch.url = (options?: RouteQueryOptions) => {
    return practitionerSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::practitionerSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1635
* @route '/api/satusehat/practitioner'
*/
practitionerSearch.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitionerSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::practitionerSearch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1635
* @route '/api/satusehat/practitioner'
*/
practitionerSearch.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: practitionerSearch.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:368
* @route '/api/satusehat/mapping/departemen'
*/
export const mappingDepartemenIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingDepartemenIndex.url(options),
    method: 'get',
})

mappingDepartemenIndex.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:368
* @route '/api/satusehat/mapping/departemen'
*/
mappingDepartemenIndex.url = (options?: RouteQueryOptions) => {
    return mappingDepartemenIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:368
* @route '/api/satusehat/mapping/departemen'
*/
mappingDepartemenIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingDepartemenIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:368
* @route '/api/satusehat/mapping/departemen'
*/
mappingDepartemenIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingDepartemenIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:398
* @route '/api/satusehat/mapping/departemen'
*/
export const mappingDepartemenStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingDepartemenStore.url(options),
    method: 'post',
})

mappingDepartemenStore.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/departemen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:398
* @route '/api/satusehat/mapping/departemen'
*/
mappingDepartemenStore.url = (options?: RouteQueryOptions) => {
    return mappingDepartemenStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:398
* @route '/api/satusehat/mapping/departemen'
*/
mappingDepartemenStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingDepartemenStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:495
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
export const mappingDepartemenUpdate = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingDepartemenUpdate.url(args, options),
    method: 'put',
})

mappingDepartemenUpdate.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/departemen/{dep_id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:495
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
mappingDepartemenUpdate.url = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dep_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            dep_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dep_id: args.dep_id,
    }

    return mappingDepartemenUpdate.definition.url
            .replace('{dep_id}', parsedArgs.dep_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:495
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
mappingDepartemenUpdate.put = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingDepartemenUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:524
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
export const mappingDepartemenDestroy = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingDepartemenDestroy.url(args, options),
    method: 'delete',
})

mappingDepartemenDestroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/departemen/{dep_id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:524
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
mappingDepartemenDestroy.url = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dep_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            dep_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dep_id: args.dep_id,
    }

    return mappingDepartemenDestroy.definition.url
            .replace('{dep_id}', parsedArgs.dep_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingDepartemenDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:524
* @route '/api/satusehat/mapping/departemen/{dep_id}'
*/
mappingDepartemenDestroy.delete = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingDepartemenDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:679
* @route '/api/satusehat/mapping/lokasi'
*/
export const mappingLokasiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiIndex.url(options),
    method: 'get',
})

mappingLokasiIndex.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:679
* @route '/api/satusehat/mapping/lokasi'
*/
mappingLokasiIndex.url = (options?: RouteQueryOptions) => {
    return mappingLokasiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:679
* @route '/api/satusehat/mapping/lokasi'
*/
mappingLokasiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:679
* @route '/api/satusehat/mapping/lokasi'
*/
mappingLokasiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingLokasiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:707
* @route '/api/satusehat/mapping/lokasi'
*/
export const mappingLokasiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiStore.url(options),
    method: 'post',
})

mappingLokasiStore.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:707
* @route '/api/satusehat/mapping/lokasi'
*/
mappingLokasiStore.url = (options?: RouteQueryOptions) => {
    return mappingLokasiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:707
* @route '/api/satusehat/mapping/lokasi'
*/
mappingLokasiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:924
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
export const mappingLokasiUpdate = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiUpdate.url(args, options),
    method: 'put',
})

mappingLokasiUpdate.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi/{kd_poli}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:924
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
mappingLokasiUpdate.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return mappingLokasiUpdate.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:924
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
mappingLokasiUpdate.put = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1012
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
export const mappingLokasiDestroy = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiDestroy.url(args, options),
    method: 'delete',
})

mappingLokasiDestroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi/{kd_poli}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1012
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
mappingLokasiDestroy.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return mappingLokasiDestroy.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1012
* @route '/api/satusehat/mapping/lokasi/{kd_poli}'
*/
mappingLokasiDestroy.delete = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
export const mappingLokasiRanapIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiRanapIndex.url(options),
    method: 'get',
})

mappingLokasiRanapIndex.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
mappingLokasiRanapIndex.url = (options?: RouteQueryOptions) => {
    return mappingLokasiRanapIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
mappingLokasiRanapIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiRanapIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
mappingLokasiRanapIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingLokasiRanapIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
export const mappingLokasiRanapStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiRanapStore.url(options),
    method: 'post',
})

mappingLokasiRanapStore.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
mappingLokasiRanapStore.url = (options?: RouteQueryOptions) => {
    return mappingLokasiRanapStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
mappingLokasiRanapStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiRanapStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
export const mappingLokasiRanapUpdate = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiRanapUpdate.url(args, options),
    method: 'put',
})

mappingLokasiRanapUpdate.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
mappingLokasiRanapUpdate.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return mappingLokasiRanapUpdate.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
mappingLokasiRanapUpdate.put = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiRanapUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
export const mappingLokasiRanapDestroy = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiRanapDestroy.url(args, options),
    method: 'delete',
})

mappingLokasiRanapDestroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
mappingLokasiRanapDestroy.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return mappingLokasiRanapDestroy.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiRanapDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
mappingLokasiRanapDestroy.delete = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiRanapDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamarList
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
export const kamarList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kamarList.url(options),
    method: 'get',
})

kamarList.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/ranap/kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamarList
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamarList.url = (options?: RouteQueryOptions) => {
    return kamarList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamarList
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamarList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kamarList.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::kamarList
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1550
* @route '/api/satusehat/ranap/kamar'
*/
kamarList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kamarList.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
export const mappingLokasiFarmasiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiFarmasiIndex.url(options),
    method: 'get',
})

mappingLokasiFarmasiIndex.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi-farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
mappingLokasiFarmasiIndex.url = (options?: RouteQueryOptions) => {
    return mappingLokasiFarmasiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
mappingLokasiFarmasiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingLokasiFarmasiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiIndex
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
mappingLokasiFarmasiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingLokasiFarmasiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
export const mappingLokasiFarmasiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiFarmasiStore.url(options),
    method: 'post',
})

mappingLokasiFarmasiStore.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi-farmasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
mappingLokasiFarmasiStore.url = (options?: RouteQueryOptions) => {
    return mappingLokasiFarmasiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiStore
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
mappingLokasiFarmasiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mappingLokasiFarmasiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
export const mappingLokasiFarmasiUpdate = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiFarmasiUpdate.url(args, options),
    method: 'put',
})

mappingLokasiFarmasiUpdate.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
mappingLokasiFarmasiUpdate.url = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_bangsal: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_bangsal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_bangsal: args.kd_bangsal,
    }

    return mappingLokasiFarmasiUpdate.definition.url
            .replace('{kd_bangsal}', parsedArgs.kd_bangsal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiUpdate
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
mappingLokasiFarmasiUpdate.put = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: mappingLokasiFarmasiUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
export const mappingLokasiFarmasiDestroy = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiFarmasiDestroy.url(args, options),
    method: 'delete',
})

mappingLokasiFarmasiDestroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
mappingLokasiFarmasiDestroy.url = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_bangsal: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_bangsal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_bangsal: args.kd_bangsal,
    }

    return mappingLokasiFarmasiDestroy.definition.url
            .replace('{kd_bangsal}', parsedArgs.kd_bangsal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::mappingLokasiFarmasiDestroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
mappingLokasiFarmasiDestroy.delete = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: mappingLokasiFarmasiDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::createResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:317
* @route '/api/satusehat/{resource}'
*/
export const createResource = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createResource.url(args, options),
    method: 'post',
})

createResource.definition = {
    methods: ["post"],
    url: '/api/satusehat/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::createResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:317
* @route '/api/satusehat/{resource}'
*/
createResource.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    if (Array.isArray(args)) {
        args = {
            resource: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resource: args.resource,
    }

    return createResource.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::createResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:317
* @route '/api/satusehat/{resource}'
*/
createResource.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createResource.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::getResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:346
* @route '/api/satusehat/{resource}/{id}'
*/
export const getResource = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getResource.url(args, options),
    method: 'get',
})

getResource.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/{resource}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::getResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:346
* @route '/api/satusehat/{resource}/{id}'
*/
getResource.url = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            resource: args[0],
            id: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resource: args.resource,
        id: args.id,
    }

    return getResource.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::getResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:346
* @route '/api/satusehat/{resource}/{id}'
*/
getResource.get = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getResource.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::getResource
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:346
* @route '/api/satusehat/{resource}/{id}'
*/
getResource.head = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getResource.url(args, options),
    method: 'head',
})

const SatuSehatController = { token, tokenDebug, metadata, organization, organizationSubunits, organizationUpdate, locationSearch, locationPatch, coordinates, practitionerSearch, mappingDepartemenIndex, mappingDepartemenStore, mappingDepartemenUpdate, mappingDepartemenDestroy, mappingLokasiIndex, mappingLokasiStore, mappingLokasiUpdate, mappingLokasiDestroy, mappingLokasiRanapIndex, mappingLokasiRanapStore, mappingLokasiRanapUpdate, mappingLokasiRanapDestroy, kamarList, mappingLokasiFarmasiIndex, mappingLokasiFarmasiStore, mappingLokasiFarmasiUpdate, mappingLokasiFarmasiDestroy, createResource, getResource }

export default SatuSehatController