import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:14
 * @route '/api/wilayah/provinces'
 */
export const provinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:14
 * @route '/api/wilayah/provinces'
 */
provinces.url = (options?: RouteQueryOptions) => {
    return provinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:14
 * @route '/api/wilayah/provinces'
 */
provinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::provinces
 * @see app/Http/Controllers/API/WilayahController.php:14
 * @route '/api/wilayah/provinces'
 */
provinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:35
 * @route '/api/wilayah/regencies/{provinceCode}'
 */
export const regencies = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies.url(args, options),
    method: 'get',
})

regencies.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/regencies/{provinceCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:35
 * @route '/api/wilayah/regencies/{provinceCode}'
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
 * @see app/Http/Controllers/API/WilayahController.php:35
 * @route '/api/wilayah/regencies/{provinceCode}'
 */
regencies.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::regencies
 * @see app/Http/Controllers/API/WilayahController.php:35
 * @route '/api/wilayah/regencies/{provinceCode}'
 */
regencies.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regencies.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:65
 * @route '/api/wilayah/districts/{regencyCode}'
 */
export const districts = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(args, options),
    method: 'get',
})

districts.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/districts/{regencyCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:65
 * @route '/api/wilayah/districts/{regencyCode}'
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
 * @see app/Http/Controllers/API/WilayahController.php:65
 * @route '/api/wilayah/districts/{regencyCode}'
 */
districts.get = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::districts
 * @see app/Http/Controllers/API/WilayahController.php:65
 * @route '/api/wilayah/districts/{regencyCode}'
 */
districts.head = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districts.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:95
 * @route '/api/wilayah/villages/{districtCode}'
 */
export const villages = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(args, options),
    method: 'get',
})

villages.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/villages/{districtCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:95
 * @route '/api/wilayah/villages/{districtCode}'
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
 * @see app/Http/Controllers/API/WilayahController.php:95
 * @route '/api/wilayah/villages/{districtCode}'
 */
villages.get = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\WilayahController::villages
 * @see app/Http/Controllers/API/WilayahController.php:95
 * @route '/api/wilayah/villages/{districtCode}'
 */
villages.head = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: villages.url(args, options),
    method: 'head',
})
const wilayah = {
    provinces,
regencies,
districts,
villages,
}

export default wilayah