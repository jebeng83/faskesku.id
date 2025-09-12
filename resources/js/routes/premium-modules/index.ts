import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \PremiumModuleController::index
 * @see [unknown]:0
 * @route '/premium-modules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/premium-modules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \PremiumModuleController::index
 * @see [unknown]:0
 * @route '/premium-modules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \PremiumModuleController::index
 * @see [unknown]:0
 * @route '/premium-modules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \PremiumModuleController::index
 * @see [unknown]:0
 * @route '/premium-modules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \PremiumModuleController::create
 * @see [unknown]:0
 * @route '/premium-modules/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/premium-modules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \PremiumModuleController::create
 * @see [unknown]:0
 * @route '/premium-modules/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \PremiumModuleController::create
 * @see [unknown]:0
 * @route '/premium-modules/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \PremiumModuleController::create
 * @see [unknown]:0
 * @route '/premium-modules/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \PremiumModuleController::store
 * @see [unknown]:0
 * @route '/premium-modules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/premium-modules',
} satisfies RouteDefinition<["post"]>

/**
* @see \PremiumModuleController::store
 * @see [unknown]:0
 * @route '/premium-modules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \PremiumModuleController::store
 * @see [unknown]:0
 * @route '/premium-modules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \PremiumModuleController::show
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
export const show = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/premium-modules/{premium_module}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \PremiumModuleController::show
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
show.url = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premium_module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premium_module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premium_module: args.premium_module,
                }

    return show.definition.url
            .replace('{premium_module}', parsedArgs.premium_module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::show
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
show.get = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \PremiumModuleController::show
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
show.head = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \PremiumModuleController::edit
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}/edit'
 */
export const edit = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/premium-modules/{premium_module}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \PremiumModuleController::edit
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}/edit'
 */
edit.url = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premium_module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premium_module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premium_module: args.premium_module,
                }

    return edit.definition.url
            .replace('{premium_module}', parsedArgs.premium_module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::edit
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}/edit'
 */
edit.get = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \PremiumModuleController::edit
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}/edit'
 */
edit.head = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \PremiumModuleController::update
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
export const update = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/premium-modules/{premium_module}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \PremiumModuleController::update
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
update.url = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premium_module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premium_module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premium_module: args.premium_module,
                }

    return update.definition.url
            .replace('{premium_module}', parsedArgs.premium_module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::update
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
update.put = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \PremiumModuleController::update
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
update.patch = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \PremiumModuleController::destroy
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
export const destroy = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/premium-modules/{premium_module}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \PremiumModuleController::destroy
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
destroy.url = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premium_module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premium_module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premium_module: args.premium_module,
                }

    return destroy.definition.url
            .replace('{premium_module}', parsedArgs.premium_module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::destroy
 * @see [unknown]:0
 * @route '/premium-modules/{premium_module}'
 */
destroy.delete = (args: { premium_module: string | number } | [premium_module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \PremiumModuleController::generateLicense
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/generate-license'
 */
export const generateLicense = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateLicense.url(args, options),
    method: 'post',
})

generateLicense.definition = {
    methods: ["post"],
    url: '/premium-modules/{premiumModule}/generate-license',
} satisfies RouteDefinition<["post"]>

/**
* @see \PremiumModuleController::generateLicense
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/generate-license'
 */
generateLicense.url = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premiumModule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premiumModule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premiumModule: args.premiumModule,
                }

    return generateLicense.definition.url
            .replace('{premiumModule}', parsedArgs.premiumModule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::generateLicense
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/generate-license'
 */
generateLicense.post = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateLicense.url(args, options),
    method: 'post',
})

/**
* @see \PremiumModuleController::activate
 * @see [unknown]:0
 * @route '/premium-modules/activate'
 */
export const activate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/premium-modules/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \PremiumModuleController::activate
 * @see [unknown]:0
 * @route '/premium-modules/activate'
 */
activate.url = (options?: RouteQueryOptions) => {
    return activate.definition.url + queryParams(options)
}

/**
* @see \PremiumModuleController::activate
 * @see [unknown]:0
 * @route '/premium-modules/activate'
 */
activate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(options),
    method: 'post',
})

/**
* @see \PremiumModuleController::deactivate
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/deactivate'
 */
export const deactivate = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

deactivate.definition = {
    methods: ["post"],
    url: '/premium-modules/{premiumModule}/deactivate',
} satisfies RouteDefinition<["post"]>

/**
* @see \PremiumModuleController::deactivate
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/deactivate'
 */
deactivate.url = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premiumModule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premiumModule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premiumModule: args.premiumModule,
                }

    return deactivate.definition.url
            .replace('{premiumModule}', parsedArgs.premiumModule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::deactivate
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/deactivate'
 */
deactivate.post = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

/**
* @see \PremiumModuleController::status
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/status'
 */
export const status = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/premium-modules/{premiumModule}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \PremiumModuleController::status
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/status'
 */
status.url = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { premiumModule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    premiumModule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        premiumModule: args.premiumModule,
                }

    return status.definition.url
            .replace('{premiumModule}', parsedArgs.premiumModule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \PremiumModuleController::status
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/status'
 */
status.get = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})
/**
* @see \PremiumModuleController::status
 * @see [unknown]:0
 * @route '/premium-modules/{premiumModule}/status'
 */
status.head = (args: { premiumModule: string | number } | [premiumModule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

/**
* @see \PremiumModuleController::validateLicense
 * @see [unknown]:0
 * @route '/premium-modules/validate-license'
 */
export const validateLicense = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateLicense.url(options),
    method: 'post',
})

validateLicense.definition = {
    methods: ["post"],
    url: '/premium-modules/validate-license',
} satisfies RouteDefinition<["post"]>

/**
* @see \PremiumModuleController::validateLicense
 * @see [unknown]:0
 * @route '/premium-modules/validate-license'
 */
validateLicense.url = (options?: RouteQueryOptions) => {
    return validateLicense.definition.url + queryParams(options)
}

/**
* @see \PremiumModuleController::validateLicense
 * @see [unknown]:0
 * @route '/premium-modules/validate-license'
 */
validateLicense.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateLicense.url(options),
    method: 'post',
})
const premiumModules = {
    index,
create,
store,
show,
edit,
update,
destroy,
generateLicense,
activate,
deactivate,
status,
validateLicense,
}

export default premiumModules