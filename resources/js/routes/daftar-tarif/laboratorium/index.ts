import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DaftarTarifController::updateTemplates
* @see app/Http/Controllers/DaftarTarifController.php:638
* @route '/daftar-tarif/laboratorium/{kd_jenis_prw}/templates'
*/
export const updateTemplates = (args: { kd_jenis_prw: string | number } | [kd_jenis_prw: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateTemplates.url(args, options),
    method: 'put',
})

updateTemplates.definition = {
    methods: ["put"],
    url: '/daftar-tarif/laboratorium/{kd_jenis_prw}/templates',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::updateTemplates
* @see app/Http/Controllers/DaftarTarifController.php:638
* @route '/daftar-tarif/laboratorium/{kd_jenis_prw}/templates'
*/
updateTemplates.url = (args: { kd_jenis_prw: string | number } | [kd_jenis_prw: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_jenis_prw: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_jenis_prw: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_jenis_prw: args.kd_jenis_prw,
    }

    return updateTemplates.definition.url
            .replace('{kd_jenis_prw}', parsedArgs.kd_jenis_prw.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::updateTemplates
* @see app/Http/Controllers/DaftarTarifController.php:638
* @route '/daftar-tarif/laboratorium/{kd_jenis_prw}/templates'
*/
updateTemplates.put = (args: { kd_jenis_prw: string | number } | [kd_jenis_prw: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateTemplates.url(args, options),
    method: 'put',
})

const laboratorium = {
    updateTemplates: Object.assign(updateTemplates, updateTemplates),
}

export default laboratorium