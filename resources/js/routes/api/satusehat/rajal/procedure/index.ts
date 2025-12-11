import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
 * @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
 * @route '/api/satusehat/rajal/procedure'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/procedure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
 * @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
 * @route '/api/satusehat/rajal/procedure'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
 * @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:373
 * @route '/api/satusehat/rajal/procedure'
 */
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})
const procedure = {
    create: Object.assign(create, create),
}

export default procedure