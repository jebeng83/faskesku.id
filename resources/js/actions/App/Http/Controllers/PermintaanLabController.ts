import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
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
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
getRegPeriksa.url = (options?: RouteQueryOptions) => {
    return getRegPeriksa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
getRegPeriksa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRegPeriksa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRegPeriksa
* @see app/Http/Controllers/PermintaanLabController.php:1004
* @route '/api/reg-periksa'
*/
getRegPeriksa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRegPeriksa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
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
* @see app/Http/Controllers/PermintaanLabController.php:1270
* @route '/api/lab-tests'
*/
getLabTests.url = (options?: RouteQueryOptions) => {
    return getLabTests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
* @route '/api/lab-tests'
*/
getLabTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getLabTests
* @see app/Http/Controllers/PermintaanLabController.php:1270
* @route '/api/lab-tests'
*/
getLabTests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLabTests.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates/{kdJenisPrw}'
*/
const getTemplates6a6595dc9fc5a37828d43ae65eedd12f = (args: { kdJenisPrw: string | number } | [kdJenisPrw: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTemplates6a6595dc9fc5a37828d43ae65eedd12f.url(args, options),
    method: 'get',
})

getTemplates6a6595dc9fc5a37828d43ae65eedd12f.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/templates/{kdJenisPrw}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates/{kdJenisPrw}'
*/
getTemplates6a6595dc9fc5a37828d43ae65eedd12f.url = (args: { kdJenisPrw: string | number } | [kdJenisPrw: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdJenisPrw: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdJenisPrw: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdJenisPrw: args.kdJenisPrw,
    }

    return getTemplates6a6595dc9fc5a37828d43ae65eedd12f.definition.url
            .replace('{kdJenisPrw}', parsedArgs.kdJenisPrw.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates/{kdJenisPrw}'
*/
getTemplates6a6595dc9fc5a37828d43ae65eedd12f.get = (args: { kdJenisPrw: string | number } | [kdJenisPrw: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTemplates6a6595dc9fc5a37828d43ae65eedd12f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates/{kdJenisPrw}'
*/
getTemplates6a6595dc9fc5a37828d43ae65eedd12f.head = (args: { kdJenisPrw: string | number } | [kdJenisPrw: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTemplates6a6595dc9fc5a37828d43ae65eedd12f.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates'
*/
const getTemplatese3864f5d9ffcba777565e6d4754874f6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTemplatese3864f5d9ffcba777565e6d4754874f6.url(options),
    method: 'get',
})

getTemplatese3864f5d9ffcba777565e6d4754874f6.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-lab/templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates'
*/
getTemplatese3864f5d9ffcba777565e6d4754874f6.url = (options?: RouteQueryOptions) => {
    return getTemplatese3864f5d9ffcba777565e6d4754874f6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates'
*/
getTemplatese3864f5d9ffcba777565e6d4754874f6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTemplatese3864f5d9ffcba777565e6d4754874f6.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getTemplates
* @see app/Http/Controllers/PermintaanLabController.php:1306
* @route '/api/permintaan-lab/templates'
*/
getTemplatese3864f5d9ffcba777565e6d4754874f6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTemplatese3864f5d9ffcba777565e6d4754874f6.url(options),
    method: 'head',
})

export const getTemplates = {
    '/api/permintaan-lab/templates/{kdJenisPrw}': getTemplates6a6595dc9fc5a37828d43ae65eedd12f,
    '/api/permintaan-lab/templates': getTemplatese3864f5d9ffcba777565e6d4754874f6,
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
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
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/api/permintaan-lab'
*/
store9cab9cc9ce8e71e84002a8c1dffbaf04.url = (options?: RouteQueryOptions) => {
    return store9cab9cc9ce8e71e84002a8c1dffbaf04.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/api/permintaan-lab'
*/
store9cab9cc9ce8e71e84002a8c1dffbaf04.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9cab9cc9ce8e71e84002a8c1dffbaf04.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
const store38ad935317b4bfca976bd9395bbe0a7b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store38ad935317b4bfca976bd9395bbe0a7b.url(options),
    method: 'post',
})

store38ad935317b4bfca976bd9395bbe0a7b.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
store38ad935317b4bfca976bd9395bbe0a7b.url = (options?: RouteQueryOptions) => {
    return store38ad935317b4bfca976bd9395bbe0a7b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
* @see app/Http/Controllers/PermintaanLabController.php:191
* @route '/laboratorium/permintaan-lab'
*/
store38ad935317b4bfca976bd9395bbe0a7b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store38ad935317b4bfca976bd9395bbe0a7b.url(options),
    method: 'post',
})

export const store = {
    '/api/permintaan-lab': store9cab9cc9ce8e71e84002a8c1dffbaf04,
    '/laboratorium/permintaan-lab': store38ad935317b4bfca976bd9395bbe0a7b,
}

/**
* @see \App\Http\Controllers\PermintaanLabController::stageJurnalLab
* @see app/Http/Controllers/PermintaanLabController.php:1341
* @route '/api/permintaan-lab/stage-lab'
*/
export const stageJurnalLab = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageJurnalLab.url(options),
    method: 'post',
})

stageJurnalLab.definition = {
    methods: ["post"],
    url: '/api/permintaan-lab/stage-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::stageJurnalLab
* @see app/Http/Controllers/PermintaanLabController.php:1341
* @route '/api/permintaan-lab/stage-lab'
*/
stageJurnalLab.url = (options?: RouteQueryOptions) => {
    return stageJurnalLab.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::stageJurnalLab
* @see app/Http/Controllers/PermintaanLabController.php:1341
* @route '/api/permintaan-lab/stage-lab'
*/
stageJurnalLab.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stageJurnalLab.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:1052
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
* @see app/Http/Controllers/PermintaanLabController.php:1052
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
* @see app/Http/Controllers/PermintaanLabController.php:1052
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
getByNoRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getByNoRawat
* @see app/Http/Controllers/PermintaanLabController.php:1052
* @route '/api/permintaan-lab/rawat/{no_rawat}'
*/
getByNoRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:1376
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
* @see app/Http/Controllers/PermintaanLabController.php:1376
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
* @see app/Http/Controllers/PermintaanLabController.php:1376
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
getRiwayat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::getRiwayat
* @see app/Http/Controllers/PermintaanLabController.php:1376
* @route '/api/permintaan-lab/riwayat/{no_rawat}'
*/
getRiwayat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
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
* @see app/Http/Controllers/PermintaanLabController.php:857
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
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/api/permintaan-lab/{noorder}'
*/
destroy9ae3c762fa6ebfe394bf40e8319c90c7.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9ae3c762fa6ebfe394bf40e8319c90c7.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
const destroy035fe378d56a482c234f96ea103923b0 = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy035fe378d56a482c234f96ea103923b0.url(args, options),
    method: 'delete',
})

destroy035fe378d56a482c234f96ea103923b0.definition = {
    methods: ["delete"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
destroy035fe378d56a482c234f96ea103923b0.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy035fe378d56a482c234f96ea103923b0.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
* @see app/Http/Controllers/PermintaanLabController.php:857
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
destroy035fe378d56a482c234f96ea103923b0.delete = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy035fe378d56a482c234f96ea103923b0.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/api/permintaan-lab/{noorder}': destroy9ae3c762fa6ebfe394bf40e8319c90c7,
    '/laboratorium/permintaan-lab/{permintaan_lab}': destroy035fe378d56a482c234f96ea103923b0,
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::index
* @see app/Http/Controllers/PermintaanLabController.php:32
* @route '/laboratorium/permintaan-lab'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
* @see app/Http/Controllers/PermintaanLabController.php:174
* @route '/laboratorium/permintaan-lab/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
export const show = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
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
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
show.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
* @see app/Http/Controllers/PermintaanLabController.php:325
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
show.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
export const edit = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
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
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
edit.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
* @see app/Http/Controllers/PermintaanLabController.php:791
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/edit'
*/
edit.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
export const update = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
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
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
update.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
* @see app/Http/Controllers/PermintaanLabController.php:809
* @route '/laboratorium/permintaan-lab/{permintaan_lab}'
*/
update.patch = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
export const ambilSampel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ambilSampel.url(options),
    method: 'post',
})

ambilSampel.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab/ambil-sampel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
ambilSampel.url = (options?: RouteQueryOptions) => {
    return ambilSampel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::ambilSampel
* @see app/Http/Controllers/PermintaanLabController.php:1404
* @route '/laboratorium/permintaan-lab/ambil-sampel'
*/
ambilSampel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ambilSampel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
export const updateSampel = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSampel.url(args, options),
    method: 'put',
})

updateSampel.definition = {
    methods: ["put"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/sampel',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
updateSampel.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateSampel.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::updateSampel
* @see app/Http/Controllers/PermintaanLabController.php:1455
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/sampel'
*/
updateSampel.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSampel.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
export const inputHasil = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputHasil.url(args, options),
    method: 'get',
})

inputHasil.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/hasil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return inputHasil.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputHasil.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::inputHasil
* @see app/Http/Controllers/PermintaanLabController.php:355
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
inputHasil.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inputHasil.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
export const storeHasil = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHasil.url(args, options),
    method: 'post',
})

storeHasil.definition = {
    methods: ["post"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/hasil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
storeHasil.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeHasil.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::storeHasil
* @see app/Http/Controllers/PermintaanLabController.php:431
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/hasil'
*/
storeHasil.post = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHasil.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
export const preview = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::preview
* @see app/Http/Controllers/PermintaanLabController.php:1599
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/preview'
*/
preview.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
export const cetak = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

cetak.definition = {
    methods: ["get","head"],
    url: '/laboratorium/permintaan-lab/{permintaan_lab}/cetak',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cetak.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::cetak
* @see app/Http/Controllers/PermintaanLabController.php:1808
* @route '/laboratorium/permintaan-lab/{permintaan_lab}/cetak'
*/
cetak.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cetak.url(args, options),
    method: 'head',
})

const PermintaanLabController = { getRegPeriksa, getLabTests, getTemplates, store, stageJurnalLab, getByNoRawat, getRiwayat, destroy, index, create, show, edit, update, ambilSampel, updateSampel, inputHasil, storeHasil, preview, cetak }

export default PermintaanLabController