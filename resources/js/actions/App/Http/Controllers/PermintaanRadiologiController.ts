import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/permissions/radiologi-tests'
*/
const getJenisPerawatandf347ee6cdf577901f357cff533c46b2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatandf347ee6cdf577901f357cff533c46b2.url(options),
    method: 'get',
})

getJenisPerawatandf347ee6cdf577901f357cff533c46b2.definition = {
    methods: ["get","head"],
    url: '/api/permissions/radiologi-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/permissions/radiologi-tests'
*/
getJenisPerawatandf347ee6cdf577901f357cff533c46b2.url = (options?: RouteQueryOptions) => {
    return getJenisPerawatandf347ee6cdf577901f357cff533c46b2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/permissions/radiologi-tests'
*/
getJenisPerawatandf347ee6cdf577901f357cff533c46b2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatandf347ee6cdf577901f357cff533c46b2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/permissions/radiologi-tests'
*/
getJenisPerawatandf347ee6cdf577901f357cff533c46b2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenisPerawatandf347ee6cdf577901f357cff533c46b2.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/radiologi-tests'
*/
const getJenisPerawatan809aa1a5114c12f9175627d909afaff5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatan809aa1a5114c12f9175627d909afaff5.url(options),
    method: 'get',
})

getJenisPerawatan809aa1a5114c12f9175627d909afaff5.definition = {
    methods: ["get","head"],
    url: '/api/radiologi-tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/radiologi-tests'
*/
getJenisPerawatan809aa1a5114c12f9175627d909afaff5.url = (options?: RouteQueryOptions) => {
    return getJenisPerawatan809aa1a5114c12f9175627d909afaff5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/radiologi-tests'
*/
getJenisPerawatan809aa1a5114c12f9175627d909afaff5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisPerawatan809aa1a5114c12f9175627d909afaff5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getJenisPerawatan
* @see app/Http/Controllers/PermintaanRadiologiController.php:269
* @route '/api/radiologi-tests'
*/
getJenisPerawatan809aa1a5114c12f9175627d909afaff5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenisPerawatan809aa1a5114c12f9175627d909afaff5.url(options),
    method: 'head',
})

export const getJenisPerawatan = {
    '/api/permissions/radiologi-tests': getJenisPerawatandf347ee6cdf577901f357cff533c46b2,
    '/api/radiologi-tests': getJenisPerawatan809aa1a5114c12f9175627d909afaff5,
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permissions/permintaan-radiologi'
*/
const storede4be470df046a42ae3e5ae211970cfd = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storede4be470df046a42ae3e5ae211970cfd.url(options),
    method: 'post',
})

storede4be470df046a42ae3e5ae211970cfd.definition = {
    methods: ["post"],
    url: '/api/permissions/permintaan-radiologi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permissions/permintaan-radiologi'
*/
storede4be470df046a42ae3e5ae211970cfd.url = (options?: RouteQueryOptions) => {
    return storede4be470df046a42ae3e5ae211970cfd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permissions/permintaan-radiologi'
*/
storede4be470df046a42ae3e5ae211970cfd.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storede4be470df046a42ae3e5ae211970cfd.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permintaan-radiologi'
*/
const storeb9d5758fc4e8ec1eefa06fb5a3910b0a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb9d5758fc4e8ec1eefa06fb5a3910b0a.url(options),
    method: 'post',
})

storeb9d5758fc4e8ec1eefa06fb5a3910b0a.definition = {
    methods: ["post"],
    url: '/api/permintaan-radiologi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permintaan-radiologi'
*/
storeb9d5758fc4e8ec1eefa06fb5a3910b0a.url = (options?: RouteQueryOptions) => {
    return storeb9d5758fc4e8ec1eefa06fb5a3910b0a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::store
* @see app/Http/Controllers/PermintaanRadiologiController.php:65
* @route '/api/permintaan-radiologi'
*/
storeb9d5758fc4e8ec1eefa06fb5a3910b0a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb9d5758fc4e8ec1eefa06fb5a3910b0a.url(options),
    method: 'post',
})

export const store = {
    '/api/permissions/permintaan-radiologi': storede4be470df046a42ae3e5ae211970cfd,
    '/api/permintaan-radiologi': storeb9d5758fc4e8ec1eefa06fb5a3910b0a,
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permissions/permintaan-radiologi/rawat/{no_rawat}'
*/
const getByNoRawatb7b0fc367be71645a785c8995473746e = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatb7b0fc367be71645a785c8995473746e.url(args, options),
    method: 'get',
})

getByNoRawatb7b0fc367be71645a785c8995473746e.definition = {
    methods: ["get","head"],
    url: '/api/permissions/permintaan-radiologi/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permissions/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatb7b0fc367be71645a785c8995473746e.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByNoRawatb7b0fc367be71645a785c8995473746e.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permissions/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatb7b0fc367be71645a785c8995473746e.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatb7b0fc367be71645a785c8995473746e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permissions/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatb7b0fc367be71645a785c8995473746e.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawatb7b0fc367be71645a785c8995473746e.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
const getByNoRawatacd3fbc564aa3000517760af5c2d0989 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatacd3fbc564aa3000517760af5c2d0989.url(args, options),
    method: 'get',
})

getByNoRawatacd3fbc564aa3000517760af5c2d0989.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-radiologi/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatacd3fbc564aa3000517760af5c2d0989.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByNoRawatacd3fbc564aa3000517760af5c2d0989.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatacd3fbc564aa3000517760af5c2d0989.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatacd3fbc564aa3000517760af5c2d0989.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getByNoRawat
* @see app/Http/Controllers/PermintaanRadiologiController.php:317
* @route '/api/permintaan-radiologi/rawat/{no_rawat}'
*/
getByNoRawatacd3fbc564aa3000517760af5c2d0989.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawatacd3fbc564aa3000517760af5c2d0989.url(args, options),
    method: 'head',
})

export const getByNoRawat = {
    '/api/permissions/permintaan-radiologi/rawat/{no_rawat}': getByNoRawatb7b0fc367be71645a785c8995473746e,
    '/api/permintaan-radiologi/rawat/{no_rawat}': getByNoRawatacd3fbc564aa3000517760af5c2d0989,
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}'
*/
const getRiwayat36662375ad63c8a3addacae6f25632bc = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat36662375ad63c8a3addacae6f25632bc.url(args, options),
    method: 'get',
})

getRiwayat36662375ad63c8a3addacae6f25632bc.definition = {
    methods: ["get","head"],
    url: '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat36662375ad63c8a3addacae6f25632bc.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayat36662375ad63c8a3addacae6f25632bc.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat36662375ad63c8a3addacae6f25632bc.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat36662375ad63c8a3addacae6f25632bc.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat36662375ad63c8a3addacae6f25632bc.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayat36662375ad63c8a3addacae6f25632bc.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
const getRiwayat3d82840eff27ff22a5060c1fb22aae02 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat3d82840eff27ff22a5060c1fb22aae02.url(args, options),
    method: 'get',
})

getRiwayat3d82840eff27ff22a5060c1fb22aae02.definition = {
    methods: ["get","head"],
    url: '/api/permintaan-radiologi/riwayat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat3d82840eff27ff22a5060c1fb22aae02.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRiwayat3d82840eff27ff22a5060c1fb22aae02.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat3d82840eff27ff22a5060c1fb22aae02.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayat3d82840eff27ff22a5060c1fb22aae02.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::getRiwayat
* @see app/Http/Controllers/PermintaanRadiologiController.php:434
* @route '/api/permintaan-radiologi/riwayat/{no_rawat}'
*/
getRiwayat3d82840eff27ff22a5060c1fb22aae02.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayat3d82840eff27ff22a5060c1fb22aae02.url(args, options),
    method: 'head',
})

export const getRiwayat = {
    '/api/permissions/permintaan-radiologi/riwayat/{no_rawat}': getRiwayat36662375ad63c8a3addacae6f25632bc,
    '/api/permintaan-radiologi/riwayat/{no_rawat}': getRiwayat3d82840eff27ff22a5060c1fb22aae02,
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permissions/permintaan-radiologi/{noorder}'
*/
const destroy7823ef2bfb644bcc20e47190e1b8ab8d = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7823ef2bfb644bcc20e47190e1b8ab8d.url(args, options),
    method: 'delete',
})

destroy7823ef2bfb644bcc20e47190e1b8ab8d.definition = {
    methods: ["delete"],
    url: '/api/permissions/permintaan-radiologi/{noorder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permissions/permintaan-radiologi/{noorder}'
*/
destroy7823ef2bfb644bcc20e47190e1b8ab8d.url = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy7823ef2bfb644bcc20e47190e1b8ab8d.definition.url
            .replace('{noorder}', parsedArgs.noorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permissions/permintaan-radiologi/{noorder}'
*/
destroy7823ef2bfb644bcc20e47190e1b8ab8d.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7823ef2bfb644bcc20e47190e1b8ab8d.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permintaan-radiologi/{noorder}'
*/
const destroyb19e98c4fb9585191cfa1b55f8fba248 = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb19e98c4fb9585191cfa1b55f8fba248.url(args, options),
    method: 'delete',
})

destroyb19e98c4fb9585191cfa1b55f8fba248.definition = {
    methods: ["delete"],
    url: '/api/permintaan-radiologi/{noorder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permintaan-radiologi/{noorder}'
*/
destroyb19e98c4fb9585191cfa1b55f8fba248.url = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyb19e98c4fb9585191cfa1b55f8fba248.definition.url
            .replace('{noorder}', parsedArgs.noorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanRadiologiController::destroy
* @see app/Http/Controllers/PermintaanRadiologiController.php:231
* @route '/api/permintaan-radiologi/{noorder}'
*/
destroyb19e98c4fb9585191cfa1b55f8fba248.delete = (args: { noorder: string | number } | [noorder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb19e98c4fb9585191cfa1b55f8fba248.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/api/permissions/permintaan-radiologi/{noorder}': destroy7823ef2bfb644bcc20e47190e1b8ab8d,
    '/api/permintaan-radiologi/{noorder}': destroyb19e98c4fb9585191cfa1b55f8fba248,
}

const PermintaanRadiologiController = { getJenisPerawatan, store, getByNoRawat, getRiwayat, destroy }

export default PermintaanRadiologiController