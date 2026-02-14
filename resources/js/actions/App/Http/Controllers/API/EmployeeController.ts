import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\EmployeeController::pegawaiLookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
export const pegawaiLookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pegawaiLookup.url(options),
    method: 'get',
})

pegawaiLookup.definition = {
    methods: ["get","head"],
    url: '/api/employees/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::pegawaiLookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
pegawaiLookup.url = (options?: RouteQueryOptions) => {
    return pegawaiLookup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::pegawaiLookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
pegawaiLookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pegawaiLookup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::pegawaiLookup
* @see app/Http/Controllers/API/EmployeeController.php:49
* @route '/api/employees/lookup'
*/
pegawaiLookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pegawaiLookup.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::jabatanLookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
export const jabatanLookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jabatanLookup.url(options),
    method: 'get',
})

jabatanLookup.definition = {
    methods: ["get","head"],
    url: '/api/jabatan/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::jabatanLookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
jabatanLookup.url = (options?: RouteQueryOptions) => {
    return jabatanLookup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::jabatanLookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
jabatanLookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jabatanLookup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::jabatanLookup
* @see app/Http/Controllers/API/EmployeeController.php:15
* @route '/api/jabatan/lookup'
*/
jabatanLookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jabatanLookup.url(options),
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

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDescribe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
export const petugasDescribe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasDescribe.url(options),
    method: 'get',
})

petugasDescribe.definition = {
    methods: ["get","head"],
    url: '/api/employees/petugas/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDescribe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
petugasDescribe.url = (options?: RouteQueryOptions) => {
    return petugasDescribe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDescribe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
petugasDescribe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasDescribe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDescribe
* @see app/Http/Controllers/API/EmployeeController.php:146
* @route '/api/employees/petugas/describe'
*/
petugasDescribe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: petugasDescribe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasIndex
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
export const petugasIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasIndex.url(options),
    method: 'get',
})

petugasIndex.definition = {
    methods: ["get","head"],
    url: '/api/employees/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasIndex
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
petugasIndex.url = (options?: RouteQueryOptions) => {
    return petugasIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasIndex
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
petugasIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasIndex
* @see app/Http/Controllers/API/EmployeeController.php:166
* @route '/api/employees/petugas'
*/
petugasIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: petugasIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasStore
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
export const petugasStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: petugasStore.url(options),
    method: 'post',
})

petugasStore.definition = {
    methods: ["post"],
    url: '/api/employees/petugas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasStore
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
petugasStore.url = (options?: RouteQueryOptions) => {
    return petugasStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasStore
* @see app/Http/Controllers/API/EmployeeController.php:225
* @route '/api/employees/petugas'
*/
petugasStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: petugasStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasUpdate
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
export const petugasUpdate = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: petugasUpdate.url(args, options),
    method: 'put',
})

petugasUpdate.definition = {
    methods: ["put"],
    url: '/api/employees/petugas/{nip}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasUpdate
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
petugasUpdate.url = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return petugasUpdate.definition.url
            .replace('{nip}', parsedArgs.nip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasUpdate
* @see app/Http/Controllers/API/EmployeeController.php:319
* @route '/api/employees/petugas/{nip}'
*/
petugasUpdate.put = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: petugasUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDestroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
export const petugasDestroy = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: petugasDestroy.url(args, options),
    method: 'delete',
})

petugasDestroy.definition = {
    methods: ["delete"],
    url: '/api/employees/petugas/{nip}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDestroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
petugasDestroy.url = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return petugasDestroy.definition.url
            .replace('{nip}', parsedArgs.nip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\EmployeeController::petugasDestroy
* @see app/Http/Controllers/API/EmployeeController.php:383
* @route '/api/employees/petugas/{nip}'
*/
petugasDestroy.delete = (args: { nip: string | number } | [nip: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: petugasDestroy.url(args, options),
    method: 'delete',
})

const EmployeeController = { pegawaiLookup, jabatanLookup, store, destroy, petugasDescribe, petugasIndex, petugasStore, petugasUpdate, petugasDestroy }

export default EmployeeController