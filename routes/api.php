<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Log;

// Route for checking authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});
// All protected API resources

Route::resource('items', ItemController::class)->parameters([
    'items' => 'id'
]);
Route::resource('users', UserController::class);

Route::resource('/notify', NotificationController::class);
Log::debug("it made it here");

Route::get('/notify', [NotificationController::class, 'markAsReturned'])->name('item.return.notify');
