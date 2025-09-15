import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::handle
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
export const handle = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handle.url(args, options),
    method: 'get',
})

handle.definition = {
    methods: ["get","head"],
    url: '/livewire/preview-file/{filename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::handle
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
handle.url = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { filename: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            filename: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    filename: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        filename: args.filename,
    }
=======
                        filename: args.filename,
                }
>>>>>>> kohsun

    return handle.definition.url
            .replace('{filename}', parsedArgs.filename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::handle
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
handle.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handle.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::handle
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::handle
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
handle.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: handle.url(args, options),
    method: 'head',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const FilePreviewController = { handle }

export default FilePreviewController