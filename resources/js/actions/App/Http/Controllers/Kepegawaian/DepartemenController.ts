import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/permissions/departemen'
*/
const index92d85d9d8bb5cb4d78573cbb954f120e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index92d85d9d8bb5cb4d78573cbb954f120e.url(options),
    method: 'get',
})

index92d85d9d8bb5cb4d78573cbb954f120e.definition = {
    methods: ["get","head"],
    url: '/api/permissions/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/permissions/departemen'
*/
index92d85d9d8bb5cb4d78573cbb954f120e.url = (options?: RouteQueryOptions) => {
    return index92d85d9d8bb5cb4d78573cbb954f120e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/permissions/departemen'
*/
index92d85d9d8bb5cb4d78573cbb954f120e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index92d85d9d8bb5cb4d78573cbb954f120e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/permissions/departemen'
*/
index92d85d9d8bb5cb4d78573cbb954f120e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index92d85d9d8bb5cb4d78573cbb954f120e.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/departemen'
*/
const index23bccff99181a3bb93165783bcb4d62c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index23bccff99181a3bb93165783bcb4d62c.url(options),
    method: 'get',
})

index23bccff99181a3bb93165783bcb4d62c.definition = {
    methods: ["get","head"],
    url: '/api/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/departemen'
*/
index23bccff99181a3bb93165783bcb4d62c.url = (options?: RouteQueryOptions) => {
    return index23bccff99181a3bb93165783bcb4d62c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/departemen'
*/
index23bccff99181a3bb93165783bcb4d62c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index23bccff99181a3bb93165783bcb4d62c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::index
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:20
* @route '/api/departemen'
*/
index23bccff99181a3bb93165783bcb4d62c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index23bccff99181a3bb93165783bcb4d62c.url(options),
    method: 'head',
})

export const index = {
    '/api/permissions/departemen': index92d85d9d8bb5cb4d78573cbb954f120e,
    '/api/departemen': index23bccff99181a3bb93165783bcb4d62c,
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
* @route '/departemen'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/departemen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
* @route '/departemen'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\DepartemenController::store
* @see app/Http/Controllers/Kepegawaian/DepartemenController.php:50
* @route '/departemen'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const DepartemenController = { index, store }

export default DepartemenController