import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::index
* @see app/Http/Controllers/Security/FirewallSettingsController.php:15
* @route '/security/firewall'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/security/firewall',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::index
* @see app/Http/Controllers/Security/FirewallSettingsController.php:15
* @route '/security/firewall'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::index
* @see app/Http/Controllers/Security/FirewallSettingsController.php:15
* @route '/security/firewall'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::index
* @see app/Http/Controllers/Security/FirewallSettingsController.php:15
* @route '/security/firewall'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::update
* @see app/Http/Controllers/Security/FirewallSettingsController.php:31
* @route '/security/firewall'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/security/firewall',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::update
* @see app/Http/Controllers/Security/FirewallSettingsController.php:31
* @route '/security/firewall'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::update
* @see app/Http/Controllers/Security/FirewallSettingsController.php:31
* @route '/security/firewall'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::blocked
* @see app/Http/Controllers/Security/FirewallSettingsController.php:59
* @route '/security/firewall/blocked'
*/
export const blocked = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: blocked.url(options),
    method: 'get',
})

blocked.definition = {
    methods: ["get","head"],
    url: '/security/firewall/blocked',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::blocked
* @see app/Http/Controllers/Security/FirewallSettingsController.php:59
* @route '/security/firewall/blocked'
*/
blocked.url = (options?: RouteQueryOptions) => {
    return blocked.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::blocked
* @see app/Http/Controllers/Security/FirewallSettingsController.php:59
* @route '/security/firewall/blocked'
*/
blocked.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: blocked.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::blocked
* @see app/Http/Controllers/Security/FirewallSettingsController.php:59
* @route '/security/firewall/blocked'
*/
blocked.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: blocked.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::unblock
* @see app/Http/Controllers/Security/FirewallSettingsController.php:71
* @route '/security/firewall/blocked/{blockedIp}'
*/
export const unblock = (args: { blockedIp: number | { id: number } } | [blockedIp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unblock.url(args, options),
    method: 'delete',
})

unblock.definition = {
    methods: ["delete"],
    url: '/security/firewall/blocked/{blockedIp}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::unblock
* @see app/Http/Controllers/Security/FirewallSettingsController.php:71
* @route '/security/firewall/blocked/{blockedIp}'
*/
unblock.url = (args: { blockedIp: number | { id: number } } | [blockedIp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blockedIp: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { blockedIp: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            blockedIp: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        blockedIp: typeof args.blockedIp === 'object'
        ? args.blockedIp.id
        : args.blockedIp,
    }

    return unblock.definition.url
            .replace('{blockedIp}', parsedArgs.blockedIp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Security\FirewallSettingsController::unblock
* @see app/Http/Controllers/Security/FirewallSettingsController.php:71
* @route '/security/firewall/blocked/{blockedIp}'
*/
unblock.delete = (args: { blockedIp: number | { id: number } } | [blockedIp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unblock.url(args, options),
    method: 'delete',
})

const firewall = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
    blocked: Object.assign(blocked, blocked),
    unblock: Object.assign(unblock, unblock),
}

export default firewall