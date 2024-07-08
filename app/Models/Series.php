<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 
        'name',
        'country',
        'director',
        'releaseDate', 
        'scenarioMaker', 
        'producer', 
        'fees', 
        'ageLimit', 
        'description', 
        'seasonsCount', 
        'seriesDuration', 
        'expertRating', 
        'rating',
        'expertMarksCount',
        'marksCount'
    ];

    public function genres(): MorphToMany
    {
        return $this->morphToMany(Genre::class, 'genreable', 'genreables');
    } 

    public function usersWhoWatched(): MorphToMany
    {
        return $this->morphToMany(User::class, 'watchable');
    }

    public function usersWhoWantedToWatch(): MorphToMany
    {
        return $this->morphToMany(User::class, 'wantable');
    }

    public function materials(): MorphMany
    {
        return $this->morphMany(Storage::class, 'storable');
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, "reviewable");
    }
}
