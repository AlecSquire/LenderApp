<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('dashboard');


// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['web'])->name('dashboard');

Route::get('/test', [NotificationController::class, 'sendTestEmail']);

// routes/web.php
// Item Page (React Fetches Data)
Route::get('/item/{id}', function ($id) {
    return Inertia::render('Item', ['id' => $id]);
})->middleware(['web'])->name('item');

Route::delete('/item/{id}', [ItemController::class, 'delete'])
    ->middleware(['web'])
    ->name('item.delete');

Route::patch('/item/{id}', [ItemController::class, 'edit'])
    ->middleware(['web'])
    ->name('item.edit');


// // Lending & Borrowing Pages
// Route::get('/lend', fn() => Inertia::render('Lend'))->middleware(['auth'])->name('lend');
// Route::get('/borrower', fn() => Inertia::render('Borrower'))->middleware(['auth'])->name('borrower');
// Route::get('/lender', fn() => Inertia::render('Lender'))->middleware(['auth'])->name('lender');

// // User Management
// Route::middleware(['auth'])->group(function () {
//     Route::get('/users', [UserController::class, 'index'])->name('users.index');
//     Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
//     Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
//     Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.delete');
// });

// // Profile Routes
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });



require __DIR__ . '/auth.php';
