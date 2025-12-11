import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::index
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:12
* @route '/farmasi/konversi-satuan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/konversi-satuan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::index
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:12
* @route '/farmasi/konversi-satuan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::index
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:12
* @route '/farmasi/konversi-satuan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::index
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:12
* @route '/farmasi/konversi-satuan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::store
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:48
* @route '/farmasi/konversi-satuan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/konversi-satuan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::store
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:48
* @route '/farmasi/konversi-satuan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::store
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:48
* @route '/farmasi/konversi-satuan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::update
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const update = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::update
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
update.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
            sat_konversi: args[1],
            nilai: args[2],
            nilai_konversi: args[3],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
        sat_konversi: args.sat_konversi,
        nilai: args.nilai,
        nilai_konversi: args.nilai_konversi,
    }

    return update.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::update
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:85
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
update.put = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::destroy
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:139
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
export const destroy = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::destroy
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:139
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
destroy.url = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kode_sat: args[0],
            sat_konversi: args[1],
            nilai: args[2],
            nilai_konversi: args[3],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_sat: args.kode_sat,
        sat_konversi: args.sat_konversi,
        nilai: args.nilai,
        nilai_konversi: args.nilai_konversi,
    }

    return destroy.definition.url
            .replace('{kode_sat}', parsedArgs.kode_sat.toString())
            .replace('{sat_konversi}', parsedArgs.sat_konversi.toString())
            .replace('{nilai}', parsedArgs.nilai.toString())
            .replace('{nilai_konversi}', parsedArgs.nilai_konversi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\KonversiSatuanController::destroy
* @see app/Http/Controllers/Farmasi/KonversiSatuanController.php:139
* @route '/farmasi/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}'
*/
destroy.delete = (args: { kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number } | [kode_sat: string | number, sat_konversi: string | number, nilai: string | number, nilai_konversi: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const konversiSatuan = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default konversiSatuan