<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Http\Request;

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
        return $this->morphMany(Review::class, "reviewable");
    }

    static public function getFilteredData(Request $request)
    {
        $genre = $request->input('genre');
        $country = $request->input('country');
        $yearFrom = $request->input('year_from');
        $yearUntil = $request->input('year_until');
        $dateFrom = "$yearFrom-01-01";    
        $dateUntil = "$yearUntil-12-31"; 
        $rateFrom = $request->input('rate_from', 0);
        $rateUntil = $request->input('rate_until', 10);
        $searchText = $request->input('q', "");
        $userId = $request->integer('userId');
        $favourites = $request->boolean('favourites');
        $watched = $request->boolean('watched');
        $orderBy = $request->input('order_by');
        $page = $request->input('page');

        $sqlQuery = Series::query()->with('materials', function ($query) {
            $query->where('type', 'poster');
        })
        ->with(['genres', 'usersWhoWatched', 'usersWhoWantedToWatch'])
        ->when($genre, function (Builder $query, $genre) {
            $query->whereHas('genres', function (Builder $query) use ($genre) {
                $query->where('name', $genre);
            });
        })
        ->when($searchText, function (Builder $query) use ($searchText) {
            $query->where('name', 'like', "%$searchText%");
        })
        ->when($country, function (Builder $query, $country) {
            $query->where('country', $country);
        })
        ->when($yearFrom, function (Builder $query) use ($dateFrom) {
            $query->where('releaseDate', '>=', $dateFrom);
        })
        ->when($yearUntil, function (Builder $query) use ($dateUntil) {
            $query->where('releaseDate', '<=', $dateUntil);
        })
        ->when($favourites && request()->user(), function (Builder $query) use ($userId) {
            $query->whereHas('usersWhoWantedToWatch', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            });
        })
        ->when($watched && request()->user(), function (Builder $query) use ($userId) {
            $query->whereHas('usersWhoWatched', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            });
        })
        ->when($orderBy, function (Builder $query, $orderBy) {
            switch ($orderBy) {
                case 'by marks count':
                    $query->orderBy('marksCount', 'desc');
                    break;
                case 'by rating':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'by release date':
                    $query->orderBy('releaseDate', 'desc');
                    break;
                case 'by name':
                    $query->orderBy('name', 'asc');
                    break;
                default: 
                    break;
            }
        })
        ->whereBetween('rating', [$rateFrom, $rateUntil]);

        $filteredSeries = $sqlQuery->paginate(20, ['*'], 'page', max(1, min($page, $sqlQuery->paginate(20)->lastPage())));    

        return $filteredSeries;
    }

    static public function getAllCountries()
    {
        return Series::all()->pluck('country')->unique();
    }
}
