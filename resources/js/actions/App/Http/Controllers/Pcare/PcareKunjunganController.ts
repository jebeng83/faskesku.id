import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::update
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:700
* @route '/api/pcare/kunjungan'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::update
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:700
* @route '/api/pcare/kunjungan'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::update
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:700
* @route '/api/pcare/kunjungan'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::destroy
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1546
* @route '/api/pcare/kunjungan/{noKunjungan}'
*/
export const destroy = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/pcare/kunjungan/{noKunjungan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::destroy
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1546
* @route '/api/pcare/kunjungan/{noKunjungan}'
*/
destroy.url = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noKunjungan: args }
    }

    if (Array.isArray(args)) {
        args = {
            noKunjungan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noKunjungan: args.noKunjungan,
    }

    return destroy.definition.url
            .replace('{noKunjungan}', parsedArgs.noKunjungan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::destroy
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1546
* @route '/api/pcare/kunjungan/{noKunjungan}'
*/
destroy.delete = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1849
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
export const preview = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kunjungan/preview/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1849
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return preview.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1849
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1849
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::getNoKunjungan
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1727
* @route '/api/pcare/kunjungan/nokunjungan/{no_rawat}'
*/
export const getNoKunjungan = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNoKunjungan.url(args, options),
    method: 'get',
})

getNoKunjungan.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kunjungan/nokunjungan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::getNoKunjungan
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1727
* @route '/api/pcare/kunjungan/nokunjungan/{no_rawat}'
*/
getNoKunjungan.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return getNoKunjungan.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::getNoKunjungan
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1727
* @route '/api/pcare/kunjungan/nokunjungan/{no_rawat}'
*/
getNoKunjungan.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNoKunjungan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::getNoKunjungan
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:1727
* @route '/api/pcare/kunjungan/nokunjungan/{no_rawat}'
*/
getNoKunjungan.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getNoKunjungan.url(args, options),
    method: 'head',
})

const PcareKunjunganController = { store, update, destroy, preview, getNoKunjungan }

export default PcareKunjunganController