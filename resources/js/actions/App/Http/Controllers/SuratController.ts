import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SuratController::preview
* @see app/Http/Controllers/SuratController.php:874
* @route '/surat/preview'
*/
export const preview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/surat/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::preview
* @see app/Http/Controllers/SuratController.php:874
* @route '/surat/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::preview
* @see app/Http/Controllers/SuratController.php:874
* @route '/surat/preview'
*/
preview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::preview
* @see app/Http/Controllers/SuratController.php:874
* @route '/surat/preview'
*/
preview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
const pdfd243cffeb63cc979507f40ed59195aba = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdfd243cffeb63cc979507f40ed59195aba.url(options),
    method: 'post',
})

pdfd243cffeb63cc979507f40ed59195aba.definition = {
    methods: ["post"],
    url: '/surat/pdf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdfd243cffeb63cc979507f40ed59195aba.url = (options?: RouteQueryOptions) => {
    return pdfd243cffeb63cc979507f40ed59195aba.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdfd243cffeb63cc979507f40ed59195aba.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdfd243cffeb63cc979507f40ed59195aba.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
const pdfd243cffeb63cc979507f40ed59195aba = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfd243cffeb63cc979507f40ed59195aba.url(options),
    method: 'get',
})

pdfd243cffeb63cc979507f40ed59195aba.definition = {
    methods: ["get","head"],
    url: '/surat/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdfd243cffeb63cc979507f40ed59195aba.url = (options?: RouteQueryOptions) => {
    return pdfd243cffeb63cc979507f40ed59195aba.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdfd243cffeb63cc979507f40ed59195aba.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfd243cffeb63cc979507f40ed59195aba.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdfd243cffeb63cc979507f40ed59195aba.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdfd243cffeb63cc979507f40ed59195aba.url(options),
    method: 'head',
})

export const pdf = {
    '/surat/pdf': pdfd243cffeb63cc979507f40ed59195aba,
    '/surat/pdf': pdfd243cffeb63cc979507f40ed59195aba,
}

const SuratController = { preview, pdf }

export default SuratController