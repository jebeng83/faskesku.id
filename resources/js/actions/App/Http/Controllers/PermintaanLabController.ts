import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
export const getRegPeriksa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegPeriksa.url(options),
    method: 'get',
})

getRegPeriksa.definition = {
    methods: ["get","head"],
    url: '/api/reg-periksa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
getRegPeriksa.url = (options?: RouteQueryOptions) => {
    return getRegPeriksa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
getRegPeriksa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegPeriksa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:287
* @route '/api/reg-periksa'
*/
getRegPeriksa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRegPeriksa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
export const getLabTests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTests.url(options),
    method: 'get',
})

getLabTests.definition = {
    methods: ["get","head"],
    url: '/api/lab-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
getLabTests.url = (options?: RouteQueryOptions) => {
    return getLabTests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
getLabTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:380
* @route '/api/lab-tests'
*/
getLabTests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLabTests.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/api/permintaan-lab'
*/
const store9cab9cc9ce8e71e84002a8c1dffbaf04 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9cab9cc9ce8e71e84002a8c1dffbaf04.url(options),
    method: 'post',
})

store9cab9cc9ce8e71e84002a8c1dffbaf04.definition = {
    methods: ["post"],
    url: '/api/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/api/permintaan-lab'
*/
store9cab9cc9ce8e71e84002a8c1dffbaf04.url = (options?: RouteQueryOptions) => {
    return store9cab9cc9ce8e71e84002a8c1dffbaf04.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/api/permintaan-lab'
*/
store9cab9cc9ce8e71e84002a8c1dffbaf04.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9cab9cc9ce8e71e84002a8c1dffbaf04.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/permintaan-lab'
*/
const store44facfca754ec23be2bc2e40ec6107a4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store44facfca754ec23be2bc2e40ec6107a4.url(options),
    method: 'post',
})

store44facfca754ec23be2bc2e40ec6107a4.definition = {
    methods: ["post"],
    url: '/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/permintaan-lab'
*/
store44facfca754ec23be2bc2e40ec6107a4.url = (options?: RouteQueryOptions) => {
    return store44facfca754ec23be2bc2e40ec6107a4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:86
* @route '/permintaan-lab'
*/
store44facfca754ec23be2bc2e40ec6107a4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store44facfca754ec23be2bc2e40ec6107a4.url(options),
    method: 'post',
})

export const store = {
    '/api/permintaan-lab': store9cab9cc9ce8e71e84002a8c1dffbaf04,
    '/permintaan-lab': store44facfca754ec23be2bc2e40ec6107a4,
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:318
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
export const getByNoRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

getByNoRawat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:318
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
getByNoRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByNoRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:318
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
getByNoRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:318
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
getByNoRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:416
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
export const getRiwayat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat.url(args, options),
    method: 'get',
})

getRiwayat.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/riwayat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:416
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
getRiwayat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:416
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
getRiwayat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:416
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
getRiwayat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/api/permintaan-lab/{noorder}'
*/
const destroy9ae3c762fa6ebfe394bf40e8319c90c7 = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9ae3c762fa6ebfe394bf40e8319c90c7.url(args, options),
    method: 'delete',
})

destroy9ae3c762fa6ebfe394bf40e8319c90c7.definition = {
    methods: ["delete"],
    url: '/api/permintaan-lab/{noorder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/api/permintaan-lab/{noorder}'
*/
destroy9ae3c762fa6ebfe394bf40e8319c90c7.url = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noorder: args }
    }

    if (Array.isArray(args)) {
        args = {
            noorder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noorder: args.noorder,
    }

    return destroy9ae3c762fa6ebfe394bf40e8319c90c7.definition.url
            .replace('{noorder}', parsedArgs.noorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/api/permintaan-lab/{noorder}'
*/
destroy9ae3c762fa6ebfe394bf40e8319c90c7.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9ae3c762fa6ebfe394bf40e8319c90c7.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/permintaan-lab/{permintaan_lab}'
*/
const destroy724f4741183aa24ab295ca7459afbfc7 = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy724f4741183aa24ab295ca7459afbfc7.url(args, options),
    method: 'delete',
})

destroy724f4741183aa24ab295ca7459afbfc7.definition = {
    methods: ["delete"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/permintaan-lab/{permintaan_lab}'
*/
destroy724f4741183aa24ab295ca7459afbfc7.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return destroy724f4741183aa24ab295ca7459afbfc7.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:255
* @route '/permintaan-lab/{permintaan_lab}'
*/
destroy724f4741183aa24ab295ca7459afbfc7.delete = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy724f4741183aa24ab295ca7459afbfc7.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/api/permintaan-lab/{noorder}': destroy9ae3c762fa6ebfe394bf40e8319c90c7,
    '/permintaan-lab/{permintaan_lab}': destroy724f4741183aa24ab295ca7459afbfc7,
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:25
* @route '/permintaan-lab'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:25
* @route '/permintaan-lab'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:25
* @route '/permintaan-lab'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:25
* @route '/permintaan-lab'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:69
* @route '/permintaan-lab/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:69
* @route '/permintaan-lab/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:69
* @route '/permintaan-lab/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:69
* @route '/permintaan-lab/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:177
* @route '/permintaan-lab/{permintaan_lab}'
*/
export const show = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:177
* @route '/permintaan-lab/{permintaan_lab}'
*/
show.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return show.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:177
* @route '/permintaan-lab/{permintaan_lab}'
*/
show.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:177
* @route '/permintaan-lab/{permintaan_lab}'
*/
show.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:190
* @route '/permintaan-lab/{permintaan_lab}/edit'
*/
export const edit = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/{permintaan_lab}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:190
* @route '/permintaan-lab/{permintaan_lab}/edit'
*/
edit.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return edit.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:190
* @route '/permintaan-lab/{permintaan_lab}/edit'
*/
edit.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:190
* @route '/permintaan-lab/{permintaan_lab}/edit'
*/
edit.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:208
* @route '/permintaan-lab/{permintaan_lab}'
*/
export const update = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:208
* @route '/permintaan-lab/{permintaan_lab}'
*/
update.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    if (Array.isArray(args)) {
        args = {
            permintaan_lab: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permintaan_lab: args.permintaan_lab,
    }

    return update.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:208
* @route '/permintaan-lab/{permintaan_lab}'
*/
update.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:208
* @route '/permintaan-lab/{permintaan_lab}'
*/
update.patch = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const PermintaanLabController = { getRegPeriksa, getLabTests, store, getByNoRawat, getRiwayat, destroy, index, create, show, edit, update }

export default PermintaanLabController