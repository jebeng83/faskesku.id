import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import faskesRujukan from './faskes-rujukan'
import kunjungan from './kunjungan'
import pendaftaran from './pendaftaran'
import rujukSubspesialis from './rujuk-subspesialis'
import config from './config'
/**
* @see \App\Http\Controllers\Pcare\PcareController::diagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
export const diagnosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

diagnosa.definition = {
    methods: ["get","head"],
    url: '/api/pcare/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::diagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
diagnosa.url = (options?: RouteQueryOptions) => {
    return diagnosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::diagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
diagnosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::diagnosa
* @see app/Http/Controllers/Pcare/PcareController.php:2535
* @route '/api/pcare/diagnosa'
*/
diagnosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosa.url(options),
    method: 'head',
})

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
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/api/pcare/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::dokter
* @see app/Http/Controllers/Pcare/PcareController.php:159
* @route '/api/pcare/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::faskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
export const faskes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faskes.url(options),
    method: 'get',
})

faskes.definition = {
    methods: ["get","head"],
    url: '/api/pcare/faskes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::faskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
faskes.url = (options?: RouteQueryOptions) => {
    return faskes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::faskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
faskes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faskes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::faskes
* @see app/Http/Controllers/Pcare/PcareController.php:206
* @route '/api/pcare/faskes'
*/
faskes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faskes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::poli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/api/pcare/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::poli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::poli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::poli
* @see app/Http/Controllers/Pcare/PcareController.php:253
* @route '/api/pcare/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
export const kesadaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

kesadaran.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::kesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
kesadaran.url = (options?: RouteQueryOptions) => {
    return kesadaran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
kesadaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kesadaran
* @see app/Http/Controllers/Pcare/PcareController.php:300
* @route '/api/pcare/kesadaran'
*/
kesadaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kesadaran.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::dpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
export const dpho = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

dpho.definition = {
    methods: ["get","head"],
    url: '/api/pcare/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::dpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
dpho.url = (options?: RouteQueryOptions) => {
    return dpho.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::dpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
dpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::dpho
* @see app/Http/Controllers/Pcare/PcareController.php:2575
* @route '/api/pcare/dpho'
*/
dpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dpho.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::tindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
export const tindakan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tindakan.url(options),
    method: 'get',
})

tindakan.definition = {
    methods: ["get","head"],
    url: '/api/pcare/tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::tindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
tindakan.url = (options?: RouteQueryOptions) => {
    return tindakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::tindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
tindakan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tindakan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::tindakan
* @see app/Http/Controllers/Pcare/PcareController.php:2626
* @route '/api/pcare/tindakan'
*/
tindakan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tindakan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::provider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
export const provider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

provider.definition = {
    methods: ["get","head"],
    url: '/api/pcare/provider',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::provider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
provider.url = (options?: RouteQueryOptions) => {
    return provider.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::provider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
provider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::provider
* @see app/Http/Controllers/Pcare/PcareController.php:2695
* @route '/api/pcare/provider'
*/
provider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provider.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::spesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
export const spesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

spesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::spesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
spesialis.url = (options?: RouteQueryOptions) => {
    return spesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::spesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
spesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::spesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2712
* @route '/api/pcare/spesialis'
*/
spesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: spesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
export const subspesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(options),
    method: 'get',
})

subspesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/subspesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
subspesialis.url = (options?: RouteQueryOptions) => {
    return subspesialis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
subspesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:2728
* @route '/api/pcare/spesialis/subspesialis'
*/
subspesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subspesialis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::sarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
export const sarana = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sarana.url(options),
    method: 'get',
})

sarana.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/sarana',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::sarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
sarana.url = (options?: RouteQueryOptions) => {
    return sarana.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::sarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
sarana.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sarana.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::sarana
* @see app/Http/Controllers/Pcare/PcareController.php:2797
* @route '/api/pcare/spesialis/sarana'
*/
sarana.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sarana.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::khusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
export const khusus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: khusus.url(options),
    method: 'get',
})

khusus.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/khusus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::khusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
khusus.url = (options?: RouteQueryOptions) => {
    return khusus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::khusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
khusus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: khusus.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::khusus
* @see app/Http/Controllers/Pcare/PcareController.php:2812
* @route '/api/pcare/spesialis/khusus'
*/
khusus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: khusus.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::prognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
export const prognosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prognosa.url(options),
    method: 'get',
})

prognosa.definition = {
    methods: ["get","head"],
    url: '/api/pcare/prognosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::prognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
prognosa.url = (options?: RouteQueryOptions) => {
    return prognosa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::prognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
prognosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prognosa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::prognosa
* @see app/Http/Controllers/Pcare/PcareController.php:2860
* @route '/api/pcare/prognosa'
*/
prognosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prognosa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::alergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
export const alergi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergi.url(options),
    method: 'get',
})

alergi.definition = {
    methods: ["get","head"],
    url: '/api/pcare/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::alergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
alergi.url = (options?: RouteQueryOptions) => {
    return alergi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::alergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
alergi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::alergi
* @see app/Http/Controllers/Pcare/PcareController.php:2828
* @route '/api/pcare/alergi'
*/
alergi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alergi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::statuspulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
export const statuspulang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statuspulang.url(options),
    method: 'get',
})

statuspulang.definition = {
    methods: ["get","head"],
    url: '/api/pcare/statuspulang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::statuspulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
statuspulang.url = (options?: RouteQueryOptions) => {
    return statuspulang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::statuspulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
statuspulang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statuspulang.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::statuspulang
* @see app/Http/Controllers/Pcare/PcareController.php:3087
* @route '/api/pcare/statuspulang'
*/
statuspulang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statuspulang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaNokartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
export const pesertaNokartu = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaNokartu.url(args, options),
    method: 'get',
})

pesertaNokartu.definition = {
    methods: ["get","head"],
    url: '/api/pcare/peserta/{noka}/{tglPelayanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaNokartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaNokartu.url = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions) => {
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

    return pesertaNokartu.definition.url
            .replace('{noka}', parsedArgs.noka.toString())
            .replace('{tglPelayanan}', parsedArgs.tglPelayanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaNokartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaNokartu.get = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pesertaNokartu.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::pesertaNokartu
* @see app/Http/Controllers/Pcare/PcareController.php:342
* @route '/api/pcare/peserta/{noka}/{tglPelayanan}'
*/
pesertaNokartu.head = (args: { noka: string | number, tglPelayanan: string | number } | [noka: string | number, tglPelayanan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pesertaNokartu.url(args, options),
    method: 'head',
})

const pcare = {
    diagnosa: Object.assign(diagnosa, diagnosa),
    ping: Object.assign(ping, ping),
    proxy: Object.assign(proxy, proxy),
    dokter: Object.assign(dokter, dokter),
    faskes: Object.assign(faskes, faskes),
    poli: Object.assign(poli, poli),
    kesadaran: Object.assign(kesadaran, kesadaran),
    dpho: Object.assign(dpho, dpho),
    tindakan: Object.assign(tindakan, tindakan),
    provider: Object.assign(provider, provider),
    spesialis: Object.assign(spesialis, spesialis),
    subspesialis: Object.assign(subspesialis, subspesialis),
    sarana: Object.assign(sarana, sarana),
    khusus: Object.assign(khusus, khusus),
    prognosa: Object.assign(prognosa, prognosa),
    alergi: Object.assign(alergi, alergi),
    statuspulang: Object.assign(statuspulang, statuspulang),
    faskesRujukan: Object.assign(faskesRujukan, faskesRujukan),
    pesertaNokartu: Object.assign(pesertaNokartu, pesertaNokartu),
    kunjungan: Object.assign(kunjungan, kunjungan),
    pendaftaran: Object.assign(pendaftaran, pendaftaran),
    rujukSubspesialis: Object.assign(rujukSubspesialis, rujukSubspesialis),
    config: Object.assign(config, config),
}

export default pcare