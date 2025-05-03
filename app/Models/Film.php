<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Film extends Model
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
        'budget', 
        'fees', 
        'ageLimit', 
        'duration', 
        'description', 
        'expertRating', 
        'rating',
        'marksSum',
        'expertMarksSum',
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
        return $this->morphMany(Review::class, 'reviewable');
    }

    static public function getFilteredData($filterData)
    {
        $sqlQuery = Film::query()->with('materials', function ($query) {
            $query->where('type', 'poster');
        })->with(['genres', 'usersWhoWatched', 'usersWhoWantedToWatch']);
        
        $genre = $filterData->genre ?? null;
        if($genre) $sqlQuery->whereHas('genres', function ($query) use ($genre) {
            $query->where('name', $genre);
        });

        $country = $filterData->country ?? null;
        if($country) $sqlQuery->where('country', $country);

        $yearFrom = $filterData->yearFrom ?? null;
        $yearUntil = $filterData->yearUntil ?? null;
        $dateFrom = "$yearFrom-01-01";    
        $dateUntil = "$yearUntil-12-31"; 
        if($yearFrom && $yearUntil) $sqlQuery->whereBetween('releaseDate', [$dateFrom, $dateUntil]); 
        else if($yearFrom) $sqlQuery->where('releaseDate', '>=', $dateFrom);
        else if($yearUntil) $sqlQuery->where('releaseDate', '<=', $dateUntil);

        $rateFrom = $filterData->rateFrom ?? 0;
        $rateUntil = $filterData->rateUntil ?? 10;
        $sqlQuery->whereBetween('rating', [$rateFrom, $rateUntil]);

        $searchText = $filterData->q;
        if($searchText !== "" && $searchText !== null) $sqlQuery->where('name', 'like', "%$searchText%");

        $userId = $filterData->userId;

        $favourites = filter_var($filterData->favourites, FILTER_VALIDATE_BOOL);
        if($favourites === true && request()->user()) 
            $sqlQuery->whereHas('usersWhoWantedToWatch', function($query) use ($userId) {
                $query->where('users.id', $userId);
            });
        
        $watched = filter_var($filterData->watched, FILTER_VALIDATE_BOOL);
        if($watched === true && request()->user())
            $sqlQuery->whereHas('usersWhoWatched', function($query) use ($userId) {
                $query->where('users.id', $userId);
            });


        $orderBy = $filterData->orderBy;
        if($orderBy === 'by marks count') $sqlQuery->orderBy('marksCount', 'desc');
        else if($orderBy === 'by rating') $sqlQuery->orderBy('rating', 'desc');
        else if($orderBy === 'by release date') $sqlQuery->orderBy('releaseDate', 'desc');
        else if($orderBy === 'by name') $sqlQuery->orderBy('name', 'asc');

        $filteredFilms = $sqlQuery->paginate(20);

        if($filteredFilms->lastPage() < $filterData->page)
        {
            $filteredFilms = $sqlQuery->paginate(20, ['*'], 'page', $filteredFilms->lastPage());
        }
        else if($filterData->page < 1) 
        {
            $filteredFilms = $sqlQuery->paginate(20, ['*'], 'page', 1);
        }
        

        return $filteredFilms;
    }

    static public function getAllCountries()
    {
        return Film::all()->pluck('country')->unique();
    }
}
