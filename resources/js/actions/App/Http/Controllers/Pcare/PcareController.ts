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
* @see app/Http/Controllers/Pcare/PcareController.php:205
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
* @see app/Http/Controllers/Pcare/PcareController.php:205
* @route '/api/pcare/dpho'
*/
getDpho.url = (options?: RouteQueryOptions) => {
    return getDpho.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:205
* @route '/api/pcare/dpho'
*/
getDpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDpho.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDpho
* @see app/Http/Controllers/Pcare/PcareController.php:205
* @route '/api/pcare/dpho'
*/
getDpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDpho.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:226
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
* @see app/Http/Controllers/Pcare/PcareController.php:226
* @route '/api/pcare/provider'
*/
getProvider.url = (options?: RouteQueryOptions) => {
    return getProvider.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:226
* @route '/api/pcare/provider'
*/
getProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvider.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getProvider
* @see app/Http/Controllers/Pcare/PcareController.php:226
* @route '/api/pcare/provider'
*/
getProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvider.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:243
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
* @see app/Http/Controllers/Pcare/PcareController.php:243
* @route '/api/pcare/spesialis'
*/
getSpesialis.url = (options?: RouteQueryOptions) => {
    return getSpesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:243
* @route '/api/pcare/spesialis'
*/
getSpesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSpesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getSpesialis
* @see app/Http/Controllers/Pcare/PcareController.php:243
* @route '/api/pcare/spesialis'
*/
getSpesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSpesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
export const pesertaByNoKartu = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartu.url(args, options),
    method: 'get',
})

pesertaByNoKartu.definition = {
    methods: ["get","head"],
    url: '/api/pcare/peserta/{noka}/{tglPelayanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartu.url = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions) => {
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

    return pesertaByNoKartu.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace('{tglPelayanan}', parsedArgs.tglPelayanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartu.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaByNoKartu.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaByNoKartu
* @see app/Http/Controllers/Pcare/PcareController.php:134
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaByNoKartu.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaByNoKartu.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::daftarKunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:148
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
* @see app/Http/Controllers/Pcare/PcareController.php:148
* @route '/api/pcare/kunjungan'
*/
daftarKunjungan.url = (options?: RouteQueryOptions) => {
    return daftarKunjungan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::daftarKunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:148
* @route '/api/pcare/kunjungan'
*/
daftarKunjungan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: daftarKunjungan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:165
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
* @see app/Http/Controllers/Pcare/PcareController.php:165
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.url = (options?: RouteQueryOptions) => {
    return getDiagnosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:165
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::getDiagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:165
* @route '/pcare/api/diagnosa'
*/
getDiagnosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosa.url(options),
    method: 'head',
})

const PcareController = { ping, proxy, getDokter, getFaskes, getPoli, getKesadaran, getDpho, getProvider, getSpesialis, pesertaByNoKartu, daftarKunjungan, getDiagnosa }

export default PcareController