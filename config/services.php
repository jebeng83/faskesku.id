<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // SATUSEHAT integration endpoints
    'satusehat' => [
        'env' => env('SATUSEHAT_ENV', 'DEV'),
        'auth' => env('SATUSEHAT_AUTH', ''),
        'fhir' => env('SATUSEHAT_FHIR', ''),
        'client_id' => env('SATUSEHAT_CLIENT_ID', ''),
        'client_secret' => env('SATUSEHAT_CLIENT_SECRET', ''),
        'organization_id' => env('SATUSEHAT_ORG_ID', ''),
    ],

    'whatsapp' => [
        'token' => env('WHATSAPP_TOKEN'),
        'phone_number_id' => env('WHATSAPP_PHONE_NUMBER_ID'),
        'app_secret' => env('WHATSAPP_APP_SECRET'),
        'verify_token' => env('WHATSAPP_VERIFY_TOKEN'),
        'graph_version' => env('WHATSAPP_GRAPH_VERSION', 'v19.0'),
        'graph_base' => env('WHATSAPP_GRAPH_BASE', 'https://graph.facebook.com'),
    ],

];
