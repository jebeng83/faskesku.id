import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
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
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url = (options?: RouteQueryOptions) => {
    return getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
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
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url = (options?: RouteQueryOptions) => {
    return getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/pcare/api/diagnosa'
*/
getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5.url(options),
    method: 'head',
})

export const getDiagnosa = {
    '/api/pcare/diagnosa': getDiagnosacbdcddb07b3886aa644cd1e380ccd9b9,
    '/pcare/api/diagnosa': getDiagnosafadc90ea3e97aaa7f1e8ddc8fb06a6d5,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:30
* @route '/api/pcare/ping'
*/
export const ping = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping.url(options),
    method: 'get',
})

ping.definition = {
    methods: ["get","head"],
    url: '/api/pcare/ping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:30
* @route '/api/pcare/ping'
*/
ping.url = (options?: RouteQueryOptions) => {
    return ping.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:30
* @route '/api/pcare/ping'
*/
ping.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:30
* @route '/api/pcare/ping'
*/
ping.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ping.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
export const proxy = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy.url(args, options),
    method: 'get',
})

proxy.definition = {
    methods: ["get","post","put","delete","head"],
    url: '/api/pcare/proxy/{endpoint}',
} satisfies RouteDefinition<["get","post","put","delete","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.url = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return proxy.definition.url
            .replace('{endpoint}', parsedArgs.endpoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:51
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
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
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.url = (options?: RouteQueryOptions) => {
    return getDokterca5945421beecfede6d16185319e6459.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
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
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.url = (options?: RouteQueryOptions) => {
    return getDokter8d2dff60a18c4591d77b87e52d5e4999.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'head',
})

export const getDokter = {
    '/api/pcare/dokter': getDokterca5945421beecfede6d16185319e6459,
    '/pcare/api/dokter': getDokter8d2dff60a18c4591d77b87e52d5e4999,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
export const getFaskes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes.url(options),
    method: 'get',
})

getFaskes.definition = {
    methods: ["get","head"],
    url: '/api/pcare/faskes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
getFaskes.url = (options?: RouteQueryOptions) => {
    return getFaskes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
getFaskes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
getFaskes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
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
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.url = (options?: RouteQueryOptions) => {
    return getPoli703bacfc6bd9d70800508f5d768683d4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
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
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.url = (options?: RouteQueryOptions) => {
    return getPoliba0dd418727a662ea51949e786965266.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'head',
})

export const getPoli = {
    '/api/pcare/poli': getPoli703bacfc6bd9d70800508f5d768683d4,
    '/pcare/api/poli': getPoliba0dd418727a662ea51949e786965266,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
export const getKesadaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadaran.url(options),
    method: 'get',
})

getKesadaran.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
getKesadaran.url = (options?: RouteQueryOptions) => {
    return getKesadaran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
getKesadaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadaran.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
getKesadaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKesadaran.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
export const getDpho = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho.url(options),
    method: 'get',
})

getDpho.definition = {
    methods: ["get","head"],
    url: '/api/pcare/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
getDpho.url = (options?: RouteQueryOptions) => {
    return getDpho.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
getDpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
getDpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDpho.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
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
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url = (options?: RouteQueryOptions) => {
    return getTindakanf3204ee63d2491d40fdcb6b4497e21c7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
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
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url = (options?: RouteQueryOptions) => {
    return getTindakan9af2a269b8bedaa7030c0f00a75b17bb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'head',
})

export const getTindakan = {
    '/api/pcare/tindakan': getTindakanf3204ee63d2491d40fdcb6b4497e21c7,
    '/pcare/api/tindakan': getTindakan9af2a269b8bedaa7030c0f00a75b17bb,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
export const getProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider.url(options),
    method: 'get',
})

getProvider.definition = {
    methods: ["get","head"],
    url: '/api/pcare/provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
getProvider.url = (options?: RouteQueryOptions) => {
    return getProvider.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
getProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
getProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvider.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
export const getSpesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis.url(options),
    method: 'get',
})

getSpesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
getSpesialis.url = (options?: RouteQueryOptions) => {
    return getSpesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
getSpesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
getSpesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSpesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
export const getSubSpesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialis.url(options),
    method: 'get',
})

getSubSpesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/subspesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.url = (options?: RouteQueryOptions) => {
    return getSubSpesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSubSpesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
export const getSarana = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana.url(options),
    method: 'get',
})

getSarana.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/sarana',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.url = (options?: RouteQueryOptions) => {
    return getSarana.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSarana.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
export const getKhusus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhusus.url(options),
    method: 'get',
})

getKhusus.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/khusus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.url = (options?: RouteQueryOptions) => {
    return getKhusus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhusus.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKhusus.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
export const getPrognosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosa.url(options),
    method: 'get',
})

getPrognosa.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prognosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
getPrognosa.url = (options?: RouteQueryOptions) => {
    return getPrognosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
getPrognosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
getPrognosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPrognosa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
export const getAlergi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi.url(options),
    method: 'get',
})

getAlergi.definition = {
    methods: ["get","head"],
    url: '/api/pcare/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
getAlergi.url = (options?: RouteQueryOptions) => {
    return getAlergi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
getAlergi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
getAlergi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlergi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
export const getStatusPulang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulang.url(options),
    method: 'get',
})

getStatusPulang.definition = {
    methods: ["get","head"],
    url: '/api/pcare/statuspulang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.url = (options?: RouteQueryOptions) => {
    return getStatusPulang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatusPulang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:3107
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
export const getFaskesRujukanSubSpesialis = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis.url(args, options),
    method: 'get',
})

getFaskesRujukanSubSpesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:3107
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis.url = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions) => {
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

    return getFaskesRujukanSubSpesialis.definition.url
            .replace('{kdSubSpesialis}', parsedArgs.kdSubSpesialis.toString())
            .replace('{kdSarana}', parsedArgs.kdSarana.toString())
            .replace('{tglEstRujuk}', parsedArgs.tglEstRujuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:3107
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis.get = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:3107
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis.head = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskesRujukanSubSpesialis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
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
* @see app/Http/Controllers/Pcare/PcareController.php:342
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
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
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
* @see app/Http/Controllers/Pcare/PcareController.php:342
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
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'head',
})

export const pesertaByNoKartu = {
    '/api/pcare/peserta/{noka}/{tglPelayanan}': pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b,
    '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}': pesertaByNoKartud24fc36189df31f5571f5a4c0711693d,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2157
* @route '/api/pcare/pendaftaran'
*/
export const addPendaftaran = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran.url(options),
    method: 'post',
})

addPendaftaran.definition = {
    methods: ["post"],
    url: '/api/pcare/pendaftaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2157
* @route '/api/pcare/pendaftaran'
*/
addPendaftaran.url = (options?: RouteQueryOptions) => {
    return addPendaftaran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2157
* @route '/api/pcare/pendaftaran'
*/
addPendaftaran.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPendaftaran.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2382
* @route '/api/pcare/pendaftaran'
*/
export const deletePendaftaran = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePendaftaran.url(options),
    method: 'delete',
})

deletePendaftaran.definition = {
    methods: ["delete"],
    url: '/api/pcare/pendaftaran',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2382
* @route '/api/pcare/pendaftaran'
*/
deletePendaftaran.url = (options?: RouteQueryOptions) => {
    return deletePendaftaran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePendaftaran
* @see app/Http/Controllers/Pcare/PcareController.php:2382
* @route '/api/pcare/pendaftaran'
*/
deletePendaftaran.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePendaftaran.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2114
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
export const getPendaftaranByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat.url(args, options),
    method: 'get',
})

getPendaftaranByRawat.definition = {
    methods: ["get","head"],
    url: '/api/pcare/pendaftaran/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2114
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPendaftaranByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2114
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendaftaranByRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPendaftaranByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2114
* @route '/api/pcare/pendaftaran/rawat/{no_rawat}'
*/
getPendaftaranByRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPendaftaranByRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1382
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
export const getRujukanSubspesialisByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawat.url(args, options),
    method: 'get',
})

getRujukanSubspesialisByRawat.definition = {
    methods: ["get","head"],
    url: '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1382
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRujukanSubspesialisByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1382
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRujukanSubspesialisByRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getRujukanSubspesialisByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1382
* @route '/api/pcare/rujuk-subspesialis/rawat/{no_rawat}'
*/
getRujukanSubspesialisByRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRujukanSubspesialisByRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
export const getKabupatenConfig = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfig.url(options),
    method: 'get',
})

getKabupatenConfig.definition = {
    methods: ["get","head"],
    url: '/api/pcare/config/kabupaten',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfig.url = (options?: RouteQueryOptions) => {
    return getKabupatenConfig.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfig.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKabupatenConfig.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKabupatenConfig
* @see app/Http/Controllers/Pcare/PcareController.php:2091
* @route '/api/pcare/config/kabupaten'
*/
getKabupatenConfig.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKabupatenConfig.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
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
* @see app/Http/Controllers/Pcare/PcareController.php:3552
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.url = (options?: RouteQueryOptions) => {
    return searchDokterRsd08acf3ebfc3d304666316c344331a0f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRsd08acf3ebfc3d304666316c344331a0f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
* @route '/api/v1/rs/dokter'
*/
searchDokterRsd08acf3ebfc3d304666316c344331a0f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchDokterRsd08acf3ebfc3d304666316c344331a0f.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
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
* @see app/Http/Controllers/Pcare/PcareController.php:3552
* @route '/pcare/api/rs/dokter'
*/
searchDokterRs1493b6224e643d45bff2cf8399432e47.url = (options?: RouteQueryOptions) => {
    return searchDokterRs1493b6224e643d45bff2cf8399432e47.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
* @route '/pcare/api/rs/dokter'
*/
searchDokterRs1493b6224e643d45bff2cf8399432e47.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchDokterRs1493b6224e643d45bff2cf8399432e47.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchDokterRs
* @see app/Http/Controllers/Pcare/PcareController.php:3552
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
* @see app/Http/Controllers/Pcare/PcareController.php:3531
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
* @see app/Http/Controllers/Pcare/PcareController.php:3531
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url = (options?: RouteQueryOptions) => {
    return searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:3531
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:3531
* @route '/api/v1/rs/poliklinik'
*/
searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPoliklinikRs19ab1bbccff3314ba7658fa440f15486.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:3531
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
* @see app/Http/Controllers/Pcare/PcareController.php:3531
* @route '/pcare/api/rs/poliklinik'
*/
searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url = (options?: RouteQueryOptions) => {
    return searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:3531
* @route '/pcare/api/rs/poliklinik'
*/
searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPoliklinikRsa4d385e4e437ef2cb1785cd31ab1eba2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchPoliklinikRs
* @see app/Http/Controllers/Pcare/PcareController.php:3531
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
* @see app/Http/Controllers/Pcare/PcareController.php:3573
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
* @see app/Http/Controllers/Pcare/PcareController.php:3573
* @route '/pcare/api/rs/obat'
*/
searchObatRs.url = (options?: RouteQueryOptions) => {
    return searchObatRs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:3573
* @route '/pcare/api/rs/obat'
*/
searchObatRs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchObatRs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::searchObatRs
* @see app/Http/Controllers/Pcare/PcareController.php:3573
* @route '/pcare/api/rs/obat'
*/
searchObatRs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchObatRs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3593
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
* @see app/Http/Controllers/Pcare/PcareController.php:3593
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.url = (options?: RouteQueryOptions) => {
    return getMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3593
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingPoli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3593
* @route '/pcare/api/mapping/poli'
*/
getMappingPoli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingPoli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3610
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
* @see app/Http/Controllers/Pcare/PcareController.php:3610
* @route '/pcare/api/mapping/poli'
*/
storeMappingPoli.url = (options?: RouteQueryOptions) => {
    return storeMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3610
* @route '/pcare/api/mapping/poli'
*/
storeMappingPoli.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingPoli.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3671
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
* @see app/Http/Controllers/Pcare/PcareController.php:3671
* @route '/pcare/api/mapping/poli'
*/
deleteMappingPoli.url = (options?: RouteQueryOptions) => {
    return deleteMappingPoli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingPoli
* @see app/Http/Controllers/Pcare/PcareController.php:3671
* @route '/pcare/api/mapping/poli'
*/
deleteMappingPoli.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingPoli.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3721
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
* @see app/Http/Controllers/Pcare/PcareController.php:3721
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.url = (options?: RouteQueryOptions) => {
    return getMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3721
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingDokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3721
* @route '/pcare/api/mapping/dokter'
*/
getMappingDokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingDokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3738
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
* @see app/Http/Controllers/Pcare/PcareController.php:3738
* @route '/pcare/api/mapping/dokter'
*/
storeMappingDokter.url = (options?: RouteQueryOptions) => {
    return storeMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3738
* @route '/pcare/api/mapping/dokter'
*/
storeMappingDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3799
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
* @see app/Http/Controllers/Pcare/PcareController.php:3799
* @route '/pcare/api/mapping/dokter'
*/
deleteMappingDokter.url = (options?: RouteQueryOptions) => {
    return deleteMappingDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingDokter
* @see app/Http/Controllers/Pcare/PcareController.php:3799
* @route '/pcare/api/mapping/dokter'
*/
deleteMappingDokter.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingDokter.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3849
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
* @see app/Http/Controllers/Pcare/PcareController.php:3849
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.url = (options?: RouteQueryOptions) => {
    return getMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3849
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMappingObat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3849
* @route '/pcare/api/mapping/obat'
*/
getMappingObat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMappingObat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3865
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
* @see app/Http/Controllers/Pcare/PcareController.php:3865
* @route '/pcare/api/mapping/obat'
*/
storeMappingObat.url = (options?: RouteQueryOptions) => {
    return storeMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::storeMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3865
* @route '/pcare/api/mapping/obat'
*/
storeMappingObat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMappingObat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3926
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
* @see app/Http/Controllers/Pcare/PcareController.php:3926
* @route '/pcare/api/mapping/obat'
*/
deleteMappingObat.url = (options?: RouteQueryOptions) => {
    return deleteMappingObat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteMappingObat
* @see app/Http/Controllers/Pcare/PcareController.php:3926
* @route '/pcare/api/mapping/obat'
*/
deleteMappingObat.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMappingObat.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap'
*/
const getReferensiSrk0a498150a70b48aa4525e6405ac3981f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiSrk0a498150a70b48aa4525e6405ac3981f.url(options),
    method: 'get',
})

getReferensiSrk0a498150a70b48aa4525e6405ac3981f.definition = {
    methods: ["get","head"],
    url: '/pcare/api/srk/rekap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap'
*/
getReferensiSrk0a498150a70b48aa4525e6405ac3981f.url = (options?: RouteQueryOptions) => {
    return getReferensiSrk0a498150a70b48aa4525e6405ac3981f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap'
*/
getReferensiSrk0a498150a70b48aa4525e6405ac3981f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiSrk0a498150a70b48aa4525e6405ac3981f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap'
*/
getReferensiSrk0a498150a70b48aa4525e6405ac3981f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiSrk0a498150a70b48aa4525e6405ac3981f.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap/test'
*/
const getReferensiSrk5f7b803eac4d83b88151e0047f7cc159 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.url(options),
    method: 'get',
})

getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.definition = {
    methods: ["get","head"],
    url: '/pcare/api/srk/rekap/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap/test'
*/
getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.url = (options?: RouteQueryOptions) => {
    return getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap/test'
*/
getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getReferensiSrk
* @see app/Http/Controllers/Pcare/PcareController.php:2879
* @route '/pcare/api/srk/rekap/test'
*/
getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferensiSrk5f7b803eac4d83b88151e0047f7cc159.url(options),
    method: 'head',
})

export const getReferensiSrk = {
    '/pcare/api/srk/rekap': getReferensiSrk0a498150a70b48aa4525e6405ac3981f,
    '/pcare/api/srk/rekap/test': getReferensiSrk5f7b803eac4d83b88151e0047f7cc159,
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:3129
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
* @see app/Http/Controllers/Pcare/PcareController.php:3129
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.url = (options?: RouteQueryOptions) => {
    return pesertaByNik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:3129
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:3129
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kirimKunjunganSehat
* @see app/Http/Controllers/Pcare/PcareController.php:554
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
* @see app/Http/Controllers/Pcare/PcareController.php:554
* @route '/pcare/api/kunjungan-sehat'
*/
kirimKunjunganSehat.url = (options?: RouteQueryOptions) => {
    return kirimKunjunganSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kirimKunjunganSehat
* @see app/Http/Controllers/Pcare/PcareController.php:554
* @route '/pcare/api/kunjungan-sehat'
*/
kirimKunjunganSehat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirimKunjunganSehat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1472
* @route '/pcare/api/monitoring/summary'
*/
export const monitoringSummary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringSummary.url(options),
    method: 'get',
})

monitoringSummary.definition = {
    methods: ["get","head"],
    url: '/pcare/api/monitoring/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1472
* @route '/pcare/api/monitoring/summary'
*/
monitoringSummary.url = (options?: RouteQueryOptions) => {
    return monitoringSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1472
* @route '/pcare/api/monitoring/summary'
*/
monitoringSummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringSummary.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1472
* @route '/pcare/api/monitoring/summary'
*/
monitoringSummary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoringSummary.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringAttempts
* @see app/Http/Controllers/Pcare/PcareController.php:1569
* @route '/pcare/api/monitoring/attempts'
*/
export const monitoringAttempts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringAttempts.url(options),
    method: 'get',
})

monitoringAttempts.definition = {
    methods: ["get","head"],
    url: '/pcare/api/monitoring/attempts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringAttempts
* @see app/Http/Controllers/Pcare/PcareController.php:1569
* @route '/pcare/api/monitoring/attempts'
*/
monitoringAttempts.url = (options?: RouteQueryOptions) => {
    return monitoringAttempts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringAttempts
* @see app/Http/Controllers/Pcare/PcareController.php:1569
* @route '/pcare/api/monitoring/attempts'
*/
monitoringAttempts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringAttempts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringAttempts
* @see app/Http/Controllers/Pcare/PcareController.php:1569
* @route '/pcare/api/monitoring/attempts'
*/
monitoringAttempts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoringAttempts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
export const pendaftaranSummary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendaftaranSummary.url(options),
    method: 'get',
})

pendaftaranSummary.definition = {
    methods: ["get","head"],
    url: '/pcare/api/pendaftaran/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
pendaftaranSummary.url = (options?: RouteQueryOptions) => {
    return pendaftaranSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
pendaftaranSummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendaftaranSummary.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranSummary
* @see app/Http/Controllers/Pcare/PcareController.php:1541
* @route '/pcare/api/pendaftaran/summary'
*/
pendaftaranSummary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pendaftaranSummary.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranList
* @see app/Http/Controllers/Pcare/PcareController.php:1819
* @route '/pcare/api/pendaftaran/list'
*/
export const pendaftaranList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendaftaranList.url(options),
    method: 'get',
})

pendaftaranList.definition = {
    methods: ["get","head"],
    url: '/pcare/api/pendaftaran/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranList
* @see app/Http/Controllers/Pcare/PcareController.php:1819
* @route '/pcare/api/pendaftaran/list'
*/
pendaftaranList.url = (options?: RouteQueryOptions) => {
    return pendaftaranList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranList
* @see app/Http/Controllers/Pcare/PcareController.php:1819
* @route '/pcare/api/pendaftaran/list'
*/
pendaftaranList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendaftaranList.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pendaftaranList
* @see app/Http/Controllers/Pcare/PcareController.php:1819
* @route '/pcare/api/pendaftaran/list'
*/
pendaftaranList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pendaftaranList.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringRaw
* @see app/Http/Controllers/Pcare/PcareController.php:1899
* @route '/pcare/api/monitoring/raw/{no_rawat}'
*/
export const monitoringRaw = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringRaw.url(args, options),
    method: 'get',
})

monitoringRaw.definition = {
    methods: ["get","head"],
    url: '/pcare/api/monitoring/raw/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringRaw
* @see app/Http/Controllers/Pcare/PcareController.php:1899
* @route '/pcare/api/monitoring/raw/{no_rawat}'
*/
monitoringRaw.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return monitoringRaw.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringRaw
* @see app/Http/Controllers/Pcare/PcareController.php:1899
* @route '/pcare/api/monitoring/raw/{no_rawat}'
*/
monitoringRaw.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringRaw.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::monitoringRaw
* @see app/Http/Controllers/Pcare/PcareController.php:1899
* @route '/pcare/api/monitoring/raw/{no_rawat}'
*/
monitoringRaw.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoringRaw.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogList
* @see app/Http/Controllers/Pcare/PcareController.php:1690
* @route '/pcare/api/bpjs-log/list'
*/
export const bpjsLogList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bpjsLogList.url(options),
    method: 'get',
})

bpjsLogList.definition = {
    methods: ["get","head"],
    url: '/pcare/api/bpjs-log/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogList
* @see app/Http/Controllers/Pcare/PcareController.php:1690
* @route '/pcare/api/bpjs-log/list'
*/
bpjsLogList.url = (options?: RouteQueryOptions) => {
    return bpjsLogList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogList
* @see app/Http/Controllers/Pcare/PcareController.php:1690
* @route '/pcare/api/bpjs-log/list'
*/
bpjsLogList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bpjsLogList.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogList
* @see app/Http/Controllers/Pcare/PcareController.php:1690
* @route '/pcare/api/bpjs-log/list'
*/
bpjsLogList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bpjsLogList.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1769
* @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
*/
export const bpjsLogByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bpjsLogByRawat.url(args, options),
    method: 'get',
})

bpjsLogByRawat.definition = {
    methods: ["get","head"],
    url: '/pcare/api/bpjs-log/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1769
* @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
*/
bpjsLogByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return bpjsLogByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1769
* @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
*/
bpjsLogByRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bpjsLogByRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::bpjsLogByRawat
* @see app/Http/Controllers/Pcare/PcareController.php:1769
* @route '/pcare/api/bpjs-log/rawat/{no_rawat}'
*/
bpjsLogByRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bpjsLogByRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::resendByNoRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2059
* @route '/pcare/api/resend/{no_rawat}'
*/
export const resendByNoRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendByNoRawat.url(args, options),
    method: 'post',
})

resendByNoRawat.definition = {
    methods: ["post"],
    url: '/pcare/api/resend/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::resendByNoRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2059
* @route '/pcare/api/resend/{no_rawat}'
*/
resendByNoRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return resendByNoRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::resendByNoRawat
* @see app/Http/Controllers/Pcare/PcareController.php:2059
* @route '/pcare/api/resend/{no_rawat}'
*/
resendByNoRawat.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendByNoRawat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::massSend
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
export const massSend = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: massSend.url(options),
    method: 'post',
})

massSend.definition = {
    methods: ["post"],
    url: '/pcare/api/mass-send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::massSend
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
massSend.url = (options?: RouteQueryOptions) => {
    return massSend.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::massSend
* @see app/Http/Controllers/Pcare/PcareController.php:2070
* @route '/pcare/api/mass-send'
*/
massSend.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: massSend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:381
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
* @see app/Http/Controllers/Pcare/PcareController.php:381
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
* @see app/Http/Controllers/Pcare/PcareController.php:381
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:381
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPeserta.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:3154
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
* @see app/Http/Controllers/Pcare/PcareController.php:3154
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
* @see app/Http/Controllers/Pcare/PcareController.php:3154
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.get = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getClubProlanis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:3154
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.head = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getClubProlanis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3193
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
* @see app/Http/Controllers/Pcare/PcareController.php:3193
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
* @see app/Http/Controllers/Pcare/PcareController.php:3193
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.get = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3193
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.head = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3235
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
* @see app/Http/Controllers/Pcare/PcareController.php:3235
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return addKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3235
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKegiatanKelompok.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3323
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
* @see app/Http/Controllers/Pcare/PcareController.php:3323
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return updateKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3323
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKegiatanKelompok.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:3413
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
* @see app/Http/Controllers/Pcare/PcareController.php:3413
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
* @see app/Http/Controllers/Pcare/PcareController.php:3413
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
deleteKegiatanKelompok.delete = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteKegiatanKelompok.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:3476
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
* @see app/Http/Controllers/Pcare/PcareController.php:3476
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
* @see app/Http/Controllers/Pcare/PcareController.php:3476
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.get = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:3476
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.head = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:3442
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
* @see app/Http/Controllers/Pcare/PcareController.php:3442
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.url = (options?: RouteQueryOptions) => {
    return addPesertaKegiatan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:3442
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPesertaKegiatan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:3502
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
* @see app/Http/Controllers/Pcare/PcareController.php:3502
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
* @see app/Http/Controllers/Pcare/PcareController.php:3502
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
deletePesertaKegiatan.delete = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePesertaKegiatan.url(args, options),
    method: 'delete',
})

const PcareController = { getDiagnosa, ping, proxy, getDokter, getFaskes, getPoli, getKesadaran, getDpho, getTindakan, getProvider, getSpesialis, getSubSpesialis, getSarana, getKhusus, getPrognosa, getAlergi, getStatusPulang, getFaskesRujukanSubSpesialis, pesertaByNoKartu, addPendaftaran, deletePendaftaran, getPendaftaranByRawat, getRujukanSubspesialisByRawat, getKabupatenConfig, searchDokterRs, searchPoliklinikRs, searchObatRs, getMappingPoli, storeMappingPoli, deleteMappingPoli, getMappingDokter, storeMappingDokter, deleteMappingDokter, getMappingObat, storeMappingObat, deleteMappingObat, getReferensiSrk, pesertaByNik, kirimKunjunganSehat, monitoringSummary, monitoringAttempts, pendaftaranSummary, pendaftaranList, monitoringRaw, bpjsLogList, bpjsLogByRawat, resendByNoRawat, massSend, getPeserta, getClubProlanis, getKegiatanKelompok, addKegiatanKelompok, updateKegiatanKelompok, deleteKegiatanKelompok, getPesertaKegiatan, addPesertaKegiatan, deletePesertaKegiatan }

export default PcareController