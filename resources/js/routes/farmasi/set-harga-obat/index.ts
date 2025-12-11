import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::json
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/farmasi/set-harga-obat/json'
*/
export const json = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: json.url(options),
    method: 'get',
})

json.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-harga-obat/json',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::json
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/farmasi/set-harga-obat/json'
*/
json.url = (options?: RouteQueryOptions) => {
    return json.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::json
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/farmasi/set-harga-obat/json'
*/
json.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: json.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::json
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:508
* @route '/farmasi/set-harga-obat/json'
*/
json.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: json.url(options),
    method: 'head',
})

