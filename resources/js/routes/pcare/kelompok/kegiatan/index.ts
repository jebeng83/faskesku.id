import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import add from './add'
import update from './update'
import deleteMethod from './delete'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1654
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
export const api = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/kegiatan/{tanggal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1654
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
api.url = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return api.definition.url
            .replace('{tanggal}', parsedArgs.tanggal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1654
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
api.get = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1654
* @route '/pcare/api/kelompok/kegiatan/{tanggal}'
*/
api.head = (args: { tanggal: string | number } | [tanggal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const kegiatan = {
    api: Object.assign(api, api),
    add: Object.assign(add, add),
    update: Object.assign(update, update),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default kegiatan