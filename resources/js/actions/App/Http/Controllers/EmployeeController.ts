import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmployeeController::index
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:15
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:15
 * @route '/employees'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmployeeController::index
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:15
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:15
 * @route '/employees'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::index
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:15
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:15
 * @route '/employees'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\EmployeeController::index
* @see app/Http/Controllers/EmployeeController.php:15
* @route '/employees'
*/
=======
/**
* @see \App\Http\Controllers\EmployeeController::index
 * @see app/Http/Controllers/EmployeeController.php:15
 * @route '/employees'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EmployeeController::create
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:44
* @route '/employees/create'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:44
 * @route '/employees/create'
 */
>>>>>>> kohsun
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/employees/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmployeeController::create
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:44
* @route '/employees/create'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:44
 * @route '/employees/create'
 */
>>>>>>> kohsun
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::create
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:44
* @route '/employees/create'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:44
 * @route '/employees/create'
 */
>>>>>>> kohsun
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\EmployeeController::create
* @see app/Http/Controllers/EmployeeController.php:44
* @route '/employees/create'
*/
=======
/**
* @see \App\Http\Controllers\EmployeeController::create
 * @see app/Http/Controllers/EmployeeController.php:44
 * @route '/employees/create'
 */
>>>>>>> kohsun
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EmployeeController::store
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:52
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:52
 * @route '/employees'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/employees',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EmployeeController::store
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:52
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:52
 * @route '/employees'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::store
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:52
* @route '/employees'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:52
 * @route '/employees'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EmployeeController::show
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:124
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:124
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
export const show = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/employees/{employee}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmployeeController::show
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:124
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:124
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
show.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::show
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:124
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:124
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
show.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\EmployeeController::show
* @see app/Http/Controllers/EmployeeController.php:124
* @route '/employees/{employee}'
*/
=======
/**
* @see \App\Http\Controllers\EmployeeController::show
 * @see app/Http/Controllers/EmployeeController.php:124
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
show.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EmployeeController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:134
* @route '/employees/{employee}/edit'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:134
 * @route '/employees/{employee}/edit'
 */
>>>>>>> kohsun
export const edit = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/employees/{employee}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmployeeController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:134
* @route '/employees/{employee}/edit'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:134
 * @route '/employees/{employee}/edit'
 */
>>>>>>> kohsun
edit.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::edit
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:134
* @route '/employees/{employee}/edit'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:134
 * @route '/employees/{employee}/edit'
 */
>>>>>>> kohsun
edit.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\EmployeeController::edit
* @see app/Http/Controllers/EmployeeController.php:134
* @route '/employees/{employee}/edit'
*/
=======
/**
* @see \App\Http\Controllers\EmployeeController::edit
 * @see app/Http/Controllers/EmployeeController.php:134
 * @route '/employees/{employee}/edit'
 */
>>>>>>> kohsun
edit.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EmployeeController::update
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:144
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:144
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
export const update = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/employees/{employee}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EmployeeController::update
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:144
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:144
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
update.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmployeeController::update
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:144
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:144
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
update.put = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\EmployeeController::update
* @see app/Http/Controllers/EmployeeController.php:144
* @route '/employees/{employee}'
*/
=======
/**
* @see \App\Http\Controllers\EmployeeController::update
 * @see app/Http/Controllers/EmployeeController.php:144
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
update.patch = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\EmployeeController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:186
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:186
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
export const destroy = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/employees/{employee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EmployeeController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:186
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:186
 * @route '/employees/{employee}'
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
* @see \App\Http\Controllers\EmployeeController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/EmployeeController.php:186
* @route '/employees/{employee}'
*/
=======
 * @see app/Http/Controllers/EmployeeController.php:186
 * @route '/employees/{employee}'
 */
>>>>>>> kohsun
destroy.delete = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const EmployeeController = { index, create, store, show, edit, update, destroy }

export default EmployeeController