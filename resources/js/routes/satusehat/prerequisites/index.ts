import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1485
=======
* @see routes/web.php:1492
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1497
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1502
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1506
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/organization'
*/
export const organization = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

organization.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/organization',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1485
=======
* @see routes/web.php:1492
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1497
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1502
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1506
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/organization'
*/
organization.url = (options?: RouteQueryOptions) => {
    return organization.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1485
=======
* @see routes/web.php:1492
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1497
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1502
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1506
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/organization'
*/
organization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1485
=======
* @see routes/web.php:1492
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1497
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1502
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1506
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/organization'
*/
organization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organization.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1489
=======
* @see routes/web.php:1496
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1501
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1506
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1510
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location'
*/
export const location = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(options),
    method: 'get',
})

location.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1489
=======
* @see routes/web.php:1496
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1501
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1506
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1510
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location'
*/
location.url = (options?: RouteQueryOptions) => {
    return location.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1489
=======
* @see routes/web.php:1496
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1501
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1506
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1510
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location'
*/
location.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1489
=======
* @see routes/web.php:1496
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1501
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1506
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1510
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location'
*/
location.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1493
=======
* @see routes/web.php:1500
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1505
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1510
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1514
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-ranap'
*/
export const location_ranap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_ranap.url(options),
    method: 'get',
})

location_ranap.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1493
=======
* @see routes/web.php:1500
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1505
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1510
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1514
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.url = (options?: RouteQueryOptions) => {
    return location_ranap.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1493
=======
* @see routes/web.php:1500
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1505
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1510
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1514
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_ranap.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1493
=======
* @see routes/web.php:1500
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1505
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1510
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1514
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-ranap'
*/
location_ranap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location_ranap.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1496
=======
* @see routes/web.php:1503
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1508
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1513
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1517
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-farmasi'
*/
export const location_farmasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_farmasi.url(options),
    method: 'get',
})

location_farmasi.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/location-farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1496
=======
* @see routes/web.php:1503
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1508
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1513
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1517
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.url = (options?: RouteQueryOptions) => {
    return location_farmasi.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1496
=======
* @see routes/web.php:1503
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1508
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1513
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1517
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location_farmasi.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1496
=======
* @see routes/web.php:1503
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1508
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1513
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1517
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/location-farmasi'
*/
location_farmasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location_farmasi.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1506
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1511
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1516
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1520
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/practitioner'
*/
export const practitioner = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitioner.url(options),
    method: 'get',
})

practitioner.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1506
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1511
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1516
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1520
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.url = (options?: RouteQueryOptions) => {
    return practitioner.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1506
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1511
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1516
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1520
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: practitioner.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1499
=======
* @see routes/web.php:1506
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1511
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1516
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1520
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/practitioner'
*/
practitioner.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: practitioner.url(options),
    method: 'head',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1502
=======
* @see routes/web.php:1509
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1514
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1519
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1523
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/patient'
*/
export const patient = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patient.url(options),
    method: 'get',
})

patient.definition = {
    methods: ["get","head"],
    url: '/satusehat/prerequisites/patient',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1502
=======
* @see routes/web.php:1509
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1514
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1519
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1523
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/patient'
*/
patient.url = (options?: RouteQueryOptions) => {
    return patient.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1502
=======
* @see routes/web.php:1509
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1514
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1519
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1523
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/patient'
*/
patient.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patient.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
* @see routes/web.php:1502
=======
* @see routes/web.php:1509
>>>>>>> c30c174a (qrcode validasi surat)
=======
* @see routes/web.php:1514
>>>>>>> 1d92fd36 (Frekuensi Penyakit Ralan-fix)
=======
* @see routes/web.php:1519
>>>>>>> 7ff06318 (Frekuensi Penyakit Ranap-fix)
=======
* @see routes/web.php:1523
>>>>>>> bdf57514 (surveilans Penyakit Ralan)
* @route '/satusehat/prerequisites/patient'
*/
patient.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patient.url(options),
    method: 'head',
})

const prerequisites = {
    organization: Object.assign(organization, organization),
    location: Object.assign(location, location),
    location_ranap: Object.assign(location_ranap, location_ranap),
    location_farmasi: Object.assign(location_farmasi, location_farmasi),
    practitioner: Object.assign(practitioner, practitioner),
    patient: Object.assign(patient, patient),
}

export default prerequisites