import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/permissions/pcare/ping'
*/
const ping66140975e6b7070ab94fbba98d24309f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping66140975e6b7070ab94fbba98d24309f.url(options),
    method: 'get',
})

ping66140975e6b7070ab94fbba98d24309f.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/ping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/permissions/pcare/ping'
*/
ping66140975e6b7070ab94fbba98d24309f.url = (options?: RouteQueryOptions) => {
    return ping66140975e6b7070ab94fbba98d24309f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/permissions/pcare/ping'
*/
ping66140975e6b7070ab94fbba98d24309f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping66140975e6b7070ab94fbba98d24309f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/permissions/pcare/ping'
*/
ping66140975e6b7070ab94fbba98d24309f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ping66140975e6b7070ab94fbba98d24309f.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/pcare/ping'
*/
const pingfcba3e6a3a529a07c7c57b82f4f06576 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pingfcba3e6a3a529a07c7c57b82f4f06576.url(options),
    method: 'get',
})

pingfcba3e6a3a529a07c7c57b82f4f06576.definition = {
    methods: ["get","head"],
    url: '/api/pcare/ping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/pcare/ping'
*/
pingfcba3e6a3a529a07c7c57b82f4f06576.url = (options?: RouteQueryOptions) => {
    return pingfcba3e6a3a529a07c7c57b82f4f06576.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/pcare/ping'
*/
pingfcba3e6a3a529a07c7c57b82f4f06576.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pingfcba3e6a3a529a07c7c57b82f4f06576.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:25
* @route '/api/pcare/ping'
*/
pingfcba3e6a3a529a07c7c57b82f4f06576.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pingfcba3e6a3a529a07c7c57b82f4f06576.url(options),
    method: 'head',
})

export const ping = {
    '/api/permissions/pcare/ping': ping66140975e6b7070ab94fbba98d24309f,
    '/api/pcare/ping': pingfcba3e6a3a529a07c7c57b82f4f06576,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
const proxy1b18ce5948a66f65bb6663271dd4c13d = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'get',
})

proxy1b18ce5948a66f65bb6663271dd4c13d.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/permissions/pcare/proxy/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { endpoint: args }
    }

    if (Array.isArray(args)) {
        args = {
            endpoint: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        endpoint: args.endpoint,
    }

    return proxy1b18ce5948a66f65bb6663271dd4c13d.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/permissions/pcare/proxy/{endpoint}'
*/
proxy1b18ce5948a66f65bb6663271dd4c13d.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy1b18ce5948a66f65bb6663271dd4c13d.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
const proxy601013771258ba340a891e8cb512f627 = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'get',
})

proxy601013771258ba340a891e8cb512f627.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/pcare/proxy/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { endpoint: args }
    }

    if (Array.isArray(args)) {
        args = {
            endpoint: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        endpoint: args.endpoint,
    }

    return proxy601013771258ba340a891e8cb512f627.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:46
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy601013771258ba340a891e8cb512f627.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy601013771258ba340a891e8cb512f627.url(args, options),
    method: 'head',
})

export const proxy = {
    '/api/permissions/pcare/proxy/{endpoint}': proxy1b18ce5948a66f65bb6663271dd4c13d,
    '/api/pcare/proxy/{endpoint}': proxy601013771258ba340a891e8cb512f627,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/permissions/pcare/dokter'
*/
const getDokter778902b658f4fa109b18f5b37208386a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter778902b658f4fa109b18f5b37208386a.url(options),
    method: 'get',
})

getDokter778902b658f4fa109b18f5b37208386a.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/permissions/pcare/dokter'
*/
getDokter778902b658f4fa109b18f5b37208386a.url = (options?: RouteQueryOptions) => {
    return getDokter778902b658f4fa109b18f5b37208386a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/permissions/pcare/dokter'
*/
getDokter778902b658f4fa109b18f5b37208386a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter778902b658f4fa109b18f5b37208386a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/permissions/pcare/dokter'
*/
getDokter778902b658f4fa109b18f5b37208386a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokter778902b658f4fa109b18f5b37208386a.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/pcare/dokter'
*/
const getDokterca5945421beecfede6d16185319e6459 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'get',
})

getDokterca5945421beecfede6d16185319e6459.definition = {
    methods: ["get","head"],
    url: '/api/pcare/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.url = (options?: RouteQueryOptions) => {
    return getDokterca5945421beecfede6d16185319e6459.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/pcare/api/dokter'
*/
const getDokter8d2dff60a18c4591d77b87e52d5e4999 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'get',
})

getDokter8d2dff60a18c4591d77b87e52d5e4999.definition = {
    methods: ["get","head"],
    url: '/pcare/api/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.url = (options?: RouteQueryOptions) => {
    return getDokter8d2dff60a18c4591d77b87e52d5e4999.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:89
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'head',
})

export const getDokter = {
    '/api/permissions/pcare/dokter': getDokter778902b658f4fa109b18f5b37208386a,
    '/api/pcare/dokter': getDokterca5945421beecfede6d16185319e6459,
    '/pcare/api/dokter': getDokter8d2dff60a18c4591d77b87e52d5e4999,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/permissions/pcare/diagnosa'
*/
const getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.url(options),
    method: 'get',
})

getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/permissions/pcare/diagnosa'
*/
getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.url = (options?: RouteQueryOptions) => {
    return getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/permissions/pcare/diagnosa'
*/
getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/permissions/pcare/diagnosa'
*/
getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/pcare/diagnosa'
*/
const getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url(options),
    method: 'get',
})

getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.definition = {
    methods: ["get","head"],
    url: '/api/pcare/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url = (options?: RouteQueryOptions) => {
    return getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/pcare/api/diagnosa'
*/
const getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url(options),
    method: 'get',
})

getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.definition = {
    methods: ["get","head"],
    url: '/pcare/api/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url = (options?: RouteQueryOptions) => {
    return getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:1603
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url(options),
    method: 'head',
})

export const getDiagnosa = {
    '/api/permissions/pcare/diagnosa': getDiagnosa3b2a3dbb5b261bf3fe068050c8d51f3c,
    '/api/pcare/diagnosa': getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9,
    '/pcare/api/diagnosa': getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/permissions/pcare/faskes'
*/
const getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.url(options),
    method: 'get',
})

getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/faskes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/permissions/pcare/faskes'
*/
getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.url = (options?: RouteQueryOptions) => {
    return getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/permissions/pcare/faskes'
*/
getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/permissions/pcare/faskes'
*/
getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/pcare/faskes'
*/
const getFaskes78894d977f1083e08baec8c91bba70d3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes78894d977f1083e08baec8c91bba70d3.url(options),
    method: 'get',
})

getFaskes78894d977f1083e08baec8c91bba70d3.definition = {
    methods: ["get","head"],
    url: '/api/pcare/faskes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/pcare/faskes'
*/
getFaskes78894d977f1083e08baec8c91bba70d3.url = (options?: RouteQueryOptions) => {
    return getFaskes78894d977f1083e08baec8c91bba70d3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/pcare/faskes'
*/
getFaskes78894d977f1083e08baec8c91bba70d3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes78894d977f1083e08baec8c91bba70d3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:136
* @route '/api/pcare/faskes'
*/
getFaskes78894d977f1083e08baec8c91bba70d3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskes78894d977f1083e08baec8c91bba70d3.url(options),
    method: 'head',
})

export const getFaskes = {
    '/api/permissions/pcare/faskes': getFaskes2bcf9dbfc3bcaa025ccd7d21d60ecdb8,
    '/api/pcare/faskes': getFaskes78894d977f1083e08baec8c91bba70d3,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/permissions/pcare/poli'
*/
const getPoliae51e7409f038998e738bc601bb26f47 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliae51e7409f038998e738bc601bb26f47.url(options),
    method: 'get',
})

getPoliae51e7409f038998e738bc601bb26f47.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/permissions/pcare/poli'
*/
getPoliae51e7409f038998e738bc601bb26f47.url = (options?: RouteQueryOptions) => {
    return getPoliae51e7409f038998e738bc601bb26f47.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/permissions/pcare/poli'
*/
getPoliae51e7409f038998e738bc601bb26f47.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliae51e7409f038998e738bc601bb26f47.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/permissions/pcare/poli'
*/
getPoliae51e7409f038998e738bc601bb26f47.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoliae51e7409f038998e738bc601bb26f47.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/pcare/poli'
*/
const getPoli703bacfc6bd9d70800508f5d768683d4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'get',
})

getPoli703bacfc6bd9d70800508f5d768683d4.definition = {
    methods: ["get","head"],
    url: '/api/pcare/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.url = (options?: RouteQueryOptions) => {
    return getPoli703bacfc6bd9d70800508f5d768683d4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/pcare/api/poli'
*/
const getPoliba0dd418727a662ea51949e786965266 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'get',
})

getPoliba0dd418727a662ea51949e786965266.definition = {
    methods: ["get","head"],
    url: '/pcare/api/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.url = (options?: RouteQueryOptions) => {
    return getPoliba0dd418727a662ea51949e786965266.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:183
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'head',
})

export const getPoli = {
    '/api/permissions/pcare/poli': getPoliae51e7409f038998e738bc601bb26f47,
    '/api/pcare/poli': getPoli703bacfc6bd9d70800508f5d768683d4,
    '/pcare/api/poli': getPoliba0dd418727a662ea51949e786965266,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/permissions/pcare/kesadaran'
*/
const getKesadarandd46edff34e7a69e8173138ca990a24b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadarandd46edff34e7a69e8173138ca990a24b.url(options),
    method: 'get',
})

getKesadarandd46edff34e7a69e8173138ca990a24b.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/permissions/pcare/kesadaran'
*/
getKesadarandd46edff34e7a69e8173138ca990a24b.url = (options?: RouteQueryOptions) => {
    return getKesadarandd46edff34e7a69e8173138ca990a24b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/permissions/pcare/kesadaran'
*/
getKesadarandd46edff34e7a69e8173138ca990a24b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadarandd46edff34e7a69e8173138ca990a24b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/permissions/pcare/kesadaran'
*/
getKesadarandd46edff34e7a69e8173138ca990a24b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKesadarandd46edff34e7a69e8173138ca990a24b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/kesadaran'
*/
const getKesadaranec9d8b0efc5f57ec3846b517d89e6354 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadaranec9d8b0efc5f57ec3846b517d89e6354.url(options),
    method: 'get',
})

getKesadaranec9d8b0efc5f57ec3846b517d89e6354.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/kesadaran'
*/
getKesadaranec9d8b0efc5f57ec3846b517d89e6354.url = (options?: RouteQueryOptions) => {
    return getKesadaranec9d8b0efc5f57ec3846b517d89e6354.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/kesadaran'
*/
getKesadaranec9d8b0efc5f57ec3846b517d89e6354.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadaranec9d8b0efc5f57ec3846b517d89e6354.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/kesadaran'
*/
getKesadaranec9d8b0efc5f57ec3846b517d89e6354.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKesadaranec9d8b0efc5f57ec3846b517d89e6354.url(options),
    method: 'head',
})

export const getKesadaran = {
    '/api/permissions/pcare/kesadaran': getKesadarandd46edff34e7a69e8173138ca990a24b,
    '/api/pcare/kesadaran': getKesadaranec9d8b0efc5f57ec3846b517d89e6354,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/permissions/pcare/dpho'
*/
const getDpho423d48f0fa5e91ca39b0db8f841d5b0c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho423d48f0fa5e91ca39b0db8f841d5b0c.url(options),
    method: 'get',
})

getDpho423d48f0fa5e91ca39b0db8f841d5b0c.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/permissions/pcare/dpho'
*/
getDpho423d48f0fa5e91ca39b0db8f841d5b0c.url = (options?: RouteQueryOptions) => {
    return getDpho423d48f0fa5e91ca39b0db8f841d5b0c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/permissions/pcare/dpho'
*/
getDpho423d48f0fa5e91ca39b0db8f841d5b0c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho423d48f0fa5e91ca39b0db8f841d5b0c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/permissions/pcare/dpho'
*/
getDpho423d48f0fa5e91ca39b0db8f841d5b0c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDpho423d48f0fa5e91ca39b0db8f841d5b0c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/pcare/dpho'
*/
const getDpho333c17262163cd6faf8db76f1159fd04 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho333c17262163cd6faf8db76f1159fd04.url(options),
    method: 'get',
})

getDpho333c17262163cd6faf8db76f1159fd04.definition = {
    methods: ["get","head"],
    url: '/api/pcare/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/pcare/dpho'
*/
getDpho333c17262163cd6faf8db76f1159fd04.url = (options?: RouteQueryOptions) => {
    return getDpho333c17262163cd6faf8db76f1159fd04.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/pcare/dpho'
*/
getDpho333c17262163cd6faf8db76f1159fd04.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho333c17262163cd6faf8db76f1159fd04.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:1643
* @route '/api/pcare/dpho'
*/
getDpho333c17262163cd6faf8db76f1159fd04.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDpho333c17262163cd6faf8db76f1159fd04.url(options),
    method: 'head',
})

export const getDpho = {
    '/api/permissions/pcare/dpho': getDpho423d48f0fa5e91ca39b0db8f841d5b0c,
    '/api/pcare/dpho': getDpho333c17262163cd6faf8db76f1159fd04,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/permissions/pcare/tindakan'
*/
const getTindakan6aee1d838d46c93804c4624856e80457 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan6aee1d838d46c93804c4624856e80457.url(options),
    method: 'get',
})

getTindakan6aee1d838d46c93804c4624856e80457.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/permissions/pcare/tindakan'
*/
getTindakan6aee1d838d46c93804c4624856e80457.url = (options?: RouteQueryOptions) => {
    return getTindakan6aee1d838d46c93804c4624856e80457.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/permissions/pcare/tindakan'
*/
getTindakan6aee1d838d46c93804c4624856e80457.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan6aee1d838d46c93804c4624856e80457.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/permissions/pcare/tindakan'
*/
getTindakan6aee1d838d46c93804c4624856e80457.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakan6aee1d838d46c93804c4624856e80457.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/pcare/tindakan'
*/
const getTindakanf3204ee63d2491d40fdcb6b4497e21c7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'get',
})

getTindakanf3204ee63d2491d40fdcb6b4497e21c7.definition = {
    methods: ["get","head"],
    url: '/api/pcare/tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url = (options?: RouteQueryOptions) => {
    return getTindakanf3204ee63d2491d40fdcb6b4497e21c7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/pcare/api/tindakan'
*/
const getTindakan9af2a269b8bedaa7030c0f00a75b17bb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'get',
})

getTindakan9af2a269b8bedaa7030c0f00a75b17bb.definition = {
    methods: ["get","head"],
    url: '/pcare/api/tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url = (options?: RouteQueryOptions) => {
    return getTindakan9af2a269b8bedaa7030c0f00a75b17bb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:1694
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'head',
})

export const getTindakan = {
    '/api/permissions/pcare/tindakan': getTindakan6aee1d838d46c93804c4624856e80457,
    '/api/pcare/tindakan': getTindakanf3204ee63d2491d40fdcb6b4497e21c7,
    '/pcare/api/tindakan': getTindakan9af2a269b8bedaa7030c0f00a75b17bb,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/permissions/pcare/provider'
*/
const getProvider609861a7d7f85961797c80bf113c7d6c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider609861a7d7f85961797c80bf113c7d6c.url(options),
    method: 'get',
})

getProvider609861a7d7f85961797c80bf113c7d6c.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/permissions/pcare/provider'
*/
getProvider609861a7d7f85961797c80bf113c7d6c.url = (options?: RouteQueryOptions) => {
    return getProvider609861a7d7f85961797c80bf113c7d6c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/permissions/pcare/provider'
*/
getProvider609861a7d7f85961797c80bf113c7d6c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider609861a7d7f85961797c80bf113c7d6c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/permissions/pcare/provider'
*/
getProvider609861a7d7f85961797c80bf113c7d6c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvider609861a7d7f85961797c80bf113c7d6c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/pcare/provider'
*/
const getProvider9f238e18d5b619ffe5318c728b55cb7f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider9f238e18d5b619ffe5318c728b55cb7f.url(options),
    method: 'get',
})

getProvider9f238e18d5b619ffe5318c728b55cb7f.definition = {
    methods: ["get","head"],
    url: '/api/pcare/provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/pcare/provider'
*/
getProvider9f238e18d5b619ffe5318c728b55cb7f.url = (options?: RouteQueryOptions) => {
    return getProvider9f238e18d5b619ffe5318c728b55cb7f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/pcare/provider'
*/
getProvider9f238e18d5b619ffe5318c728b55cb7f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider9f238e18d5b619ffe5318c728b55cb7f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:1763
* @route '/api/pcare/provider'
*/
getProvider9f238e18d5b619ffe5318c728b55cb7f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvider9f238e18d5b619ffe5318c728b55cb7f.url(options),
    method: 'head',
})

export const getProvider = {
    '/api/permissions/pcare/provider': getProvider609861a7d7f85961797c80bf113c7d6c,
    '/api/pcare/provider': getProvider9f238e18d5b619ffe5318c728b55cb7f,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/permissions/pcare/spesialis'
*/
const getSpesialis0289619ddf636fda7fc7c744a7e8efb1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis0289619ddf636fda7fc7c744a7e8efb1.url(options),
    method: 'get',
})

getSpesialis0289619ddf636fda7fc7c744a7e8efb1.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/permissions/pcare/spesialis'
*/
getSpesialis0289619ddf636fda7fc7c744a7e8efb1.url = (options?: RouteQueryOptions) => {
    return getSpesialis0289619ddf636fda7fc7c744a7e8efb1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/permissions/pcare/spesialis'
*/
getSpesialis0289619ddf636fda7fc7c744a7e8efb1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis0289619ddf636fda7fc7c744a7e8efb1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/permissions/pcare/spesialis'
*/
getSpesialis0289619ddf636fda7fc7c744a7e8efb1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSpesialis0289619ddf636fda7fc7c744a7e8efb1.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/pcare/spesialis'
*/
const getSpesialis0e34c55516023cf127fc5e24c451ec65 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis0e34c55516023cf127fc5e24c451ec65.url(options),
    method: 'get',
})

getSpesialis0e34c55516023cf127fc5e24c451ec65.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/pcare/spesialis'
*/
getSpesialis0e34c55516023cf127fc5e24c451ec65.url = (options?: RouteQueryOptions) => {
    return getSpesialis0e34c55516023cf127fc5e24c451ec65.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/pcare/spesialis'
*/
getSpesialis0e34c55516023cf127fc5e24c451ec65.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis0e34c55516023cf127fc5e24c451ec65.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1780
* @route '/api/pcare/spesialis'
*/
getSpesialis0e34c55516023cf127fc5e24c451ec65.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSpesialis0e34c55516023cf127fc5e24c451ec65.url(options),
    method: 'head',
})

export const getSpesialis = {
    '/api/permissions/pcare/spesialis': getSpesialis0289619ddf636fda7fc7c744a7e8efb1,
    '/api/pcare/spesialis': getSpesialis0e34c55516023cf127fc5e24c451ec65,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/permissions/pcare/spesialis/subspesialis'
*/
const getSubSpesialis766c3e7fa596c40107a37599676b1fed = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialis766c3e7fa596c40107a37599676b1fed.url(options),
    method: 'get',
})

getSubSpesialis766c3e7fa596c40107a37599676b1fed.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/spesialis/subspesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/permissions/pcare/spesialis/subspesialis'
*/
getSubSpesialis766c3e7fa596c40107a37599676b1fed.url = (options?: RouteQueryOptions) => {
    return getSubSpesialis766c3e7fa596c40107a37599676b1fed.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/permissions/pcare/spesialis/subspesialis'
*/
getSubSpesialis766c3e7fa596c40107a37599676b1fed.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialis766c3e7fa596c40107a37599676b1fed.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/permissions/pcare/spesialis/subspesialis'
*/
getSubSpesialis766c3e7fa596c40107a37599676b1fed.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSubSpesialis766c3e7fa596c40107a37599676b1fed.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/pcare/spesialis/subspesialis'
*/
const getSubSpesialisd2e150d397983773afddb54688980f94 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialisd2e150d397983773afddb54688980f94.url(options),
    method: 'get',
})

getSubSpesialisd2e150d397983773afddb54688980f94.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/subspesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialisd2e150d397983773afddb54688980f94.url = (options?: RouteQueryOptions) => {
    return getSubSpesialisd2e150d397983773afddb54688980f94.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialisd2e150d397983773afddb54688980f94.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialisd2e150d397983773afddb54688980f94.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1796
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialisd2e150d397983773afddb54688980f94.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSubSpesialisd2e150d397983773afddb54688980f94.url(options),
    method: 'head',
})

export const getSubSpesialis = {
    '/api/permissions/pcare/spesialis/subspesialis': getSubSpesialis766c3e7fa596c40107a37599676b1fed,
    '/api/pcare/spesialis/subspesialis': getSubSpesialisd2e150d397983773afddb54688980f94,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/permissions/pcare/spesialis/sarana'
*/
const getSarana7ef0552eaae8183951a8a2e18ef3b525 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana7ef0552eaae8183951a8a2e18ef3b525.url(options),
    method: 'get',
})

getSarana7ef0552eaae8183951a8a2e18ef3b525.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/spesialis/sarana',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/permissions/pcare/spesialis/sarana'
*/
getSarana7ef0552eaae8183951a8a2e18ef3b525.url = (options?: RouteQueryOptions) => {
    return getSarana7ef0552eaae8183951a8a2e18ef3b525.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/permissions/pcare/spesialis/sarana'
*/
getSarana7ef0552eaae8183951a8a2e18ef3b525.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana7ef0552eaae8183951a8a2e18ef3b525.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/permissions/pcare/spesialis/sarana'
*/
getSarana7ef0552eaae8183951a8a2e18ef3b525.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSarana7ef0552eaae8183951a8a2e18ef3b525.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/pcare/spesialis/sarana'
*/
const getSarana1636698510fb1e5d6c249287bfb3aa70 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana1636698510fb1e5d6c249287bfb3aa70.url(options),
    method: 'get',
})

getSarana1636698510fb1e5d6c249287bfb3aa70.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/sarana',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/pcare/spesialis/sarana'
*/
getSarana1636698510fb1e5d6c249287bfb3aa70.url = (options?: RouteQueryOptions) => {
    return getSarana1636698510fb1e5d6c249287bfb3aa70.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/pcare/spesialis/sarana'
*/
getSarana1636698510fb1e5d6c249287bfb3aa70.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana1636698510fb1e5d6c249287bfb3aa70.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:1865
* @route '/api/pcare/spesialis/sarana'
*/
getSarana1636698510fb1e5d6c249287bfb3aa70.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSarana1636698510fb1e5d6c249287bfb3aa70.url(options),
    method: 'head',
})

export const getSarana = {
    '/api/permissions/pcare/spesialis/sarana': getSarana7ef0552eaae8183951a8a2e18ef3b525,
    '/api/pcare/spesialis/sarana': getSarana1636698510fb1e5d6c249287bfb3aa70,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/permissions/pcare/spesialis/khusus'
*/
const getKhususa5f0ee174f5d417b7eebae105a472b42 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhususa5f0ee174f5d417b7eebae105a472b42.url(options),
    method: 'get',
})

getKhususa5f0ee174f5d417b7eebae105a472b42.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/spesialis/khusus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/permissions/pcare/spesialis/khusus'
*/
getKhususa5f0ee174f5d417b7eebae105a472b42.url = (options?: RouteQueryOptions) => {
    return getKhususa5f0ee174f5d417b7eebae105a472b42.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/permissions/pcare/spesialis/khusus'
*/
getKhususa5f0ee174f5d417b7eebae105a472b42.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhususa5f0ee174f5d417b7eebae105a472b42.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/permissions/pcare/spesialis/khusus'
*/
getKhususa5f0ee174f5d417b7eebae105a472b42.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKhususa5f0ee174f5d417b7eebae105a472b42.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/pcare/spesialis/khusus'
*/
const getKhususaf228e34f62cbf877114e31b2c6d778d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhususaf228e34f62cbf877114e31b2c6d778d.url(options),
    method: 'get',
})

getKhususaf228e34f62cbf877114e31b2c6d778d.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/khusus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/pcare/spesialis/khusus'
*/
getKhususaf228e34f62cbf877114e31b2c6d778d.url = (options?: RouteQueryOptions) => {
    return getKhususaf228e34f62cbf877114e31b2c6d778d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/pcare/spesialis/khusus'
*/
getKhususaf228e34f62cbf877114e31b2c6d778d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhususaf228e34f62cbf877114e31b2c6d778d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:1880
* @route '/api/pcare/spesialis/khusus'
*/
getKhususaf228e34f62cbf877114e31b2c6d778d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKhususaf228e34f62cbf877114e31b2c6d778d.url(options),
    method: 'head',
})

export const getKhusus = {
    '/api/permissions/pcare/spesialis/khusus': getKhususa5f0ee174f5d417b7eebae105a472b42,
    '/api/pcare/spesialis/khusus': getKhususaf228e34f62cbf877114e31b2c6d778d,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/permissions/pcare/prognosa'
*/
const getPrognosae4f469e4ee7788098cf02820d2fd8290 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosae4f469e4ee7788098cf02820d2fd8290.url(options),
    method: 'get',
})

getPrognosae4f469e4ee7788098cf02820d2fd8290.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/prognosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/permissions/pcare/prognosa'
*/
getPrognosae4f469e4ee7788098cf02820d2fd8290.url = (options?: RouteQueryOptions) => {
    return getPrognosae4f469e4ee7788098cf02820d2fd8290.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/permissions/pcare/prognosa'
*/
getPrognosae4f469e4ee7788098cf02820d2fd8290.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosae4f469e4ee7788098cf02820d2fd8290.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/permissions/pcare/prognosa'
*/
getPrognosae4f469e4ee7788098cf02820d2fd8290.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPrognosae4f469e4ee7788098cf02820d2fd8290.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/pcare/prognosa'
*/
const getPrognosa7eb4b7a166e9699a5e1bfafe85020a66 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.url(options),
    method: 'get',
})

getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prognosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/pcare/prognosa'
*/
getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.url = (options?: RouteQueryOptions) => {
    return getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/pcare/prognosa'
*/
getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:1928
* @route '/api/pcare/prognosa'
*/
getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPrognosa7eb4b7a166e9699a5e1bfafe85020a66.url(options),
    method: 'head',
})

export const getPrognosa = {
    '/api/permissions/pcare/prognosa': getPrognosae4f469e4ee7788098cf02820d2fd8290,
    '/api/pcare/prognosa': getPrognosa7eb4b7a166e9699a5e1bfafe85020a66,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/permissions/pcare/alergi'
*/
const getAlergi28a5192e4f5cef934c7a7481d2e89fad = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi28a5192e4f5cef934c7a7481d2e89fad.url(options),
    method: 'get',
})

getAlergi28a5192e4f5cef934c7a7481d2e89fad.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/permissions/pcare/alergi'
*/
getAlergi28a5192e4f5cef934c7a7481d2e89fad.url = (options?: RouteQueryOptions) => {
    return getAlergi28a5192e4f5cef934c7a7481d2e89fad.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/permissions/pcare/alergi'
*/
getAlergi28a5192e4f5cef934c7a7481d2e89fad.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi28a5192e4f5cef934c7a7481d2e89fad.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/permissions/pcare/alergi'
*/
getAlergi28a5192e4f5cef934c7a7481d2e89fad.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlergi28a5192e4f5cef934c7a7481d2e89fad.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/pcare/alergi'
*/
const getAlergi1f521f7916d6f572bd3ccd7799437569 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi1f521f7916d6f572bd3ccd7799437569.url(options),
    method: 'get',
})

getAlergi1f521f7916d6f572bd3ccd7799437569.definition = {
    methods: ["get","head"],
    url: '/api/pcare/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/pcare/alergi'
*/
getAlergi1f521f7916d6f572bd3ccd7799437569.url = (options?: RouteQueryOptions) => {
    return getAlergi1f521f7916d6f572bd3ccd7799437569.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/pcare/alergi'
*/
getAlergi1f521f7916d6f572bd3ccd7799437569.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi1f521f7916d6f572bd3ccd7799437569.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:1896
* @route '/api/pcare/alergi'
*/
getAlergi1f521f7916d6f572bd3ccd7799437569.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlergi1f521f7916d6f572bd3ccd7799437569.url(options),
    method: 'head',
})

export const getAlergi = {
    '/api/permissions/pcare/alergi': getAlergi28a5192e4f5cef934c7a7481d2e89fad,
    '/api/pcare/alergi': getAlergi1f521f7916d6f572bd3ccd7799437569,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/permissions/pcare/statuspulang'
*/
const getStatusPulang4643a8fd6deffde0d2e7566fb1f90350 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.url(options),
    method: 'get',
})

getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/statuspulang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/permissions/pcare/statuspulang'
*/
getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.url = (options?: RouteQueryOptions) => {
    return getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/permissions/pcare/statuspulang'
*/
getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/permissions/pcare/statuspulang'
*/
getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatusPulang4643a8fd6deffde0d2e7566fb1f90350.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/pcare/statuspulang'
*/
const getStatusPulangffaa35e9602a3e895219b74dfed26389 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulangffaa35e9602a3e895219b74dfed26389.url(options),
    method: 'get',
})

getStatusPulangffaa35e9602a3e895219b74dfed26389.definition = {
    methods: ["get","head"],
    url: '/api/pcare/statuspulang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/pcare/statuspulang'
*/
getStatusPulangffaa35e9602a3e895219b74dfed26389.url = (options?: RouteQueryOptions) => {
    return getStatusPulangffaa35e9602a3e895219b74dfed26389.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/pcare/statuspulang'
*/
getStatusPulangffaa35e9602a3e895219b74dfed26389.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulangffaa35e9602a3e895219b74dfed26389.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:1944
* @route '/api/pcare/statuspulang'
*/
getStatusPulangffaa35e9602a3e895219b74dfed26389.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatusPulangffaa35e9602a3e895219b74dfed26389.url(options),
    method: 'head',
})

export const getStatusPulang = {
    '/api/permissions/pcare/statuspulang': getStatusPulang4643a8fd6deffde0d2e7566fb1f90350,
    '/api/pcare/statuspulang': getStatusPulangffaa35e9602a3e895219b74dfed26389,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
const getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.url(args, options),
    method: 'get',
})

getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.url = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kdSubSpesialis: args[0],
            kdSarana: args[1],
            tglEstRujuk: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdSubSpesialis: args.kdSubSpesialis,
        kdSarana: args.kdSarana,
        tglEstRujuk: args.tglEstRujuk,
    }

    return getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.definition.url
            .replace('{kdSubSpesialis}', parsedArgs.kdSubSpesialis.toString())
            .replace('{kdSarana}', parsedArgs.kdSarana.toString())
            .replace('{tglEstRujuk}', parsedArgs.tglEstRujuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.get = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.head = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
const getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.url(args, options),
    method: 'get',
})

getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.url = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kdSubSpesialis: args[0],
            kdSarana: args[1],
            tglEstRujuk: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdSubSpesialis: args.kdSubSpesialis,
        kdSarana: args.kdSarana,
        tglEstRujuk: args.tglEstRujuk,
    }

    return getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.definition.url
            .replace('{kdSubSpesialis}', parsedArgs.kdSubSpesialis.toString())
            .replace('{kdSarana}', parsedArgs.kdSarana.toString())
            .replace('{tglEstRujuk}', parsedArgs.tglEstRujuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.get = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1964
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.head = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf.url(args, options),
    method: 'head',
})

export const getFaskesRujukanSubSpesialis = {
    '/api/permissions/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}': getFaskesRujukanSubSpesialis94c9f6b238309bb973ae5f1c307ef67a,
    '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}': getFaskesRujukanSubSpesialis49277f89b99e07acd7f49b78739656bf,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}'
*/
const pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.url(args, options),
    method: 'get',
})

pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.url = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            noka: args[0],
            tglPelayanan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
        tglPelayanan: args.tglPelayanan,
    }

    return pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace('{tglPelayanan}', parsedArgs.tglPelayanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
const pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'get',
})

pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.definition = {
    methods: ["get","head"],
    url: '/api/pcare/peserta/{noka}/{tglPelayanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            noka: args[0],
            tglPelayanan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
        tglPelayanan: args.tglPelayanan,
    }

    return pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace('{tglPelayanan}', parsedArgs.tglPelayanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
const pesertaByNoKartud24fc36189df31f5571f5a4c0711693d = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'get',
})

pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.definition = {
    methods: ["get","head"],
    url: '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            noka: args[0],
            tglPelayanan: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
        tglPelayanan: args.tglPelayanan,
    }

    return pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace('{tglPelayanan}', parsedArgs.tglPelayanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:272
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'head',
})

export const pesertaByNoKartu = {
    '/api/permissions/pcare/peserta/{noka}/{tglPelayanan}': pesertaByNoKartuf28f0ee24fcf99b8f3ca88f7e640e07d,
    '/api/pcare/peserta/{noka}/{tglPelayanan}': pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b,
    '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}': pesertaByNoKartud24fc36189df31f5571f5a4c0711693d,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/permissions/pcare/pendaftaran'
*/
const addPendaftaran3ccda985f5b0e6181a19065043858098 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran3ccda985f5b0e6181a19065043858098.url(options),
    method: 'post',
})

addPendaftaran3ccda985f5b0e6181a19065043858098.definition = {
    methods: ["post"],
    url: '/api/permissions/pcare/pendaftaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/permissions/pcare/pendaftaran'
*/
addPendaftaran3ccda985f5b0e6181a19065043858098.url = (options?: RouteQueryOptions) => {
    return addPendaftaran3ccda985f5b0e6181a19065043858098.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/permissions/pcare/pendaftaran'
*/
addPendaftaran3ccda985f5b0e6181a19065043858098.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran3ccda985f5b0e6181a19065043858098.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/pcare/pendaftaran'
*/
const addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.url(options),
    method: 'post',
})

addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.definition = {
    methods: ["post"],
    url: '/api/pcare/pendaftaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/pcare/pendaftaran'
*/
addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.url = (options?: RouteQueryOptions) => {
    return addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:1356
* @route '/api/pcare/pendaftaran'
*/
addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f.url(options),
    method: 'post',
})

export const addPendaftaran = {
    '/api/permissions/pcare/pendaftaran': addPendaftaran3ccda985f5b0e6181a19065043858098,
    '/api/pcare/pendaftaran': addPendaftaran8f95b69dbf01f8e62ca56839f9d8366f,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}'
*/
const getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.url(args, options),
    method: 'get',
})

getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
const getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.url(args, options),
    method: 'get',
})

getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.definition = {
    methods: ["get","head"],
    url: '/api/pcare/pendaftaran/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1313
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098.url(args, options),
    method: 'head',
})

export const getPendaftaranByRawat = {
    '/api/permissions/pcare/pendaftaran/rawat/{no_rawat}': getPendaftaranByRawat9da7b2276316bbe42afeba736dd63d5a,
    '/api/pcare/pendaftaran/rawat/{no_rawat}': getPendaftaranByRawat5c54dfcfaeaa4929ed1f1e9840d99098,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
const getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.url(args, options),
    method: 'get',
})

getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
const getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.url(args, options),
    method: 'get',
})

getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.definition = {
    methods: ["get","head"],
    url: '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1197
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540.url(args, options),
    method: 'head',
})

export const getRujukanSubspesialisByRawat = {
    '/api/permissions/pcare/rujuk-subspesialis/rawat/{no_rawat}': getRujukanSubspesialisByRawata6fb345cd2f0cd8e6b35f7a4cddc1eb5,
    '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}': getRujukanSubspesialisByRawatfdcad8e5c86fa91652d8951a01f48540,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/permissions/pcare/config/kabupaten'
*/
const getKabupatenConfig3f77f522613ed160d94d359e523f6b6d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.url(options),
    method: 'get',
})

getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/config/kabupaten',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/permissions/pcare/config/kabupaten'
*/
getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.url = (options?: RouteQueryOptions) => {
    return getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/permissions/pcare/config/kabupaten'
*/
getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/permissions/pcare/config/kabupaten'
*/
getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKabupatenConfig3f77f522613ed160d94d359e523f6b6d.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/pcare/config/kabupaten'
*/
const getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.url(options),
    method: 'get',
})

getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.definition = {
    methods: ["get","head"],
    url: '/api/pcare/config/kabupaten',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.url = (options?: RouteQueryOptions) => {
    return getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:1290
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976.url(options),
    method: 'head',
})

export const getKabupatenConfig = {
    '/api/permissions/pcare/config/kabupaten': getKabupatenConfig3f77f522613ed160d94d359e523f6b6d,
    '/api/pcare/config/kabupaten': getKabupatenConfigb6a9cf3b1e41bc5d836bde94034ae976,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/api/v1/rs/dokter'
*/
const searchDokterRsd08acf3ebfc3d304666316c344331a0f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRsd08acf3ebfc3d304666316c344331a0f.url(options),
    method: 'get',
})

searchDokterRsd08acf3ebfc3d304666316c344331a0f.definition = {
    methods: ["get","head"],
    url: '/api/v1/rs/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.url = (options?: RouteQueryOptions) => {
    return searchDokterRsd08acf3ebfc3d304666316c344331a0f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRsd08acf3ebfc3d304666316c344331a0f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchDokterRsd08acf3ebfc3d304666316c344331a0f.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/pcare/api/rs/dokter'
*/
const searchDokterRs1493b6224e643d45bff2cf8399432e47 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRs1493b6224e643d45bff2cf8399432e47.url(options),
    method: 'get',
})

searchDokterRs1493b6224e643d45bff2cf8399432e47.definition = {
    methods: ["get","head"],
    url: '/pcare/api/rs/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/pcare/api/rs/dokter'
*/
searchDokterRs1493b6224e643d45bff2cf8399432e47.url = (options?: RouteQueryOptions) => {
    return searchDokterRs1493b6224e643d45bff2cf8399432e47.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/pcare/api/rs/dokter'
*/
searchDokterRs1493b6224e643d45bff2cf8399432e47.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRs1493b6224e643d45bff2cf8399432e47.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:2409
* @route '/pcare/api/rs/dokter'
*/
searchDokterRs1493b6224e643d45bff2cf8399432e47.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchDokterRs1493b6224e643d45bff2cf8399432e47.url(options),
    method: 'head',
})

export const searchDokterRs = {
    '/api/v1/rs/dokter': searchDokterRsd08acf3ebfc3d304666316c344331a0f,
    '/pcare/api/rs/dokter': searchDokterRs1493b6224e643d45bff2cf8399432e47,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/api/v1/rs/poliklinik'
*/
const searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url(options),
    method: 'get',
})

searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.definition = {
    methods: ["get","head"],
    url: '/api/v1/rs/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url = (options?: RouteQueryOptions) => {
    return searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/pcare/api/rs/poliklinik'
*/
const searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url(options),
    method: 'get',
})

searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.definition = {
    methods: ["get","head"],
    url: '/pcare/api/rs/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/pcare/api/rs/poliklinik'
*/
searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url = (options?: RouteQueryOptions) => {
    return searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/pcare/api/rs/poliklinik'
*/
searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:2388
* @route '/pcare/api/rs/poliklinik'
*/
searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url(options),
    method: 'head',
})

export const searchPoliklinikRs = {
    '/api/v1/rs/poliklinik': searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486,
    '/pcare/api/rs/poliklinik': searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:2430
* @route '/pcare/api/rs/obat'
*/
export const searchObatRs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchObatRs.url(options),
    method: 'get',
})

searchObatRs.definition = {
    methods: ["get","head"],
    url: '/pcare/api/rs/obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:2430
* @route '/pcare/api/rs/obat'
*/
searchObatRs.url = (options?: RouteQueryOptions) => {
    return searchObatRs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:2430
* @route '/pcare/api/rs/obat'
*/
searchObatRs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchObatRs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:2430
* @route '/pcare/api/rs/obat'
*/
searchObatRs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchObatRs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2450
* @route '/pcare/api/mapping/poli'
*/
export const getMappingPoli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingPoli.url(options),
    method: 'get',
})

getMappingPoli.definition = {
    methods: ["get","head"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2450
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.url = (options?: RouteQueryOptions) => {
    return getMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2450
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingPoli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2450
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingPoli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2467
* @route '/pcare/api/mapping/poli'
*/
export const storeMappingPoli = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingPoli.url(options),
    method: 'post',
})

storeMappingPoli.definition = {
    methods: ["post"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2467
* @route '/pcare/api/mapping/poli'
*/
storeMappingPoli.url = (options?: RouteQueryOptions) => {
    return storeMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2467
* @route '/pcare/api/mapping/poli'
*/
storeMappingPoli.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingPoli.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2528
* @route '/pcare/api/mapping/poli'
*/
export const deleteMappingPoli = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingPoli.url(options),
    method: 'delete',
})

deleteMappingPoli.definition = {
    methods: ["delete"],
    url: '/pcare/api/mapping/poli',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2528
* @route '/pcare/api/mapping/poli'
*/
deleteMappingPoli.url = (options?: RouteQueryOptions) => {
    return deleteMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:2528
* @route '/pcare/api/mapping/poli'
*/
deleteMappingPoli.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingPoli.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2578
* @route '/pcare/api/mapping/dokter'
*/
export const getMappingDokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingDokter.url(options),
    method: 'get',
})

getMappingDokter.definition = {
    methods: ["get","head"],
    url: '/pcare/api/mapping/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2578
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.url = (options?: RouteQueryOptions) => {
    return getMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2578
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2578
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2595
* @route '/pcare/api/mapping/dokter'
*/
export const storeMappingDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingDokter.url(options),
    method: 'post',
})

storeMappingDokter.definition = {
    methods: ["post"],
    url: '/pcare/api/mapping/dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2595
* @route '/pcare/api/mapping/dokter'
*/
storeMappingDokter.url = (options?: RouteQueryOptions) => {
    return storeMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2595
* @route '/pcare/api/mapping/dokter'
*/
storeMappingDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2656
* @route '/pcare/api/mapping/dokter'
*/
export const deleteMappingDokter = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingDokter.url(options),
    method: 'delete',
})

deleteMappingDokter.definition = {
    methods: ["delete"],
    url: '/pcare/api/mapping/dokter',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2656
* @route '/pcare/api/mapping/dokter'
*/
deleteMappingDokter.url = (options?: RouteQueryOptions) => {
    return deleteMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:2656
* @route '/pcare/api/mapping/dokter'
*/
deleteMappingDokter.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingDokter.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2706
* @route '/pcare/api/mapping/obat'
*/
export const getMappingObat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingObat.url(options),
    method: 'get',
})

getMappingObat.definition = {
    methods: ["get","head"],
    url: '/pcare/api/mapping/obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2706
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.url = (options?: RouteQueryOptions) => {
    return getMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2706
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2706
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingObat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2722
* @route '/pcare/api/mapping/obat'
*/
export const storeMappingObat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingObat.url(options),
    method: 'post',
})

storeMappingObat.definition = {
    methods: ["post"],
    url: '/pcare/api/mapping/obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2722
* @route '/pcare/api/mapping/obat'
*/
storeMappingObat.url = (options?: RouteQueryOptions) => {
    return storeMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2722
* @route '/pcare/api/mapping/obat'
*/
storeMappingObat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingObat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2783
* @route '/pcare/api/mapping/obat'
*/
export const deleteMappingObat = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingObat.url(options),
    method: 'delete',
})

deleteMappingObat.definition = {
    methods: ["delete"],
    url: '/pcare/api/mapping/obat',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2783
* @route '/pcare/api/mapping/obat'
*/
deleteMappingObat.url = (options?: RouteQueryOptions) => {
    return deleteMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:2783
* @route '/pcare/api/mapping/obat'
*/
deleteMappingObat.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingObat.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:1986
* @route '/pcare/api/peserta/nik'
*/
export const pesertaByNik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNik.url(options),
    method: 'get',
})

pesertaByNik.definition = {
    methods: ["get","head"],
    url: '/pcare/api/peserta/nik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:1986
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.url = (options?: RouteQueryOptions) => {
    return pesertaByNik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:1986
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:1986
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kirimKunjunganSehat
* @see app/Http/Controllers/Pcare/PcareController.php:440
* @route '/pcare/api/kunjungan-sehat'
*/
export const kirimKunjunganSehat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirimKunjunganSehat.url(options),
    method: 'post',
})

kirimKunjunganSehat.definition = {
    methods: ["post"],
    url: '/pcare/api/kunjungan-sehat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::kirimKunjunganSehat
* @see app/Http/Controllers/Pcare/PcareController.php:440
* @route '/pcare/api/kunjungan-sehat'
*/
kirimKunjunganSehat.url = (options?: RouteQueryOptions) => {
    return kirimKunjunganSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kirimKunjunganSehat
* @see app/Http/Controllers/Pcare/PcareController.php:440
* @route '/pcare/api/kunjungan-sehat'
*/
kirimKunjunganSehat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirimKunjunganSehat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/pcare/api/peserta/{noka}'
*/
export const getPeserta = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

getPeserta.definition = {
    methods: ["get","head"],
    url: '/pcare/api/peserta/{noka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.url = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noka: args }
    }

    if (Array.isArray(args)) {
        args = {
            noka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noka: args.noka,
    }

    return getPeserta.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPeserta.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:2011
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
export const getClubProlanis = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getClubProlanis.url(args, options),
    method: 'get',
})

getClubProlanis.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/club/{kdProgram}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:2011
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.url = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdProgram: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdProgram: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdProgram: args.kdProgram,
    }

    return getClubProlanis.definition.url
            .replace('{kdProgram}', parsedArgs.kdProgram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:2011
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.get = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getClubProlanis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:2011
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.head = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getClubProlanis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2050
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
export const getKegiatanKelompok = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'get',
})

getKegiatanKelompok.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/kegiatan/{tanggal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2050
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.url = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tanggal: args }
    }

    if (Array.isArray(args)) {
        args = {
            tanggal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tanggal: args.tanggal,
    }

    return getKegiatanKelompok.definition.url
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2050
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.get = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2050
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.head = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2092
* @route '/pcare/api/kelompok/kegiatan'
*/
export const addKegiatanKelompok = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKegiatanKelompok.url(options),
    method: 'post',
})

addKegiatanKelompok.definition = {
    methods: ["post"],
    url: '/pcare/api/kelompok/kegiatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2092
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return addKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2092
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKegiatanKelompok.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2180
* @route '/pcare/api/kelompok/kegiatan'
*/
export const updateKegiatanKelompok = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKegiatanKelompok.url(options),
    method: 'put',
})

updateKegiatanKelompok.definition = {
    methods: ["put"],
    url: '/pcare/api/kelompok/kegiatan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2180
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return updateKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2180
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKegiatanKelompok.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2270
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
export const deleteKegiatanKelompok = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteKegiatanKelompok.url(args, options),
    method: 'delete',
})

deleteKegiatanKelompok.definition = {
    methods: ["delete"],
    url: '/pcare/api/kelompok/kegiatan/{eduId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2270
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
deleteKegiatanKelompok.url = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eduId: args }
    }

    if (Array.isArray(args)) {
        args = {
            eduId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        eduId: args.eduId,
    }

    return deleteKegiatanKelompok.definition.url
            .replace('{eduId}', parsedArgs.eduId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:2270
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
deleteKegiatanKelompok.delete = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteKegiatanKelompok.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2333
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
export const getPesertaKegiatan = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'get',
})

getPesertaKegiatan.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/peserta/{eduId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2333
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.url = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eduId: args }
    }

    if (Array.isArray(args)) {
        args = {
            eduId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        eduId: args.eduId,
    }

    return getPesertaKegiatan.definition.url
            .replace('{eduId}', parsedArgs.eduId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2333
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.get = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2333
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.head = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2299
* @route '/pcare/api/kelompok/peserta'
*/
export const addPesertaKegiatan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPesertaKegiatan.url(options),
    method: 'post',
})

addPesertaKegiatan.definition = {
    methods: ["post"],
    url: '/pcare/api/kelompok/peserta',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2299
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.url = (options?: RouteQueryOptions) => {
    return addPesertaKegiatan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2299
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPesertaKegiatan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2359
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
export const deletePesertaKegiatan = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePesertaKegiatan.url(args, options),
    method: 'delete',
})

deletePesertaKegiatan.definition = {
    methods: ["delete"],
    url: '/pcare/api/kelompok/peserta/{eduId}/{noKartu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2359
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
deletePesertaKegiatan.url = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            eduId: args[0],
            noKartu: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        eduId: args.eduId,
        noKartu: args.noKartu,
    }

    return deletePesertaKegiatan.definition.url
            .replace('{eduId}', parsedArgs.eduId.toString())
            .replace('{noKartu}', parsedArgs.noKartu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:2359
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
deletePesertaKegiatan.delete = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePesertaKegiatan.url(args, options),
    method: 'delete',
})

const PcareController = { ping, proxy, getDokter, getDiagnosa, getFaskes, getPoli, getKesadaran, getDpho, getTindakan, getProvider, getSpesialis, getSubSpesialis, getSarana, getKhusus, getPrognosa, getAlergi, getStatusPulang, getFaskesRujukanSubSpesialis, pesertaByNoKartu, addPendaftaran, getPendaftaranByRawat, getRujukanSubspesialisByRawat, getKabupatenConfig, searchDokterRs, searchPoliklinikRs, searchObatRs, getMappingPoli, storeMappingPoli, deleteMappingPoli, getMappingDokter, storeMappingDokter, deleteMappingDokter, getMappingObat, storeMappingObat, deleteMappingObat, pesertaByNik, kirimKunjunganSehat, getPeserta, getClubProlanis, getKegiatanKelompok, addKegiatanKelompok, updateKegiatanKelompok, deleteKegiatanKelompok, getPesertaKegiatan, addPesertaKegiatan, deletePesertaKegiatan }

export default PcareController