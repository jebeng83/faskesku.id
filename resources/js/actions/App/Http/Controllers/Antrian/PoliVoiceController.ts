import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::index
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:12
* @route '/api/poli-voice-mapping'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/poli-voice-mapping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::index
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:12
* @route '/api/poli-voice-mapping'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::index
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:12
* @route '/api/poli-voice-mapping'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::index
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:12
* @route '/api/poli-voice-mapping'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::store
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:28
* @route '/api/poli-voice-mapping'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/poli-voice-mapping',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::store
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:28
* @route '/api/poli-voice-mapping'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Antrian\PoliVoiceController::store
* @see app/Http/Controllers/Antrian/PoliVoiceController.php:28
* @route '/api/poli-voice-mapping'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const PoliVoiceController = { index, store }

export default PoliVoiceController