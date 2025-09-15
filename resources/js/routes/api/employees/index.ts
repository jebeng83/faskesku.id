import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\EmployeeController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:13
* @route '/api/employees'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:13
 * @route '/api/employees'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:13
* @route '/api/employees'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:13
 * @route '/api/employees'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:13
* @route '/api/employees'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:13
 * @route '/api/employees'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:41
* @route '/api/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:41
 * @route '/api/employees/{employee}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:41
* @route '/api/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:41
 * @route '/api/employees/{employee}'
 */
>>>>>>> kohsun
destroy.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { employee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            employee: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        employee: typeof args.employee === 'object'
        ? args.employee.id
        : args.employee,
    }
=======
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/EmployeeController.php:41
* @route '/api/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/API/EmployeeController.php:41
 * @route '/api/employees/{employee}'
 */
>>>>>>> kohsun
destroy.delete = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
<<<<<<< HEAD

const employees = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
=======
const employees = {
    store,
destroy,
>>>>>>> kohsun
}

export default employees