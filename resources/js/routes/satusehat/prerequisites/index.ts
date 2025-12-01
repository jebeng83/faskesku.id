import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:1021
* @route '/satusehat/prerequisites/organization'
*/
export const organization = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

organization.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/organization',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1021
* @route '/satusehat/prerequisites/organization'
*/
organization.url = (options?: RouteQueryOptions) => {
    return organization.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1021
* @route '/satusehat/prerequisites/organization'
*/
organization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1021
* @route '/satusehat/prerequisites/organization'
*/
organization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organization.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1025
* @route '/satusehat/prerequisites/location'
*/
export const location = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(options),
    method: 'get',
})

location.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1025
* @route '/satusehat/prerequisites/location'
*/
location.url = (options?: RouteQueryOptions) => {
    return location.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1025
* @route '/satusehat/prerequisites/location'
*/
location.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1025
* @route '/satusehat/prerequisites/location'
*/
location.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1029
* @route '/satusehat/prerequisites/location-ranap'
*/
export const location_ranap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_ranap.url(options),
    method: 'get',
})

location_ranap.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1029
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.url = (options?: RouteQueryOptions) => {
    return location_ranap.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1029
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_ranap.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1029
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location_ranap.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1032
* @route '/satusehat/prerequisites/location-farmasi'
*/
export const location_farmasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_farmasi.url(options),
    method: 'get',
})

location_farmasi.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location-farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1032
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.url = (options?: RouteQueryOptions) => {
    return location_farmasi.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1032
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_farmasi.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1032
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location_farmasi.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1035
* @route '/satusehat/prerequisites/practitioner'
*/
export const practitioner = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitioner.url(options),
    method: 'get',
})

practitioner.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1035
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.url = (options?: RouteQueryOptions) => {
    return practitioner.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1035
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitioner.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1035
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: practitioner.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1038
* @route '/satusehat/prerequisites/patient'
*/
export const patient = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patient.url(options),
    method: 'get',
})

patient.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/patient',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1038
* @route '/satusehat/prerequisites/patient'
*/
patient.url = (options?: RouteQueryOptions) => {
    return patient.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1038
* @route '/satusehat/prerequisites/patient'
*/
patient.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patient.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1038
* @route '/satusehat/prerequisites/patient'
*/
patient.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patient.url(options),
    method: 'head',
})

const prerequisites = {
    organization: Object.assign(organization, organization),
    location: Object.assign(location, location),
    location_ranap: Object.assign(location_ranap, location_ranap),
    location_farmasi: Object.assign(location_farmasi, location_farmasi),
    practitioner: Object.assign(practitioner, practitioner),
    patient: Object.assign(patient, patient),
}

export default prerequisites