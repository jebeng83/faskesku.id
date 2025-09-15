import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/livewire/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
=======
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
 * @route '/livewire/update'
 */
>>>>>>> kohsun
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
 * @route '/livewire/upload-file'
 */
>>>>>>> kohsun
export const uploadFile = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadFile.url(options),
    method: 'post',
})

uploadFile.definition = {
    methods: ["post"],
    url: '/livewire/upload-file',
} satisfies RouteDefinition<["post"]>

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
 * @route '/livewire/upload-file'
 */
>>>>>>> kohsun
uploadFile.url = (options?: RouteQueryOptions) => {
    return uploadFile.definition.url + queryParams(options)
}

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
 * @route '/livewire/upload-file'
 */
>>>>>>> kohsun
uploadFile.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadFile.url(options),
    method: 'post',
})

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
export const previewFile = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewFile.url(args, options),
    method: 'get',
})

previewFile.definition = {
    methods: ["get","head"],
    url: '/livewire/preview-file/{filename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
previewFile.url = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return previewFile.definition.url
            .replace('{filename}', parsedArgs.filename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
<<<<<<< HEAD
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
previewFile.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewFile.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
=======
/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
 * @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
 * @route '/livewire/preview-file/{filename}'
 */
>>>>>>> kohsun
previewFile.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewFile.url(args, options),
    method: 'head',
})
<<<<<<< HEAD

const livewire = {
    update: Object.assign(update, update),
    uploadFile: Object.assign(uploadFile, uploadFile),
    previewFile: Object.assign(previewFile, previewFile),
=======
const livewire = {
    update,
uploadFile,
previewFile,
>>>>>>> kohsun
}

export default livewire