import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:22
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
* @see app/Http/Controllers/Pcare/PcareController.php:22
* @route '/api/pcare/ping'
*/
ping.url = (options?: RouteQueryOptions) => {
    return ping.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:22
* @route '/api/pcare/ping'
*/
ping.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::ping
* @see app/Http/Controllers/Pcare/PcareController.php:22
* @route '/api/pcare/ping'
*/
ping.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ping.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:43
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
* @see app/Http/Controllers/Pcare/PcareController.php:43
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
* @see app/Http/Controllers/Pcare/PcareController.php:43
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.get = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proxy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:43
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.post = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proxy.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:43
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.put = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: proxy.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:43
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.delete = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: proxy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::proxy
* @see app/Http/Controllers/Pcare/PcareController.php:43
* @route '/api/pcare/proxy/{endpoint}'
*/
proxy.head = (args: { endpoint: string | number } | [endpoint: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proxy.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
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
* @see app/Http/Controllers/Pcare/PcareController.php:70
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.url = (options?: RouteQueryOptions) => {
    return getDokterca5945421beecfede6d16185319e6459.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
* @route '/api/pcare/dokter'
*/
getDokterca5945421beecfede6d16185319e6459.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDokterca5945421beecfede6d16185319e6459.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
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
* @see app/Http/Controllers/Pcare/PcareController.php:70
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.url = (options?: RouteQueryOptions) => {
    return getDokter8d2dff60a18c4591d77b87e52d5e4999.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
* @route '/pcare/api/dokter'
*/
getDokter8d2dff60a18c4591d77b87e52d5e4999.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDokter8d2dff60a18c4591d77b87e52d5e4999.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDokter
* @see app/Http/Controllers/Pcare/PcareController.php:70
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
* @see app/Http/Controllers/Pcare/PcareController.php:86
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
* @see app/Http/Controllers/Pcare/PcareController.php:86
* @route '/api/pcare/faskes'
*/
getFaskes.url = (options?: RouteQueryOptions) => {
    return getFaskes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:86
* @route '/api/pcare/faskes'
*/
getFaskes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskes
* @see app/Http/Controllers/Pcare/PcareController.php:86
* @route '/api/pcare/faskes'
*/
getFaskes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
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
* @see app/Http/Controllers/Pcare/PcareController.php:102
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.url = (options?: RouteQueryOptions) => {
    return getPoli703bacfc6bd9d70800508f5d768683d4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
* @route '/api/pcare/poli'
*/
getPoli703bacfc6bd9d70800508f5d768683d4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPoli703bacfc6bd9d70800508f5d768683d4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
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
* @see app/Http/Controllers/Pcare/PcareController.php:102
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.url = (options?: RouteQueryOptions) => {
    return getPoliba0dd418727a662ea51949e786965266.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
* @route '/pcare/api/poli'
*/
getPoliba0dd418727a662ea51949e786965266.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPoliba0dd418727a662ea51949e786965266.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPoli
* @see app/Http/Controllers/Pcare/PcareController.php:102
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
* @see app/Http/Controllers/Pcare/PcareController.php:119
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
* @see app/Http/Controllers/Pcare/PcareController.php:119
* @route '/api/pcare/kesadaran'
*/
getKesadaran.url = (options?: RouteQueryOptions) => {
    return getKesadaran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:119
* @route '/api/pcare/kesadaran'
*/
getKesadaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKesadaran.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:119
* @route '/api/pcare/kesadaran'
*/
getKesadaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKesadaran.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:230
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
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/dpho'
*/
getDpho.url = (options?: RouteQueryOptions) => {
    return getDpho.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/dpho'
*/
getDpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:230
* @route '/api/pcare/dpho'
*/
getDpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDpho.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
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
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url = (options?: RouteQueryOptions) => {
    return getTindakanf3204ee63d2491d40fdcb6b4497e21c7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/tindakan'
*/
getTindakanf3204ee63d2491d40fdcb6b4497e21c7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTindakanf3204ee63d2491d40fdcb6b4497e21c7.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
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
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url = (options?: RouteQueryOptions) => {
    return getTindakan9af2a269b8bedaa7030c0f00a75b17bb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/pcare/api/tindakan'
*/
getTindakan9af2a269b8bedaa7030c0f00a75b17bb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTindakan9af2a269b8bedaa7030c0f00a75b17bb.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getTindakan
* @see app/Http/Controllers/Pcare/PcareController.php:253
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
* @see app/Http/Controllers/Pcare/PcareController.php:294
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
* @see app/Http/Controllers/Pcare/PcareController.php:294
* @route '/api/pcare/provider'
*/
getProvider.url = (options?: RouteQueryOptions) => {
    return getProvider.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:294
* @route '/api/pcare/provider'
*/
getProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:294
* @route '/api/pcare/provider'
*/
getProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvider.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:311
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
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/api/pcare/spesialis'
*/
getSpesialis.url = (options?: RouteQueryOptions) => {
    return getSpesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/api/pcare/spesialis'
*/
getSpesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:311
* @route '/api/pcare/spesialis'
*/
getSpesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSpesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:327
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
* @see app/Http/Controllers/Pcare/PcareController.php:327
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.url = (options?: RouteQueryOptions) => {
    return getSubSpesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:327
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSubSpesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:327
* @route '/api/pcare/spesialis/subspesialis'
*/
getSubSpesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSubSpesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:349
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
* @see app/Http/Controllers/Pcare/PcareController.php:349
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.url = (options?: RouteQueryOptions) => {
    return getSarana.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:349
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSarana.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSarana
* @see app/Http/Controllers/Pcare/PcareController.php:349
* @route '/api/pcare/spesialis/sarana'
*/
getSarana.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSarana.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:364
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
* @see app/Http/Controllers/Pcare/PcareController.php:364
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.url = (options?: RouteQueryOptions) => {
    return getKhusus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:364
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKhusus.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKhusus
* @see app/Http/Controllers/Pcare/PcareController.php:364
* @route '/api/pcare/spesialis/khusus'
*/
getKhusus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKhusus.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:412
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
* @see app/Http/Controllers/Pcare/PcareController.php:412
* @route '/api/pcare/prognosa'
*/
getPrognosa.url = (options?: RouteQueryOptions) => {
    return getPrognosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:412
* @route '/api/pcare/prognosa'
*/
getPrognosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPrognosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPrognosa
* @see app/Http/Controllers/Pcare/PcareController.php:412
* @route '/api/pcare/prognosa'
*/
getPrognosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPrognosa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:380
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
* @see app/Http/Controllers/Pcare/PcareController.php:380
* @route '/api/pcare/alergi'
*/
getAlergi.url = (options?: RouteQueryOptions) => {
    return getAlergi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:380
* @route '/api/pcare/alergi'
*/
getAlergi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlergi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getAlergi
* @see app/Http/Controllers/Pcare/PcareController.php:380
* @route '/api/pcare/alergi'
*/
getAlergi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlergi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:428
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
* @see app/Http/Controllers/Pcare/PcareController.php:428
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.url = (options?: RouteQueryOptions) => {
    return getStatusPulang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:428
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatusPulang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getStatusPulang
* @see app/Http/Controllers/Pcare/PcareController.php:428
* @route '/api/pcare/statuspulang'
*/
getStatusPulang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatusPulang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:448
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
* @see app/Http/Controllers/Pcare/PcareController.php:448
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
* @see app/Http/Controllers/Pcare/PcareController.php:448
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis.get = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFaskesRujukanSubSpesialis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getFaskesRujukanSubSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:448
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
getFaskesRujukanSubSpesialis.head = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFaskesRujukanSubSpesialis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
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
* @see app/Http/Controllers/Pcare/PcareController.php:134
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
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartucb059312c5e60a47467e92dea3abfd2b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
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
* @see app/Http/Controllers/Pcare/PcareController.php:134
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
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/pcare/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}'
*/
pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartud24fc36189df31f5571f5a4c0711693d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
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
* @see \App\Http\Controllers\Pcare\PcareController::daftarKunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:173
* @route '/api/pcare/kunjungan'
*/
export const daftarKunjungan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: daftarKunjungan.url(options),
    method: 'post',
})

daftarKunjungan.definition = {
    methods: ["post"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::daftarKunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:173
* @route '/api/pcare/kunjungan'
*/
daftarKunjungan.url = (options?: RouteQueryOptions) => {
    return daftarKunjungan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::daftarKunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:173
* @route '/api/pcare/kunjungan'
*/
daftarKunjungan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: daftarKunjungan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:190
* @route '/pcare/api/diagnosa'
*/
export const getDiagnosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosa.url(options),
    method: 'get',
})

getDiagnosa.definition = {
    methods: ["get","head"],
    url: '/pcare/api/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:190
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.url = (options?: RouteQueryOptions) => {
    return getDiagnosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:190
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:190
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:470
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
* @see app/Http/Controllers/Pcare/PcareController.php:470
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.url = (options?: RouteQueryOptions) => {
    return pesertaByNik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:470
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNik.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNik
* @see app/Http/Controllers/Pcare/PcareController.php:470
* @route '/pcare/api/peserta/nik'
*/
pesertaByNik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNik.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:149
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
* @see app/Http/Controllers/Pcare/PcareController.php:149
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
* @see app/Http/Controllers/Pcare/PcareController.php:149
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.get = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPeserta.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPeserta
* @see app/Http/Controllers/Pcare/PcareController.php:149
* @route '/pcare/api/peserta/{noka}'
*/
getPeserta.head = (args: { noka: string | number } | [noka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPeserta.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:495
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
* @see app/Http/Controllers/Pcare/PcareController.php:495
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
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.get = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getClubProlanis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getClubProlanis
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
getClubProlanis.head = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getClubProlanis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:534
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
* @see app/Http/Controllers/Pcare/PcareController.php:534
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
* @see app/Http/Controllers/Pcare/PcareController.php:534
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.get = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:534
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
getKegiatanKelompok.head = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKegiatanKelompok.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:576
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
* @see app/Http/Controllers/Pcare/PcareController.php:576
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return addKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:576
* @route '/pcare/api/kelompok/kegiatan'
*/
addKegiatanKelompok.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKegiatanKelompok.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:664
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
* @see app/Http/Controllers/Pcare/PcareController.php:664
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.url = (options?: RouteQueryOptions) => {
    return updateKegiatanKelompok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::updateKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:664
* @route '/pcare/api/kelompok/kegiatan'
*/
updateKegiatanKelompok.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateKegiatanKelompok.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deleteKegiatanKelompok
* @see app/Http/Controllers/Pcare/PcareController.php:754
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
* @see app/Http/Controllers/Pcare/PcareController.php:754
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
* @see app/Http/Controllers/Pcare/PcareController.php:754
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
deleteKegiatanKelompok.delete = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteKegiatanKelompok.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:817
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
* @see app/Http/Controllers/Pcare/PcareController.php:817
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
* @see app/Http/Controllers/Pcare/PcareController.php:817
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.get = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:817
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
getPesertaKegiatan.head = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPesertaKegiatan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:783
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
* @see app/Http/Controllers/Pcare/PcareController.php:783
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.url = (options?: RouteQueryOptions) => {
    return addPesertaKegiatan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::addPesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:783
* @route '/pcare/api/kelompok/peserta'
*/
addPesertaKegiatan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPesertaKegiatan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::deletePesertaKegiatan
* @see app/Http/Controllers/Pcare/PcareController.php:843
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
* @see app/Http/Controllers/Pcare/PcareController.php:843
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
* @see app/Http/Controllers/Pcare/PcareController.php:843
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
deletePesertaKegiatan.delete = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePesertaKegiatan.url(args, options),
    method: 'delete',
})

const PcareController = { ping, proxy, getDokter, getFaskes, getPoli, getKesadaran, getDpho, getTindakan, getProvider, getSpesialis, getSubSpesialis, getSarana, getKhusus, getPrognosa, getAlergi, getStatusPulang, getFaskesRujukanSubSpesialis, pesertaByNoKartu, daftarKunjungan, getDiagnosa, pesertaByNik, getPeserta, getClubProlanis, getKegiatanKelompok, addKegiatanKelompok, updateKegiatanKelompok, deleteKegiatanKelompok, getPesertaKegiatan, addPesertaKegiatan, deletePesertaKegiatan }

export default PcareController