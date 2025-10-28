import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import referensi from './referensi'
import layanan from './layanan'
import kelompok from './kelompok'
import diagnosa from './diagnosa'
import dokter from './dokter'
import poli from './poli'
import tindakan from './tindakan'
import peserta from './peserta'
import setting from './setting'
/**
* @see routes/web.php:359
* @route '/pcare'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pcare',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:359
* @route '/pcare'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:359
* @route '/pcare'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:359
* @route '/pcare'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const pcare = {
    index: Object.assign(index, index),
    referensi: Object.assign(referensi, referensi),
    layanan: Object.assign(layanan, layanan),
    kelompok: Object.assign(kelompok, kelompok),
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    tindakan: Object.assign(tindakan, tindakan),
    peserta: Object.assign(peserta, peserta),
    setting: Object.assign(setting, setting),
}

export default pcare