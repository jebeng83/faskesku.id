import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import mapping from './mapping'
import referensi from './referensi'
import layanan from './layanan'
import kelompok from './kelompok'
import diagnosa from './diagnosa'
import dokter from './dokter'
import poli from './poli'
import rs from './rs'
import tindakan from './tindakan'
import peserta from './peserta'
import kunjungan from './kunjungan'
import setting from './setting'
/**
* @see routes/web.php:743
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
* @see routes/web.php:743
* @route '/pcare'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:743
* @route '/pcare'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:743
* @route '/pcare'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const pcare = {
    index: Object.assign(index, index),
    mapping: Object.assign(mapping, mapping),
    referensi: Object.assign(referensi, referensi),
    layanan: Object.assign(layanan, layanan),
    kelompok: Object.assign(kelompok, kelompok),
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    rs: Object.assign(rs, rs),
    tindakan: Object.assign(tindakan, tindakan),
    peserta: Object.assign(peserta, peserta),
    kunjungan: Object.assign(kunjungan, kunjungan),
    setting: Object.assign(setting, setting),
}

export default pcare