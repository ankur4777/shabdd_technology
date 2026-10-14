<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../laravel-backend/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../laravel-backend/vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__.'/../laravel-backend/bootstrap/app.php';

$app->handleRequest(Request::capture());
