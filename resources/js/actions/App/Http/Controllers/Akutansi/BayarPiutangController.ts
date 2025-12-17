import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::index
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:18
 * @route '/api/akutansi/bayar-piutang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/bayar-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::index
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:18
 * @route '/api/akutansi/bayar-piutang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::index
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:18
 * @route '/api/akutansi/bayar-piutang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::index
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:18
 * @route '/api/akutansi/bayar-piutang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::show
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:56
 * @route '/api/akutansi/bayar-piutang/show'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/bayar-piutang/show',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::show
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:56
 * @route '/api/akutansi/bayar-piutang/show'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::show
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:56
 * @route '/api/akutansi/bayar-piutang/show'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::show
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:56
 * @route '/api/akutansi/bayar-piutang/show'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::store
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:83
 * @route '/api/akutansi/bayar-piutang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/bayar-piutang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::store
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:83
 * @route '/api/akutansi/bayar-piutang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::store
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:83
 * @route '/api/akutansi/bayar-piutang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::update
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:148
 * @route '/api/akutansi/bayar-piutang'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/bayar-piutang',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::update
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:148
 * @route '/api/akutansi/bayar-piutang'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::update
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:148
 * @route '/api/akutansi/bayar-piutang'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:186
 * @route '/api/akutansi/bayar-piutang'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/bayar-piutang',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:186
 * @route '/api/akutansi/bayar-piutang'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::destroy
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:186
 * @route '/api/akutansi/bayar-piutang'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::getTotalPiutang
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:214
 * @route '/api/akutansi/bayar-piutang/total'
 */
export const getTotalPiutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTotalPiutang.url(options),
    method: 'get',
})

getTotalPiutang.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/bayar-piutang/total',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::getTotalPiutang
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:214
 * @route '/api/akutansi/bayar-piutang/total'
 */
getTotalPiutang.url = (options?: RouteQueryOptions) => {
    return getTotalPiutang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::getTotalPiutang
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:214
 * @route '/api/akutansi/bayar-piutang/total'
 */
getTotalPiutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTotalPiutang.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Akutansi\BayarPiutangController::getTotalPiutang
 * @see app/Http/Controllers/Akutansi/BayarPiutangController.php:214
 * @route '/api/akutansi/bayar-piutang/total'
 */
getTotalPiutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTotalPiutang.url(options),
    method: 'head',
})
const BayarPiutangController = { index, show, store, update, destroy, getTotalPiutang }

export default BayarPiutangController