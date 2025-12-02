import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::patch
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:141
* @route '/jenjang-jabatan/{kode}'
*/
export const patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})

patch.definition = {
    methods: ["patch"],
    url: '/jenjang-jabatan/{kode}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::patch
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:141
* @route '/jenjang-jabatan/{kode}'
*/
patch.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return patch.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::patch
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:141
* @route '/jenjang-jabatan/{kode}'
*/
patch.patch = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})

const update = {
    patch: Object.assign(patch, patch),
}

export default update