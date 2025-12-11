import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::patch
 * @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
 * @route '/sip-pegawai/{nik}'
 */
export const patch = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})

patch.definition = {
    methods: ["patch"],
    url: '/sip-pegawai/{nik}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::patch
 * @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
 * @route '/sip-pegawai/{nik}'
 */
patch.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    nik: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nik: args.nik,
                }

    return patch.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\SipPegawaiController::patch
 * @see app/Http/Controllers/Kepegawaian/SipPegawaiController.php:148
 * @route '/sip-pegawai/{nik}'
 */
patch.patch = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})
const update = {
    patch: Object.assign(patch, patch),
}

export default update