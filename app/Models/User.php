<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];
    
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function watchedFilms(): MorphToMany
    {
        return $this->morphedByMany(Film::class, 'watchable');
    }

    public function watchedSeries(): MorphToMany
    {
        return $this->morphedByMany(Series::class, 'watchable');
    }

    public function filmsWantedToWatch(): MorphToMany
    {
        return $this->morphedByMany(Film::class, 'wantable');
    }

    public function seriesWantedToWatch(): MorphToMany
    {
        return $this->morphedByMany(Series::class, 'wantable');
    }
}
