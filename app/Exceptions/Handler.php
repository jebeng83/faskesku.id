<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the inputs that are never flashed for validation exceptions.
     * Extend defaults to include file/blob fields to keep session payload small.
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
        // Prevent large file inputs from being flashed into session
        'logo',
        'wallpaper',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}