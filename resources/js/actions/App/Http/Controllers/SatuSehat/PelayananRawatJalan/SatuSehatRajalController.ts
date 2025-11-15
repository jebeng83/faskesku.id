import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
export const createEncounter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter.url(options),
    method: 'post',
})

createEncounter.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/encounter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
createEncounter.url = (options?: RouteQueryOptions) => {
    return createEncounter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createEncounter
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
createEncounter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEncounter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
export const updateEncounterByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawat.url(args, options),
    method: 'put',
})

updateEncounterByRawat.definition = {
    methods: ["put"],
    url: '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateEncounterByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateEncounterByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateEncounterByRawat.put = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEncounterByRawat.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
export const encounterIdByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat.url(args, options),
    method: 'get',
})

encounterIdByRawat.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return encounterIdByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterIdByRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterIdByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
encounterIdByRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterIdByRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
export const encounterTableDescribe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribe.url(options),
    method: 'get',
})

encounterTableDescribe.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe.url = (options?: RouteQueryOptions) => {
    return encounterTableDescribe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounterTableDescribe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::encounterTableDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
encounterTableDescribe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounterTableDescribe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:741
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
export const diagnosaPasienDescribe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe.url(options),
    method: 'get',
})

diagnosaPasienDescribe.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/diagnosa/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:741
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe.url = (options?: RouteQueryOptions) => {
    return diagnosaPasienDescribe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:741
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosaPasienDescribe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::diagnosaPasienDescribe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:741
* @route '/api/satusehat/rajal/diagnosa/describe'
*/
diagnosaPasienDescribe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosaPasienDescribe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:150
* @route '/api/satusehat/rajal/condition'
*/
export const createCondition = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCondition.url(options),
    method: 'post',
})

createCondition.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/condition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:150
* @route '/api/satusehat/rajal/condition'
*/
createCondition.url = (options?: RouteQueryOptions) => {
    return createCondition.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createCondition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:150
* @route '/api/satusehat/rajal/condition'
*/
createCondition.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCondition.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:225
* @route '/api/satusehat/rajal/observation'
*/
export const createObservation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation.url(options),
    method: 'post',
})

createObservation.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/observation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:225
* @route '/api/satusehat/rajal/observation'
*/
createObservation.url = (options?: RouteQueryOptions) => {
    return createObservation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createObservation
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:225
* @route '/api/satusehat/rajal/observation'
*/
createObservation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createObservation.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:360
* @route '/api/satusehat/rajal/procedure'
*/
export const createProcedure = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure.url(options),
    method: 'post',
})

createProcedure.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/procedure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:360
* @route '/api/satusehat/rajal/procedure'
*/
createProcedure.url = (options?: RouteQueryOptions) => {
    return createProcedure.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createProcedure
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:360
* @route '/api/satusehat/rajal/procedure'
*/
createProcedure.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createProcedure.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:423
* @route '/api/satusehat/rajal/composition'
*/
export const createComposition = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createComposition.url(options),
    method: 'post',
})

createComposition.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/composition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:423
* @route '/api/satusehat/rajal/composition'
*/
createComposition.url = (options?: RouteQueryOptions) => {
    return createComposition.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createComposition
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:423
* @route '/api/satusehat/rajal/composition'
*/
createComposition.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createComposition.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:513
* @route '/api/satusehat/rajal/bundle'
*/
export const createBundle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle.url(options),
    method: 'post',
})

createBundle.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/bundle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:513
* @route '/api/satusehat/rajal/bundle'
*/
createBundle.url = (options?: RouteQueryOptions) => {
    return createBundle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::createBundle
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:513
* @route '/api/satusehat/rajal/bundle'
*/
createBundle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createBundle.url(options),
    method: 'post',
})

const SatuSehatRajalController = { createEncounter, updateEncounterByRawat, encounterIdByRawat, encounterTableDescribe, diagnosaPasienDescribe, createCondition, createObservation, createProcedure, createComposition, createBundle }

export default SatuSehatRajalController