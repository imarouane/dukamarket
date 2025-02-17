<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\User\UserProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\CarttController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('/admin/products', ProductController::class);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
});


Route::controller(UserProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::get('/products/{product}', 'show');
});

Route::prefix('/cart')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [CarttController::class, 'index']);
    Route::post('/add/{product}', [CarttController::class, 'addToCart']);
    Route::post('/remove/{product}', [CarttController::class, 'remove']);
    Route::post('/update/{product}', [CarttController::class, 'updateQuantity']);
});

Route::prefix('/cart/guest')->group(function () {
    Route::get('/', [CarttController::class, 'index']);
    Route::post('/add/{product}', [CarttController::class, 'addToGuestCart']);
    Route::post('/remove/{product}', [CarttController::class, 'remove']);
    Route::post('/update/{product}', [CarttController::class, 'updateQuantity']);
});
