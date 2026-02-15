import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import pdf81d01d from './pdf'
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
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdf.url(options),
    method: 'post',
})

pdf.definition = {
    methods: ["post"],
    url: '/surat/pdf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::pdf
* @see app/Http/Controllers/SuratController.php:14
* @route '/surat/pdf'
*/
pdf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdf.url(options),
    method: 'post',
})

const surat = {
    preview: Object.assign(preview, preview),
    pdf: Object.assign(pdf, pdf81d01d),
}

export default surat