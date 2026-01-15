import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:18
* @route '/akutansi/rekening'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/rekening',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:18
* @route '/akutansi/rekening'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:18
* @route '/akutansi/rekening'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningController::page
* @see app/Http/Controllers/Akutansi/RekeningController.php:18
* @route '/akutansi/rekening'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const rekening = {
    page: Object.assign(page, page),
}

export default rekening