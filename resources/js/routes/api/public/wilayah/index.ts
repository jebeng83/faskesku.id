import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:15
 * @route '/api/public/wilayah/provinces'
 */
export const provinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:15
 * @route '/api/public/wilayah/provinces'
 */
provinces.url = (options?: RouteQueryOptions) => {
    return provinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:15
 * @route '/api/public/wilayah/provinces'
 */
provinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:15
 * @route '/api/public/wilayah/provinces'
 */
provinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:43
 * @route '/api/public/wilayah/regencies/{provinceCode}'
 */
export const regencies = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies.url(args, options),
    method: 'get',
})

regencies.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/regencies/{provinceCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:43
 * @route '/api/public/wilayah/regencies/{provinceCode}'
 */
regencies.url = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provinceCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    provinceCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        provinceCode: args.provinceCode,
                }

    return regencies.definition.url
            .replace('{provinceCode}', parsedArgs.provinceCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:43
 * @route '/api/public/wilayah/regencies/{provinceCode}'
 */
regencies.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:43
 * @route '/api/public/wilayah/regencies/{provinceCode}'
 */
regencies.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regencies.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:80
 * @route '/api/public/wilayah/districts/{regencyCode}'
 */
export const districts = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(args, options),
    method: 'get',
})

districts.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/districts/{regencyCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:80
 * @route '/api/public/wilayah/districts/{regencyCode}'
 */
districts.url = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regencyCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    regencyCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        regencyCode: args.regencyCode,
                }

    return districts.definition.url
            .replace('{regencyCode}', parsedArgs.regencyCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:80
 * @route '/api/public/wilayah/districts/{regencyCode}'
 */
districts.get = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:80
 * @route '/api/public/wilayah/districts/{regencyCode}'
 */
districts.head = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districts.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:117
 * @route '/api/public/wilayah/villages/{districtCode}'
 */
export const villages = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(args, options),
    method: 'get',
})

villages.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/villages/{districtCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:117
 * @route '/api/public/wilayah/villages/{districtCode}'
 */
villages.url = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { districtCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    districtCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        districtCode: args.districtCode,
                }

    return villages.definition.url
            .replace('{districtCode}', parsedArgs.districtCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:117
 * @route '/api/public/wilayah/villages/{districtCode}'
 */
villages.get = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:117
 * @route '/api/public/wilayah/villages/{districtCode}'
 */
villages.head = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: villages.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/public/wilayah/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/public/wilayah/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/public/wilayah/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::search
 * @see app/Http/Controllers/API/WilayahController.php:186
 * @route '/api/public/wilayah/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})
const wilayah = {
    provinces: Object.assign(provinces, provinces),
regencies: Object.assign(regencies, regencies),
districts: Object.assign(districts, districts),
villages: Object.assign(villages, villages),
search: Object.assign(search, search),
}

export default wilayah