import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import ref from './ref'
import antrean from './antrean'
import srk from './srk'
/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
export const config = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

config.definition = {
    methods: ["get","head"],
    url: '/api/mobilejkn/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\MobileJknController::config
* @see app/Http/Controllers/Pcare/MobileJknController.php:23
* @route '/api/mobilejkn/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

const mobilejkn = {
    config: Object.assign(config, config),
    ref: Object.assign(ref, ref),
    antrean: Object.assign(antrean, antrean),
    srk: Object.assign(srk, srk),
}

export default mobilejkn