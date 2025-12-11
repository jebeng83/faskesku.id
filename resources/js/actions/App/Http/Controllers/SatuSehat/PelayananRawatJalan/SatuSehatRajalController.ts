import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/permissions/satusehat/rajal/encounter'
*/
const createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.url(options),
    method: 'post',
})

createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/encounter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/permissions/satusehat/rajal/encounter'
*/
createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.url = (options?: RouteQueryOptions) => {
    return createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/permissions/satusehat/rajal/encounter'
*/
createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
const createEncounter9808b944237ab606d79b62d9ed9760d1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter9808b944237ab606d79b62d9ed9760d1.url(options),
    method: 'post',
})

createEncounter9808b944237ab606d79b62d9ed9760d1.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/encounter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
createEncounter9808b944237ab606d79b62d9ed9760d1.url = (options?: RouteQueryOptions) => {
    return createEncounter9808b944237ab606d79b62d9ed9760d1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
createEncounter9808b944237ab606d79b62d9ed9760d1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter9808b944237ab606d79b62d9ed9760d1.url(options),
    method: 'post',
})

export const createEncounter = {
    '/api/permissions/satusehat/rajal/encounter': createEncounter9eae77c3f0fa68fe18bbf7ddaeba9734,
    '/api/satusehat/rajal/encounter': createEncounter9808b944237ab606d79b62d9ed9760d1,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/permissions/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
const updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.url(args, options),
    method: 'put',
})

updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.definition = {
    methods: ["put"],
    url: '/api/permissions/satusehat/rajal/encounter/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/permissions/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/permissions/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.put = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
const updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.url(args, options),
    method: 'put',
})

updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.definition = {
    methods: ["put"],
    url: '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:581
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.put = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3.url(args, options),
    method: 'put',
})

export const updateEncounterByRawat = {
    '/api/permissions/satusehat/rajal/encounter/by-rawat/{no_rawat}': updateEncounterByRawatc9958edc8022bcd2e9b4d3c97e5ab19b,
    '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}': updateEncounterByRawata1aee0ee1a5474a2c88efb8a9d11a6f3,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
const encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.url(args, options),
    method: 'get',
})

encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.definition = {
    methods: ["get","head"],
    url: '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
const encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.url(args, options),
    method: 'get',
})

encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:738
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098.url(args, options),
    method: 'head',
})

export const encounterIdByRawat = {
    '/api/permissions/satusehat/rajal/encounter/id-by-rawat/{no_rawat}': encounterIdByRawat007c8167b4b7135d7cb847a3e7b13032,
    '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}': encounterIdByRawat7d3ea2dfb4a91e1e3d08e8d9f8da0098,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/permissions/satusehat/rajal/encounter/describe'
*/
const encounterTableDescribee7d25755b024622bb5ddfba46d761519 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribee7d25755b024622bb5ddfba46d761519.url(options),
    method: 'get',
})

encounterTableDescribee7d25755b024622bb5ddfba46d761519.definition = {
    methods: ["get","head"],
    url: '/api/permissions/satusehat/rajal/encounter/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/permissions/satusehat/rajal/encounter/describe'
*/
encounterTableDescribee7d25755b024622bb5ddfba46d761519.url = (options?: RouteQueryOptions) => {
    return encounterTableDescribee7d25755b024622bb5ddfba46d761519.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/permissions/satusehat/rajal/encounter/describe'
*/
encounterTableDescribee7d25755b024622bb5ddfba46d761519.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribee7d25755b024622bb5ddfba46d761519.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/permissions/satusehat/rajal/encounter/describe'
*/
encounterTableDescribee7d25755b024622bb5ddfba46d761519.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterTableDescribee7d25755b024622bb5ddfba46d761519.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/satusehat/rajal/encounter/describe'
*/
const encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.url(options),
    method: 'get',
})

encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.url = (options?: RouteQueryOptions) => {
    return encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:772
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6.url(options),
    method: 'head',
})

export const encounterTableDescribe = {
    '/api/permissions/satusehat/rajal/encounter/describe': encounterTableDescribee7d25755b024622bb5ddfba46d761519,
    '/api/satusehat/rajal/encounter/describe': encounterTableDescribe0780d7eb28045c47ef8a8d283aaa31f6,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/permissions/satusehat/rajal/diagnosa/describe'
*/
const diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.url(options),
    method: 'get',
})

diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.definition = {
    methods: ["get","head"],
    url: '/api/permissions/satusehat/rajal/diagnosa/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/permissions/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.url = (options?: RouteQueryOptions) => {
    return diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/permissions/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/permissions/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
const diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.url(options),
    method: 'get',
})

diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/diagnosa/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.url = (options?: RouteQueryOptions) => {
    return diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:784
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05.url(options),
    method: 'head',
})

export const diagnosaPasienDescribe = {
    '/api/permissions/satusehat/rajal/diagnosa/describe': diagnosaPasienDescribe58b09dbd9bb6d314d4ca67f9920efb77,
    '/api/satusehat/rajal/diagnosa/describe': diagnosaPasienDescribe8b48cf5e274e91b966cd65cd571dec05,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/permissions/satusehat/rajal/condition'
*/
const createConditiond5602de83e772dcc608c5939a587732e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createConditiond5602de83e772dcc608c5939a587732e.url(options),
    method: 'post',
})

createConditiond5602de83e772dcc608c5939a587732e.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/condition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/permissions/satusehat/rajal/condition'
*/
createConditiond5602de83e772dcc608c5939a587732e.url = (options?: RouteQueryOptions) => {
    return createConditiond5602de83e772dcc608c5939a587732e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/permissions/satusehat/rajal/condition'
*/
createConditiond5602de83e772dcc608c5939a587732e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createConditiond5602de83e772dcc608c5939a587732e.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/satusehat/rajal/condition'
*/
const createCondition36e4ba483ba38ccffc8349a2981ae2d1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCondition36e4ba483ba38ccffc8349a2981ae2d1.url(options),
    method: 'post',
})

createCondition36e4ba483ba38ccffc8349a2981ae2d1.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/condition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/satusehat/rajal/condition'
*/
createCondition36e4ba483ba38ccffc8349a2981ae2d1.url = (options?: RouteQueryOptions) => {
    return createCondition36e4ba483ba38ccffc8349a2981ae2d1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:155
* @route '/api/satusehat/rajal/condition'
*/
createCondition36e4ba483ba38ccffc8349a2981ae2d1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCondition36e4ba483ba38ccffc8349a2981ae2d1.url(options),
    method: 'post',
})

export const createCondition = {
    '/api/permissions/satusehat/rajal/condition': createConditiond5602de83e772dcc608c5939a587732e,
    '/api/satusehat/rajal/condition': createCondition36e4ba483ba38ccffc8349a2981ae2d1,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/permissions/satusehat/rajal/observation'
*/
const createObservation1aab58a0d267a953ce88e86d1797541c = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation1aab58a0d267a953ce88e86d1797541c.url(options),
    method: 'post',
})

createObservation1aab58a0d267a953ce88e86d1797541c.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/observation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/permissions/satusehat/rajal/observation'
*/
createObservation1aab58a0d267a953ce88e86d1797541c.url = (options?: RouteQueryOptions) => {
    return createObservation1aab58a0d267a953ce88e86d1797541c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/permissions/satusehat/rajal/observation'
*/
createObservation1aab58a0d267a953ce88e86d1797541c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation1aab58a0d267a953ce88e86d1797541c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/satusehat/rajal/observation'
*/
const createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.url(options),
    method: 'post',
})

createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/observation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/satusehat/rajal/observation'
*/
createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.url = (options?: RouteQueryOptions) => {
    return createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:231
* @route '/api/satusehat/rajal/observation'
*/
createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b.url(options),
    method: 'post',
})

export const createObservation = {
    '/api/permissions/satusehat/rajal/observation': createObservation1aab58a0d267a953ce88e86d1797541c,
    '/api/satusehat/rajal/observation': createObservation6c3fa79cf7e51daa7f8aab757bdf8b0b,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/permissions/satusehat/rajal/procedure'
*/
const createProcedure567ca92293e43157694902d48815db05 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure567ca92293e43157694902d48815db05.url(options),
    method: 'post',
})

createProcedure567ca92293e43157694902d48815db05.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/procedure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/permissions/satusehat/rajal/procedure'
*/
createProcedure567ca92293e43157694902d48815db05.url = (options?: RouteQueryOptions) => {
    return createProcedure567ca92293e43157694902d48815db05.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/permissions/satusehat/rajal/procedure'
*/
createProcedure567ca92293e43157694902d48815db05.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure567ca92293e43157694902d48815db05.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/satusehat/rajal/procedure'
*/
const createProcedure5746dbb9cabe81fd18dd3286c3dbc75a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.url(options),
    method: 'post',
})

createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/procedure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/satusehat/rajal/procedure'
*/
createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.url = (options?: RouteQueryOptions) => {
    return createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
* @route '/api/satusehat/rajal/procedure'
*/
createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure5746dbb9cabe81fd18dd3286c3dbc75a.url(options),
    method: 'post',
})

export const createProcedure = {
    '/api/permissions/satusehat/rajal/procedure': createProcedure567ca92293e43157694902d48815db05,
    '/api/satusehat/rajal/procedure': createProcedure5746dbb9cabe81fd18dd3286c3dbc75a,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/permissions/satusehat/rajal/composition'
*/
const createCompositiond197284bcaa50326df8c130b8a5d659b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCompositiond197284bcaa50326df8c130b8a5d659b.url(options),
    method: 'post',
})

createCompositiond197284bcaa50326df8c130b8a5d659b.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/composition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/permissions/satusehat/rajal/composition'
*/
createCompositiond197284bcaa50326df8c130b8a5d659b.url = (options?: RouteQueryOptions) => {
    return createCompositiond197284bcaa50326df8c130b8a5d659b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/permissions/satusehat/rajal/composition'
*/
createCompositiond197284bcaa50326df8c130b8a5d659b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCompositiond197284bcaa50326df8c130b8a5d659b.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
const createCompositiona8e51a16edc1a668b8abfa912b036c09 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCompositiona8e51a16edc1a668b8abfa912b036c09.url(options),
    method: 'post',
})

createCompositiona8e51a16edc1a668b8abfa912b036c09.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/composition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
createCompositiona8e51a16edc1a668b8abfa912b036c09.url = (options?: RouteQueryOptions) => {
    return createCompositiona8e51a16edc1a668b8abfa912b036c09.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
createCompositiona8e51a16edc1a668b8abfa912b036c09.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCompositiona8e51a16edc1a668b8abfa912b036c09.url(options),
    method: 'post',
})

export const createComposition = {
    '/api/permissions/satusehat/rajal/composition': createCompositiond197284bcaa50326df8c130b8a5d659b,
    '/api/satusehat/rajal/composition': createCompositiona8e51a16edc1a668b8abfa912b036c09,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/permissions/satusehat/rajal/bundle'
*/
const createBundle910dd1e683a7ab8715261515969df663 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle910dd1e683a7ab8715261515969df663.url(options),
    method: 'post',
})

createBundle910dd1e683a7ab8715261515969df663.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/bundle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/permissions/satusehat/rajal/bundle'
*/
createBundle910dd1e683a7ab8715261515969df663.url = (options?: RouteQueryOptions) => {
    return createBundle910dd1e683a7ab8715261515969df663.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/permissions/satusehat/rajal/bundle'
*/
createBundle910dd1e683a7ab8715261515969df663.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle910dd1e683a7ab8715261515969df663.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/satusehat/rajal/bundle'
*/
const createBundle4f7ee8cb7d196c34fe22454a3e99145e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle4f7ee8cb7d196c34fe22454a3e99145e.url(options),
    method: 'post',
})

createBundle4f7ee8cb7d196c34fe22454a3e99145e.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/bundle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/satusehat/rajal/bundle'
*/
createBundle4f7ee8cb7d196c34fe22454a3e99145e.url = (options?: RouteQueryOptions) => {
    return createBundle4f7ee8cb7d196c34fe22454a3e99145e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:546
* @route '/api/satusehat/rajal/bundle'
*/
createBundle4f7ee8cb7d196c34fe22454a3e99145e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle4f7ee8cb7d196c34fe22454a3e99145e.url(options),
    method: 'post',
})

export const createBundle = {
    '/api/permissions/satusehat/rajal/bundle': createBundle910dd1e683a7ab8715261515969df663,
    '/api/satusehat/rajal/bundle': createBundle4f7ee8cb7d196c34fe22454a3e99145e,
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/permissions/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
const pipelineByRawat323bb821a33bd4cd20c20818a7589c9a = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.url(args, options),
    method: 'post',
})

pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.definition = {
    methods: ["post"],
    url: '/api/permissions/satusehat/rajal/pipeline/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/permissions/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/permissions/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pipelineByRawat323bb821a33bd4cd20c20818a7589c9a.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
const pipelineByRawatea8be5b690beca99c859df49e8da40f8 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pipelineByRawatea8be5b690beca99c859df49e8da40f8.url(args, options),
    method: 'post',
})

pipelineByRawatea8be5b690beca99c859df49e8da40f8.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
pipelineByRawatea8be5b690beca99c859df49e8da40f8.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return pipelineByRawatea8be5b690beca99c859df49e8da40f8.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::pipelineByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
pipelineByRawatea8be5b690beca99c859df49e8da40f8.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pipelineByRawatea8be5b690beca99c859df49e8da40f8.url(args, options),
    method: 'post',
})

export const pipelineByRawat = {
    '/api/permissions/satusehat/rajal/pipeline/by-rawat/{no_rawat}': pipelineByRawat323bb821a33bd4cd20c20818a7589c9a,
    '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}': pipelineByRawatea8be5b690beca99c859df49e8da40f8,
}

const SatuSehatRajalController = { createEncounter, updateEncounterByRawat, encounterIdByRawat, encounterTableDescribe, diagnosaPasienDescribe, createCondition, createObservation, createProcedure, createComposition, createBundle, pipelineByRawat }

export default SatuSehatRajalController