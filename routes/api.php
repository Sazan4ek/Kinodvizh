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
use App\Http\Controllers\UserRoleController;
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
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

// Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
//                 ->middleware('guest')
//                 ->name('password.email');

// Route::post('/reset-password', [NewPasswordController::class, 'store'])
//                 ->middleware('guest')
//                 ->name('password.store');

// Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
//                 ->middleware(['auth', 'signed', 'throttle:6,1'])
//                 ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::post('/films', [FilmController::class, 'index']);
Route::post('/series', [SeriesController::class, 'index']);

Route::get('/user/role', [UserRoleController::class, 'index']);

Route::post('/film/toggleUserWhoWantedToWatch', [FilmController::class, 'toggleUserWhoWantedToWatch'])
    ->middleware('auth');

Route::post('/film/toggleUserWhoWatched', [FilmController::class, 'toggleUserWhoWatched'])
    ->middleware('auth');

Route::post('/series/toggleUserWhoWantedToWatch', [SeriesController::class, 'toggleUserWhoWantedToWatch'])
    ->middleware('auth');

Route::post('/series/toggleUserWhoWatched', [SeriesController::class, 'toggleUserWhoWatched'])
    ->middleware('auth');

Route::get('/films/countries', [FilmController::class, 'allCountries']);
Route::get('/series/countries', [SeriesController::class, 'allCountries']);

Route::get('/genres', [GenreController::class, 'index']);

Route::post('/film/{filmId}', [FilmController::class, 'getFilmsWith']);

Route::post('/series/{seriesId}', [SeriesController::class, 'getSeriesWith']);

Route::patch('review/{reviewId}/toggleLike', [ReviewController::class, 'toggleLike'])
    ->middleware('auth');

Route::patch('review/{reviewId}/toggleDislike', [ReviewController::class, 'toggleDislike'])
    ->middleware('auth');

Route::post('/reviews/create', [ReviewController::class, 'store'])
    ->middleware('auth');