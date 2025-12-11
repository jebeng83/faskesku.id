<?php

// Simple router for PHP built-in server to forward all non-file requests to public/index.php
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$publicPath = __DIR__.'/public';

// If the requested resource exists as a file in public/, serve it directly
if ($uri !== '/' && file_exists($publicPath.$uri) && is_file($publicPath.$uri)) {
    return false;
}

// Otherwise, forward the request to the Laravel front controller
require_once $publicPath.'/index.php';
