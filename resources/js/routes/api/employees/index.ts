import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import petugas from './petugas'
/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/api/employees/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::lookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:90
* @route '/api/employees'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/employees',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:90
* @route '/api/employees'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::store
* @see app/Http/Controllers/API/EmployeeController.php:90
* @route '/api/employees'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:129
* @route '/api/employees/{employee}'
*/
export const destroy = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/employees/{employee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:129
* @route '/api/employees/{employee}'
*/
destroy.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { employee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            employee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        employee: typeof args.employee === 'object'
        ? args.employee.id
        : args.employee,
    }

    return destroy.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
* @see app/Http/Controllers/API/EmployeeController.php:129
* @route '/api/employees/{employee}'
*/
destroy.delete = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const employees = {
    lookup: Object.assign(lookup, lookup),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    petugas: Object.assign(petugas, petugas),
}

export default employees