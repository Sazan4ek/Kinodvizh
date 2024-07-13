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

    static public function getFilteredData($filterData)
    {
        $genre = $filterData->genre ?? null;

        $sqlQuery = Series::query()->with('materials')->with('genres');
        
        // ->with(['genres', function($query) use ($genre) {
        //     $query->where('name', $genre);
        // }]);

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

        $searchText = $filterData->searchText;
        if($searchText !== "") $sqlQuery->where('name', 'like', "%$searchText%");

        $orderBy = $filterData->orderBy;
        if($orderBy === 'by marks count') $sqlQuery->orderBy('marksCount', 'desc');
        else if($orderBy === 'by rating') $sqlQuery->orderBy('rating', 'desc');
        else if($orderBy === 'by release date') $sqlQuery->orderBy('releaseDate', 'desc');
        else if($orderBy === 'by name') $sqlQuery->orderBy('name', 'asc');

        $filteredSeries = $sqlQuery->paginate(20);
        return $filteredSeries;
    }

    static public function getAllCountries()
    {
        return Series::all()->pluck('country')->unique();
    }
}
