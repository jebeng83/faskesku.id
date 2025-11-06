import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master-data/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:15
* @route '/master-data/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/master-data/jadwal/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::describe
* @see app/Http/Controllers/JadwalController.php:24
* @route '/master-data/jadwal/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

const jadwal = {
    index: Object.assign(index, index),
    describe: Object.assign(describe, describe),
}

export default jadwal