import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::handleUpdate
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
export const handleUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleUpdate.url(options),
    method: 'post',
})

handleUpdate.definition = {
    methods: ["post"],
    url: '/livewire/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::handleUpdate
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
handleUpdate.url = (options?: RouteQueryOptions) => {
    return handleUpdate.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::handleUpdate
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
handleUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleUpdate.url(options),
    method: 'post',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const HandleRequests = { handleUpdate }

export default HandleRequests