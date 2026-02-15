import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\EmployeeController::describe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/api/employees/petugas/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::describe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::describe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::describe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::index
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/employees/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::index
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::index
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::index
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/employees/petugas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::update
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
export const update = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/employees/petugas/{nip}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::update
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
update.url = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nip: args }
    }

    if (Array.isArray(args)) {
        args = {
            nip: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nip: args.nip,
    }

    return update.definition.url
            .replace('{nip}', parsedArgs.nip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::update
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
update.put = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
export const destroy = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/employees/petugas/{nip}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
destroy.url = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nip: args }
    }

    if (Array.isArray(args)) {
        args = {
            nip: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nip: args.nip,
    }

    return destroy.definition.url
            .replace('{nip}', parsedArgs.nip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
destroy.delete = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const petugas = {
    describe: Object.assign(describe, describe),
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default petugas