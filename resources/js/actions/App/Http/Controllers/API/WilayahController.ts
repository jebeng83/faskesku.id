import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/public/wilayah/provinces'
*/
const provincesae20c4f20fdc56974372ce47c50bda64 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provincesae20c4f20fdc56974372ce47c50bda64.url(options),
    method: 'get',
})

provincesae20c4f20fdc56974372ce47c50bda64.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/public/wilayah/provinces'
*/
provincesae20c4f20fdc56974372ce47c50bda64.url = (options?: RouteQueryOptions) => {
    return provincesae20c4f20fdc56974372ce47c50bda64.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/public/wilayah/provinces'
*/
provincesae20c4f20fdc56974372ce47c50bda64.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provincesae20c4f20fdc56974372ce47c50bda64.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/public/wilayah/provinces'
*/
provincesae20c4f20fdc56974372ce47c50bda64.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provincesae20c4f20fdc56974372ce47c50bda64.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/wilayah/provinces'
*/
const provincese1b0a063813a08cf1c8a0ea75e30cdc9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provincese1b0a063813a08cf1c8a0ea75e30cdc9.url(options),
    method: 'get',
})

provincese1b0a063813a08cf1c8a0ea75e30cdc9.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/wilayah/provinces'
*/
provincese1b0a063813a08cf1c8a0ea75e30cdc9.url = (options?: RouteQueryOptions) => {
    return provincese1b0a063813a08cf1c8a0ea75e30cdc9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/wilayah/provinces'
*/
provincese1b0a063813a08cf1c8a0ea75e30cdc9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provincese1b0a063813a08cf1c8a0ea75e30cdc9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::provinces
* @see app/Http/Controllers/API/WilayahController.php:15
* @route '/api/wilayah/provinces'
*/
provincese1b0a063813a08cf1c8a0ea75e30cdc9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provincese1b0a063813a08cf1c8a0ea75e30cdc9.url(options),
    method: 'head',
})

export const provinces = {
    '/api/public/wilayah/provinces': provincesae20c4f20fdc56974372ce47c50bda64,
    '/api/wilayah/provinces': provincese1b0a063813a08cf1c8a0ea75e30cdc9,
}

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/public/wilayah/regencies/{provinceCode}'
*/
const regencies029df5088317a9b29596e44463452ac2 = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies029df5088317a9b29596e44463452ac2.url(args, options),
    method: 'get',
})

regencies029df5088317a9b29596e44463452ac2.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/regencies/{provinceCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/public/wilayah/regencies/{provinceCode}'
*/
regencies029df5088317a9b29596e44463452ac2.url = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return regencies029df5088317a9b29596e44463452ac2.definition.url
            .replace('{provinceCode}', parsedArgs.provinceCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/public/wilayah/regencies/{provinceCode}'
*/
regencies029df5088317a9b29596e44463452ac2.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies029df5088317a9b29596e44463452ac2.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/public/wilayah/regencies/{provinceCode}'
*/
regencies029df5088317a9b29596e44463452ac2.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regencies029df5088317a9b29596e44463452ac2.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/wilayah/regencies/{provinceCode}'
*/
const regencies4f4f87c9e56d3a55f793a5a9315f9dc7 = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies4f4f87c9e56d3a55f793a5a9315f9dc7.url(args, options),
    method: 'get',
})

regencies4f4f87c9e56d3a55f793a5a9315f9dc7.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/regencies/{provinceCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/wilayah/regencies/{provinceCode}'
*/
regencies4f4f87c9e56d3a55f793a5a9315f9dc7.url = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return regencies4f4f87c9e56d3a55f793a5a9315f9dc7.definition.url
            .replace('{provinceCode}', parsedArgs.provinceCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/wilayah/regencies/{provinceCode}'
*/
regencies4f4f87c9e56d3a55f793a5a9315f9dc7.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regencies4f4f87c9e56d3a55f793a5a9315f9dc7.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::regencies
* @see app/Http/Controllers/API/WilayahController.php:43
* @route '/api/wilayah/regencies/{provinceCode}'
*/
regencies4f4f87c9e56d3a55f793a5a9315f9dc7.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regencies4f4f87c9e56d3a55f793a5a9315f9dc7.url(args, options),
    method: 'head',
})

export const regencies = {
    '/api/public/wilayah/regencies/{provinceCode}': regencies029df5088317a9b29596e44463452ac2,
    '/api/wilayah/regencies/{provinceCode}': regencies4f4f87c9e56d3a55f793a5a9315f9dc7,
}

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/public/wilayah/districts/{regencyCode}'
*/
const districts2ebbdbabe49ed33bdf8dfa8056070162 = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts2ebbdbabe49ed33bdf8dfa8056070162.url(args, options),
    method: 'get',
})

districts2ebbdbabe49ed33bdf8dfa8056070162.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/districts/{regencyCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/public/wilayah/districts/{regencyCode}'
*/
districts2ebbdbabe49ed33bdf8dfa8056070162.url = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return districts2ebbdbabe49ed33bdf8dfa8056070162.definition.url
            .replace('{regencyCode}', parsedArgs.regencyCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/public/wilayah/districts/{regencyCode}'
*/
districts2ebbdbabe49ed33bdf8dfa8056070162.get = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts2ebbdbabe49ed33bdf8dfa8056070162.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/public/wilayah/districts/{regencyCode}'
*/
districts2ebbdbabe49ed33bdf8dfa8056070162.head = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districts2ebbdbabe49ed33bdf8dfa8056070162.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/wilayah/districts/{regencyCode}'
*/
const districtsf2040c4710d0444dde41436c894c635c = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districtsf2040c4710d0444dde41436c894c635c.url(args, options),
    method: 'get',
})

districtsf2040c4710d0444dde41436c894c635c.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/districts/{regencyCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/wilayah/districts/{regencyCode}'
*/
districtsf2040c4710d0444dde41436c894c635c.url = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return districtsf2040c4710d0444dde41436c894c635c.definition.url
            .replace('{regencyCode}', parsedArgs.regencyCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/wilayah/districts/{regencyCode}'
*/
districtsf2040c4710d0444dde41436c894c635c.get = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districtsf2040c4710d0444dde41436c894c635c.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::districts
* @see app/Http/Controllers/API/WilayahController.php:80
* @route '/api/wilayah/districts/{regencyCode}'
*/
districtsf2040c4710d0444dde41436c894c635c.head = (args: { regencyCode: string | number } | [regencyCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districtsf2040c4710d0444dde41436c894c635c.url(args, options),
    method: 'head',
})

export const districts = {
    '/api/public/wilayah/districts/{regencyCode}': districts2ebbdbabe49ed33bdf8dfa8056070162,
    '/api/wilayah/districts/{regencyCode}': districtsf2040c4710d0444dde41436c894c635c,
}

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/public/wilayah/villages/{districtCode}'
*/
const villages921437331b319849fcab3cbfa2163336 = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages921437331b319849fcab3cbfa2163336.url(args, options),
    method: 'get',
})

villages921437331b319849fcab3cbfa2163336.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/villages/{districtCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/public/wilayah/villages/{districtCode}'
*/
villages921437331b319849fcab3cbfa2163336.url = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return villages921437331b319849fcab3cbfa2163336.definition.url
            .replace('{districtCode}', parsedArgs.districtCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/public/wilayah/villages/{districtCode}'
*/
villages921437331b319849fcab3cbfa2163336.get = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages921437331b319849fcab3cbfa2163336.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/public/wilayah/villages/{districtCode}'
*/
villages921437331b319849fcab3cbfa2163336.head = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: villages921437331b319849fcab3cbfa2163336.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/wilayah/villages/{districtCode}'
*/
const villages0170dba3d327bd2f252a53fafda04574 = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages0170dba3d327bd2f252a53fafda04574.url(args, options),
    method: 'get',
})

villages0170dba3d327bd2f252a53fafda04574.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/villages/{districtCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/wilayah/villages/{districtCode}'
*/
villages0170dba3d327bd2f252a53fafda04574.url = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return villages0170dba3d327bd2f252a53fafda04574.definition.url
            .replace('{districtCode}', parsedArgs.districtCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/wilayah/villages/{districtCode}'
*/
villages0170dba3d327bd2f252a53fafda04574.get = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages0170dba3d327bd2f252a53fafda04574.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::villages
* @see app/Http/Controllers/API/WilayahController.php:117
* @route '/api/wilayah/villages/{districtCode}'
*/
villages0170dba3d327bd2f252a53fafda04574.head = (args: { districtCode: string | number } | [districtCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: villages0170dba3d327bd2f252a53fafda04574.url(args, options),
    method: 'head',
})

export const villages = {
    '/api/public/wilayah/villages/{districtCode}': villages921437331b319849fcab3cbfa2163336,
    '/api/wilayah/villages/{districtCode}': villages0170dba3d327bd2f252a53fafda04574,
}

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/public/wilayah/search'
*/
const searchffbb1039b5f499f4af2f598c9a8f770e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchffbb1039b5f499f4af2f598c9a8f770e.url(options),
    method: 'get',
})

searchffbb1039b5f499f4af2f598c9a8f770e.definition = {
    methods: ["get","head"],
    url: '/api/public/wilayah/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/public/wilayah/search'
*/
searchffbb1039b5f499f4af2f598c9a8f770e.url = (options?: RouteQueryOptions) => {
    return searchffbb1039b5f499f4af2f598c9a8f770e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/public/wilayah/search'
*/
searchffbb1039b5f499f4af2f598c9a8f770e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchffbb1039b5f499f4af2f598c9a8f770e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/public/wilayah/search'
*/
searchffbb1039b5f499f4af2f598c9a8f770e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchffbb1039b5f499f4af2f598c9a8f770e.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/wilayah/search'
*/
const search1ddb6c368370b96f1a505dd5884ee6a7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search1ddb6c368370b96f1a505dd5884ee6a7.url(options),
    method: 'get',
})

search1ddb6c368370b96f1a505dd5884ee6a7.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/wilayah/search'
*/
search1ddb6c368370b96f1a505dd5884ee6a7.url = (options?: RouteQueryOptions) => {
    return search1ddb6c368370b96f1a505dd5884ee6a7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/wilayah/search'
*/
search1ddb6c368370b96f1a505dd5884ee6a7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search1ddb6c368370b96f1a505dd5884ee6a7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::search
* @see app/Http/Controllers/API/WilayahController.php:186
* @route '/api/wilayah/search'
*/
search1ddb6c368370b96f1a505dd5884ee6a7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search1ddb6c368370b96f1a505dd5884ee6a7.url(options),
    method: 'head',
})

export const search = {
    '/api/public/wilayah/search': searchffbb1039b5f499f4af2f598c9a8f770e,
    '/api/wilayah/search': search1ddb6c368370b96f1a505dd5884ee6a7,
}

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
* @see app/Http/Controllers/API/WilayahController.php:154
* @route '/api/wilayah/all-villages'
*/
export const allVillages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVillages.url(options),
    method: 'get',
})

allVillages.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/all-villages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
* @see app/Http/Controllers/API/WilayahController.php:154
* @route '/api/wilayah/all-villages'
*/
allVillages.url = (options?: RouteQueryOptions) => {
    return allVillages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
* @see app/Http/Controllers/API/WilayahController.php:154
* @route '/api/wilayah/all-villages'
*/
allVillages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVillages.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::allVillages
* @see app/Http/Controllers/API/WilayahController.php:154
* @route '/api/wilayah/all-villages'
*/
allVillages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allVillages.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\WilayahController::show
* @see app/Http/Controllers/API/WilayahController.php:227
* @route '/api/wilayah/{code}'
*/
export const show = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/wilayah/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\WilayahController::show
* @see app/Http/Controllers/API/WilayahController.php:227
* @route '/api/wilayah/{code}'
*/
show.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    if (Array.isArray(args)) {
        args = {
            code: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        code: args.code,
    }

    return show.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\WilayahController::show
* @see app/Http/Controllers/API/WilayahController.php:227
* @route '/api/wilayah/{code}'
*/
show.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\WilayahController::show
* @see app/Http/Controllers/API/WilayahController.php:227
* @route '/api/wilayah/{code}'
*/
show.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const WilayahController = { provinces, regencies, districts, villages, search, allVillages, show }

export default WilayahController