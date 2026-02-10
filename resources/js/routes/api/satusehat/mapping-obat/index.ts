import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:34
* @route '/api/satusehat/mapping-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:34
* @route '/api/satusehat/mapping-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:34
* @route '/api/satusehat/mapping-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:34
* @route '/api/satusehat/mapping-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:53
* @route '/api/satusehat/mapping-obat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:53
* @route '/api/satusehat/mapping-obat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:53
* @route '/api/satusehat/mapping-obat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testStore
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:90
* @route '/api/satusehat/mapping-obat/test-store'
*/
export const testStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testStore.url(options),
    method: 'post',
})

testStore.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping-obat/test-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testStore
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:90
* @route '/api/satusehat/mapping-obat/test-store'
*/
testStore.url = (options?: RouteQueryOptions) => {
    return testStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testStore
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:90
* @route '/api/satusehat/mapping-obat/test-store'
*/
testStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:241
* @route '/api/satusehat/mapping-obat/{kode_brng}'
*/
export const destroy = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping-obat/{kode_brng}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:241
* @route '/api/satusehat/mapping-obat/{kode_brng}'
*/
destroy.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return destroy.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:241
* @route '/api/satusehat/mapping-obat/{kode_brng}'
*/
destroy.delete = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::searchBarang
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:252
* @route '/api/satusehat/mapping-obat/search-barang'
*/
export const searchBarang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchBarang.url(options),
    method: 'get',
})

searchBarang.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping-obat/search-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::searchBarang
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:252
* @route '/api/satusehat/mapping-obat/search-barang'
*/
searchBarang.url = (options?: RouteQueryOptions) => {
    return searchBarang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::searchBarang
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:252
* @route '/api/satusehat/mapping-obat/search-barang'
*/
searchBarang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchBarang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::searchBarang
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:252
* @route '/api/satusehat/mapping-obat/search-barang'
*/
searchBarang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchBarang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testRelay
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:211
* @route '/api/satusehat/mapping-obat/test-relay'
*/
export const testRelay = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testRelay.url(options),
    method: 'post',
})

testRelay.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping-obat/test-relay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testRelay
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:211
* @route '/api/satusehat/mapping-obat/test-relay'
*/
testRelay.url = (options?: RouteQueryOptions) => {
    return testRelay.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController::testRelay
* @see app/Http/Controllers/SatuSehat/SatuSehatMedicationMappingController.php:211
* @route '/api/satusehat/mapping-obat/test-relay'
*/
testRelay.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testRelay.url(options),
    method: 'post',
})

const mappingObat = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    testStore: Object.assign(testStore, testStore),
    destroy: Object.assign(destroy, destroy),
    searchBarang: Object.assign(searchBarang, searchBarang),
    testRelay: Object.assign(testRelay, testRelay),
}

export default mappingObat