import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import mobilejkn from './mobilejkn'
/**
<<<<<<< HEAD
* @see routes/web.php:1215
=======
* @see routes/web.php:1442
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/diagnosa'
*/
export const diagnosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

diagnosa.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1215
=======
* @see routes/web.php:1442
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.url = (options?: RouteQueryOptions) => {
    return diagnosa.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1215
=======
* @see routes/web.php:1442
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diagnosa.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1215
=======
* @see routes/web.php:1442
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/diagnosa'
*/
diagnosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diagnosa.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1220
=======
* @see routes/web.php:1447
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1220
=======
* @see routes/web.php:1447
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1220
=======
* @see routes/web.php:1447
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1220
=======
* @see routes/web.php:1447
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1225
=======
* @see routes/web.php:1452
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/poli',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1225
=======
* @see routes/web.php:1452
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1225
=======
* @see routes/web.php:1452
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1225
=======
* @see routes/web.php:1452
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1230
=======
* @see routes/web.php:1457
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/kesadaran'
*/
export const kesadaran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

kesadaran.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/kesadaran',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1230
=======
* @see routes/web.php:1457
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.url = (options?: RouteQueryOptions) => {
    return kesadaran.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1230
=======
* @see routes/web.php:1457
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kesadaran.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1230
=======
* @see routes/web.php:1457
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/kesadaran'
*/
kesadaran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kesadaran.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1235
=======
* @see routes/web.php:1462
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/prognosa'
*/
export const prognosa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prognosa.url(options),
    method: 'get',
})

prognosa.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/prognosa',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1235
=======
* @see routes/web.php:1462
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/prognosa'
*/
prognosa.url = (options?: RouteQueryOptions) => {
    return prognosa.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1235
=======
* @see routes/web.php:1462
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/prognosa'
*/
prognosa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prognosa.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1235
=======
* @see routes/web.php:1462
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/prognosa'
*/
prognosa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prognosa.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1240
=======
* @see routes/web.php:1467
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/tindakan'
*/
export const tindakan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tindakan.url(options),
    method: 'get',
})

tindakan.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1240
=======
* @see routes/web.php:1467
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/tindakan'
*/
tindakan.url = (options?: RouteQueryOptions) => {
    return tindakan.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1240
=======
* @see routes/web.php:1467
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/tindakan'
*/
tindakan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tindakan.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1240
=======
* @see routes/web.php:1467
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/tindakan'
*/
tindakan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tindakan.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1245
=======
* @see routes/web.php:1472
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dpho'
*/
export const dpho = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

dpho.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/dpho',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1245
=======
* @see routes/web.php:1472
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dpho'
*/
dpho.url = (options?: RouteQueryOptions) => {
    return dpho.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1245
=======
* @see routes/web.php:1472
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dpho'
*/
dpho.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dpho.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1245
=======
* @see routes/web.php:1472
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/dpho'
*/
dpho.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dpho.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1250
=======
* @see routes/web.php:1477
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/provider'
*/
export const provider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

provider.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/provider',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1250
=======
* @see routes/web.php:1477
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/provider'
*/
provider.url = (options?: RouteQueryOptions) => {
    return provider.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1250
=======
* @see routes/web.php:1477
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/provider'
*/
provider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provider.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1250
=======
* @see routes/web.php:1477
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/provider'
*/
provider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provider.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1255
=======
* @see routes/web.php:1482
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/spesialis'
*/
export const spesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

spesialis.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1255
=======
* @see routes/web.php:1482
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/spesialis'
*/
spesialis.url = (options?: RouteQueryOptions) => {
    return spesialis.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1255
=======
* @see routes/web.php:1482
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/spesialis'
*/
spesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: spesialis.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1255
=======
* @see routes/web.php:1482
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/spesialis'
*/
spesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: spesialis.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1260
=======
* @see routes/web.php:1487
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/subspesialis'
*/
export const subspesialis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(options),
    method: 'get',
})

subspesialis.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/subspesialis',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1260
=======
* @see routes/web.php:1487
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/subspesialis'
*/
subspesialis.url = (options?: RouteQueryOptions) => {
    return subspesialis.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1260
=======
* @see routes/web.php:1487
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/subspesialis'
*/
subspesialis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1260
=======
* @see routes/web.php:1487
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/subspesialis'
*/
subspesialis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subspesialis.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1265
=======
* @see routes/web.php:1492
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/sarana'
*/
export const sarana = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sarana.url(options),
    method: 'get',
})

sarana.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/sarana',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1265
=======
* @see routes/web.php:1492
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/sarana'
*/
sarana.url = (options?: RouteQueryOptions) => {
    return sarana.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1265
=======
* @see routes/web.php:1492
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/sarana'
*/
sarana.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sarana.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1265
=======
* @see routes/web.php:1492
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/sarana'
*/
sarana.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sarana.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1270
=======
* @see routes/web.php:1497
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/khusus'
*/
export const khusus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: khusus.url(options),
    method: 'get',
})

khusus.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/khusus',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1270
=======
* @see routes/web.php:1497
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/khusus'
*/
khusus.url = (options?: RouteQueryOptions) => {
    return khusus.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1270
=======
* @see routes/web.php:1497
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/khusus'
*/
khusus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: khusus.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1270
=======
* @see routes/web.php:1497
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/khusus'
*/
khusus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: khusus.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1275
=======
* @see routes/web.php:1502
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/alergi'
*/
export const alergi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergi.url(options),
    method: 'get',
})

alergi.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/alergi',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1275
=======
* @see routes/web.php:1502
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/alergi'
*/
alergi.url = (options?: RouteQueryOptions) => {
    return alergi.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1275
=======
* @see routes/web.php:1502
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/alergi'
*/
alergi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergi.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1275
=======
* @see routes/web.php:1502
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/alergi'
*/
alergi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alergi.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1280
=======
* @see routes/web.php:1507
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/statuspulang'
*/
export const statuspulang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statuspulang.url(options),
    method: 'get',
})

statuspulang.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/statuspulang',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1280
=======
* @see routes/web.php:1507
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/statuspulang'
*/
statuspulang.url = (options?: RouteQueryOptions) => {
    return statuspulang.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1280
=======
* @see routes/web.php:1507
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/statuspulang'
*/
statuspulang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statuspulang.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1280
=======
* @see routes/web.php:1507
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/statuspulang'
*/
statuspulang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statuspulang.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1285
=======
* @see routes/web.php:1512
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/faskes-rujukan'
*/
export const faskesRujukan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faskesRujukan.url(options),
    method: 'get',
})

faskesRujukan.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi/faskes-rujukan',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1285
=======
* @see routes/web.php:1512
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/faskes-rujukan'
*/
faskesRujukan.url = (options?: RouteQueryOptions) => {
    return faskesRujukan.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1285
=======
* @see routes/web.php:1512
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/faskes-rujukan'
*/
faskesRujukan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faskesRujukan.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1285
=======
* @see routes/web.php:1512
>>>>>>> d469a398 (Odontogram)
* @route '/pcare/referensi/faskes-rujukan'
*/
faskesRujukan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faskesRujukan.url(options),
    method: 'head',
})

const referensi = {
    diagnosa: Object.assign(diagnosa, diagnosa),
    dokter: Object.assign(dokter, dokter),
    poli: Object.assign(poli, poli),
    kesadaran: Object.assign(kesadaran, kesadaran),
    prognosa: Object.assign(prognosa, prognosa),
    tindakan: Object.assign(tindakan, tindakan),
    dpho: Object.assign(dpho, dpho),
    provider: Object.assign(provider, provider),
    spesialis: Object.assign(spesialis, spesialis),
    subspesialis: Object.assign(subspesialis, subspesialis),
    sarana: Object.assign(sarana, sarana),
    khusus: Object.assign(khusus, khusus),
    alergi: Object.assign(alergi, alergi),
    statuspulang: Object.assign(statuspulang, statuspulang),
    faskesRujukan: Object.assign(faskesRujukan, faskesRujukan),
    mobilejkn: Object.assign(mobilejkn, mobilejkn),
}

export default referensi