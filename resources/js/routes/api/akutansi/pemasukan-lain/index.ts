import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::index
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:48
* @route '/api/akutansi/pemasukan-lain'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pemasukan-lain',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::index
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:48
* @route '/api/akutansi/pemasukan-lain'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::index
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:48
* @route '/api/akutansi/pemasukan-lain'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::index
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:48
* @route '/api/akutansi/pemasukan-lain'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::describe
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:13
* @route '/api/akutansi/pemasukan-lain/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pemasukan-lain/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::describe
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:13
* @route '/api/akutansi/pemasukan-lain/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::describe
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:13
* @route '/api/akutansi/pemasukan-lain/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::describe
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:13
* @route '/api/akutansi/pemasukan-lain/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::store
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:103
* @route '/api/akutansi/pemasukan-lain'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/akutansi/pemasukan-lain',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::store
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:103
* @route '/api/akutansi/pemasukan-lain'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::store
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:103
* @route '/api/akutansi/pemasukan-lain'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::update
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:187
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
export const update = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/akutansi/pemasukan-lain/{no_masuk}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::update
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:187
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
update.url = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_masuk: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_masuk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_masuk: args.no_masuk,
    }

    return update.definition.url
            .replace('{no_masuk}', parsedArgs.no_masuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::update
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:187
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
update.put = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::destroy
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:221
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
export const destroy = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/akutansi/pemasukan-lain/{no_masuk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::destroy
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:221
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
destroy.url = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_masuk: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_masuk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_masuk: args.no_masuk,
    }

    return destroy.definition.url
            .replace('{no_masuk}', parsedArgs.no_masuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::destroy
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:221
* @route '/api/akutansi/pemasukan-lain/{no_masuk}'
*/
destroy.delete = (args: { no_masuk: string | number } | [no_masuk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::generateNo
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:25
* @route '/api/akutansi/pemasukan-lain/generate-no'
*/
export const generateNo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNo.url(options),
    method: 'get',
})

generateNo.definition = {
    methods: ["get","head"],
    url: '/api/akutansi/pemasukan-lain/generate-no',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::generateNo
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:25
* @route '/api/akutansi/pemasukan-lain/generate-no'
*/
generateNo.url = (options?: RouteQueryOptions) => {
    return generateNo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::generateNo
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:25
* @route '/api/akutansi/pemasukan-lain/generate-no'
*/
generateNo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\PemasukanLainController::generateNo
* @see app/Http/Controllers/Akutansi/PemasukanLainController.php:25
* @route '/api/akutansi/pemasukan-lain/generate-no'
*/
generateNo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNo.url(options),
    method: 'head',
})

const pemasukanLain = {
    index: Object.assign(index, index),
    describe: Object.assign(describe, describe),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    generateNo: Object.assign(generateNo, generateNo),
}

export default pemasukanLain