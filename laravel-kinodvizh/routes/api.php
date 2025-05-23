<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return User::with('role')->find($request->user()->id);
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::controller(FilmController::class)->prefix('films')->group(function() {

    Route::post('/', 'index');
    Route::post('/toggleUserWhoWantedToWatch', 'toggleUserWhoWantedToWatch')
        ->middleware('auth');
    
    Route::post('/toggleUserWhoWatched',  'toggleUserWhoWatched')
        ->middleware('auth');

    Route::get('/countries', 'allCountries');
    Route::post('/{filmId}', 'getFilmsWith');
});

Route::controller(SeriesController::class)->prefix('series')->group(function() {
    
    Route::post('/', 'index');
    Route::post('/toggleUserWhoWantedToWatch', 'toggleUserWhoWantedToWatch')
        ->middleware('auth');
    
    Route::post('/toggleUserWhoWatched', 'toggleUserWhoWatched')
        ->middleware('auth');
    
    Route::get('/countries', 'allCountries');
    Route::post('/{seriesId}', 'getSeriesWith');
    
});

Route::controller(ReviewController::class)->prefix('reviews')->group(function() {

    Route::patch('/{reviewId}/toggleLike', 'toggleLike')
        ->middleware('auth');
    
    Route::patch('/{reviewId}/toggleDislike', 'toggleDislike')
        ->middleware('auth');
    
    Route::post('/create', 'store')
        ->middleware('auth');
});


Route::get('/genres', [GenreController::class, 'index']);





Route::middleware('admin')->prefix('admin')->group(function () {
    Route::patch('films/{film}', [FilmController::class, 'update']);
    Route::patch('series/{series}', [SeriesController::class, 'update']);

    Route::delete('films/{film}', [FilmController::class, 'destroy']);
    Route::delete('series/{series}', [SeriesController::class, 'destroy']);

    Route::patch('reviews/{review}', [ReviewController::class, 'blockText']);
});

Route::controller(UserController::class)->prefix('users')->group(function() {
    Route::post('/{user}', 'show')->middleware('auth');
    Route::patch('/{user}', 'update')->middleware('auth');
});