import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:1099
* @route '/keuangan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/keuangan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1099
* @route '/keuangan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1099
* @route '/keuangan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1099
* @route '/keuangan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1104
* @route '/keuangan/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/keuangan/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1104
* @route '/keuangan/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1104
* @route '/keuangan/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1104
* @route '/keuangan/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1109
* @route '/keuangan/laporan-keuangan'
*/
export const laporanKeuangan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: laporanKeuangan.url(options),
    method: 'get',
})

laporanKeuangan.definition = {
    methods: ["get","head"],
    url: '/keuangan/laporan-keuangan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1109
* @route '/keuangan/laporan-keuangan'
*/
laporanKeuangan.url = (options?: RouteQueryOptions) => {
    return laporanKeuangan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1109
* @route '/keuangan/laporan-keuangan'
*/
laporanKeuangan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: laporanKeuangan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1109
* @route '/keuangan/laporan-keuangan'
*/
laporanKeuangan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: laporanKeuangan.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1114
* @route '/keuangan/kas-bank'
*/
export const kasBank = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasBank.url(options),
    method: 'get',
})

kasBank.definition = {
    methods: ["get","head"],
    url: '/keuangan/kas-bank',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1114
* @route '/keuangan/kas-bank'
*/
kasBank.url = (options?: RouteQueryOptions) => {
    return kasBank.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1114
* @route '/keuangan/kas-bank'
*/
kasBank.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasBank.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1114
* @route '/keuangan/kas-bank'
*/
kasBank.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kasBank.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1119
* @route '/keuangan/piutang'
*/
export const piutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: piutang.url(options),
    method: 'get',
})

piutang.definition = {
    methods: ["get","head"],
    url: '/keuangan/piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1119
* @route '/keuangan/piutang'
*/
piutang.url = (options?: RouteQueryOptions) => {
    return piutang.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1119
* @route '/keuangan/piutang'
*/
piutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: piutang.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1119
* @route '/keuangan/piutang'
*/
piutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: piutang.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1124
* @route '/keuangan/hutang'
*/
export const hutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hutang.url(options),
    method: 'get',
})

hutang.definition = {
    methods: ["get","head"],
    url: '/keuangan/hutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1124
* @route '/keuangan/hutang'
*/
hutang.url = (options?: RouteQueryOptions) => {
    return hutang.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1124
* @route '/keuangan/hutang'
*/
hutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hutang.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1124
* @route '/keuangan/hutang'
*/
hutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hutang.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1129
* @route '/keuangan/jurnal-umum'
*/
export const jurnalUmum = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jurnalUmum.url(options),
    method: 'get',
})

jurnalUmum.definition = {
    methods: ["get","head"],
    url: '/keuangan/jurnal-umum',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1129
* @route '/keuangan/jurnal-umum'
*/
jurnalUmum.url = (options?: RouteQueryOptions) => {
    return jurnalUmum.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1129
* @route '/keuangan/jurnal-umum'
*/
jurnalUmum.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jurnalUmum.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1129
* @route '/keuangan/jurnal-umum'
*/
jurnalUmum.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jurnalUmum.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1134
* @route '/keuangan/buku-besar'
*/
export const bukuBesar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bukuBesar.url(options),
    method: 'get',
})

bukuBesar.definition = {
    methods: ["get","head"],
    url: '/keuangan/buku-besar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1134
* @route '/keuangan/buku-besar'
*/
bukuBesar.url = (options?: RouteQueryOptions) => {
    return bukuBesar.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1134
* @route '/keuangan/buku-besar'
*/
bukuBesar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bukuBesar.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1134
* @route '/keuangan/buku-besar'
*/
bukuBesar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bukuBesar.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1139
* @route '/keuangan/neraca'
*/
export const neraca = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: neraca.url(options),
    method: 'get',
})

neraca.definition = {
    methods: ["get","head"],
    url: '/keuangan/neraca',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1139
* @route '/keuangan/neraca'
*/
neraca.url = (options?: RouteQueryOptions) => {
    return neraca.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1139
* @route '/keuangan/neraca'
*/
neraca.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: neraca.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1139
* @route '/keuangan/neraca'
*/
neraca.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: neraca.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1144
* @route '/keuangan/laba-rugi'
*/
export const labaRugi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labaRugi.url(options),
    method: 'get',
})

labaRugi.definition = {
    methods: ["get","head"],
    url: '/keuangan/laba-rugi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1144
* @route '/keuangan/laba-rugi'
*/
labaRugi.url = (options?: RouteQueryOptions) => {
    return labaRugi.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1144
* @route '/keuangan/laba-rugi'
*/
labaRugi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labaRugi.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1144
* @route '/keuangan/laba-rugi'
*/
labaRugi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: labaRugi.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1149
* @route '/keuangan/chart-accounts'
*/
export const chartAccounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartAccounts.url(options),
    method: 'get',
})

chartAccounts.definition = {
    methods: ["get","head"],
    url: '/keuangan/chart-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1149
* @route '/keuangan/chart-accounts'
*/
chartAccounts.url = (options?: RouteQueryOptions) => {
    return chartAccounts.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1149
* @route '/keuangan/chart-accounts'
*/
chartAccounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartAccounts.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1149
* @route '/keuangan/chart-accounts'
*/
chartAccounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: chartAccounts.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1153
* @route '/keuangan/mata-uang'
*/
export const mataUang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mataUang.url(options),
    method: 'get',
})

mataUang.definition = {
    methods: ["get","head"],
    url: '/keuangan/mata-uang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1153
* @route '/keuangan/mata-uang'
*/
mataUang.url = (options?: RouteQueryOptions) => {
    return mataUang.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1153
* @route '/keuangan/mata-uang'
*/
mataUang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mataUang.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1153
* @route '/keuangan/mata-uang'
*/
mataUang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mataUang.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1157
* @route '/keuangan/pajak'
*/
export const pajak = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pajak.url(options),
    method: 'get',
})

pajak.definition = {
    methods: ["get","head"],
    url: '/keuangan/pajak',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1157
* @route '/keuangan/pajak'
*/
pajak.url = (options?: RouteQueryOptions) => {
    return pajak.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1157
* @route '/keuangan/pajak'
*/
pajak.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pajak.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1157
* @route '/keuangan/pajak'
*/
pajak.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pajak.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1161
* @route '/keuangan/kas-masuk'
*/
export const kasMasuk = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasMasuk.url(options),
    method: 'get',
})

kasMasuk.definition = {
    methods: ["get","head"],
    url: '/keuangan/kas-masuk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1161
* @route '/keuangan/kas-masuk'
*/
kasMasuk.url = (options?: RouteQueryOptions) => {
    return kasMasuk.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1161
* @route '/keuangan/kas-masuk'
*/
kasMasuk.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasMasuk.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1161
* @route '/keuangan/kas-masuk'
*/
kasMasuk.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kasMasuk.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1165
* @route '/keuangan/kas-keluar'
*/
export const kasKeluar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasKeluar.url(options),
    method: 'get',
})

kasKeluar.definition = {
    methods: ["get","head"],
    url: '/keuangan/kas-keluar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1165
* @route '/keuangan/kas-keluar'
*/
kasKeluar.url = (options?: RouteQueryOptions) => {
    return kasKeluar.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1165
* @route '/keuangan/kas-keluar'
*/
kasKeluar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kasKeluar.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1165
* @route '/keuangan/kas-keluar'
*/
kasKeluar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kasKeluar.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1169
* @route '/keuangan/arus-kas'
*/
export const arusKas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arusKas.url(options),
    method: 'get',
})

arusKas.definition = {
    methods: ["get","head"],
    url: '/keuangan/arus-kas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1169
* @route '/keuangan/arus-kas'
*/
arusKas.url = (options?: RouteQueryOptions) => {
    return arusKas.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1169
* @route '/keuangan/arus-kas'
*/
arusKas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arusKas.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1169
* @route '/keuangan/arus-kas'
*/
arusKas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: arusKas.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1173
* @route '/keuangan/laporan-piutang'
*/
export const laporanPiutang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: laporanPiutang.url(options),
    method: 'get',
})

laporanPiutang.definition = {
    methods: ["get","head"],
    url: '/keuangan/laporan-piutang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1173
* @route '/keuangan/laporan-piutang'
*/
laporanPiutang.url = (options?: RouteQueryOptions) => {
    return laporanPiutang.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1173
* @route '/keuangan/laporan-piutang'
*/
laporanPiutang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: laporanPiutang.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1173
* @route '/keuangan/laporan-piutang'
*/
laporanPiutang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: laporanPiutang.url(options),
    method: 'head',
})

const keuangan = {
    index: Object.assign(index, index),
    dashboard: Object.assign(dashboard, dashboard),
    laporanKeuangan: Object.assign(laporanKeuangan, laporanKeuangan),
    kasBank: Object.assign(kasBank, kasBank),
    piutang: Object.assign(piutang, piutang),
    hutang: Object.assign(hutang, hutang),
    jurnalUmum: Object.assign(jurnalUmum, jurnalUmum),
    bukuBesar: Object.assign(bukuBesar, bukuBesar),
    neraca: Object.assign(neraca, neraca),
    labaRugi: Object.assign(labaRugi, labaRugi),
    chartAccounts: Object.assign(chartAccounts, chartAccounts),
    mataUang: Object.assign(mataUang, mataUang),
    pajak: Object.assign(pajak, pajak),
    kasMasuk: Object.assign(kasMasuk, kasMasuk),
    kasKeluar: Object.assign(kasKeluar, kasKeluar),
    arusKas: Object.assign(arusKas, arusKas),
    laporanPiutang: Object.assign(laporanPiutang, laporanPiutang),
}

export default keuangan