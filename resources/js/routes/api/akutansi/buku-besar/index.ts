import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::index
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:35
* @route '/api/akutansi/buku-besar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/buku-besar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::index
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:35
* @route '/api/akutansi/buku-besar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::index
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:35
* @route '/api/akutansi/buku-besar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\BukuBesarController::index
* @see app/Http/Controllers/Akutansi/BukuBesarController.php:35
* @route '/api/akutansi/buku-besar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const bukuBesar = {
    index: Object.assign(index, index),
}

export default bukuBesar