import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::index
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:17
* @route '/api/akutansi/rekeningtahun'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/rekeningtahun',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::index
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:17
* @route '/api/akutansi/rekeningtahun'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::index
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:17
* @route '/api/akutansi/rekeningtahun'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::index
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:17
* @route '/api/akutansi/rekeningtahun'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::store
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:121
* @route '/api/akutansi/rekeningtahun'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/rekeningtahun',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::store
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:121
* @route '/api/akutansi/rekeningtahun'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::store
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:121
* @route '/api/akutansi/rekeningtahun'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::update
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:140
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
export const update = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/rekeningtahun/{thn}/{kd_rek}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::update
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:140
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
update.url = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            thn: args[0],
            kd_rek: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        thn: args.thn,
        kd_rek: args.kd_rek,
    }

    return update.definition.url
            .replace('{thn}', parsedArgs.thn.toString())
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::update
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:140
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
update.put = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::destroy
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:157
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
export const destroy = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/rekeningtahun/{thn}/{kd_rek}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::destroy
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:157
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
destroy.url = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            thn: args[0],
            kd_rek: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        thn: args.thn,
        kd_rek: args.kd_rek,
    }

    return destroy.definition.url
            .replace('{thn}', parsedArgs.thn.toString())
            .replace('{kd_rek}', parsedArgs.kd_rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\RekeningTahunController::destroy
* @see app/Http/Controllers/Akutansi/RekeningTahunController.php:157
* @route '/api/akutansi/rekeningtahun/{thn}/{kd_rek}'
*/
destroy.delete = (args: { thn: string | number, kd_rek: string | number } | [thn: string | number, kd_rek: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const rekeningtahun = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default rekeningtahun