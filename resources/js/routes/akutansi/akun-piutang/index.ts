import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
* @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
* @route '/akutansi/akun-piutang'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/akutansi/akun-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
* @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
* @route '/akutansi/akun-piutang'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
* @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
* @route '/akutansi/akun-piutang'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\AkunPiutangController::page
* @see app/Http/Controllers/Akutansi/AkunPiutangController.php:15
* @route '/akutansi/akun-piutang'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const akunPiutang = {
    page: Object.assign(page, page),
}

export default akunPiutang