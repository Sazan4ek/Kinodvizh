<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilmRequest;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $filmsList = Film::getFilteredData($request);
        return $filmsList;
    }

    public function update(FilmRequest $request, Film $film)
    {
        $film->update($request->except('genresId'));
        $film->genres()->sync($request->genresId);

        return response()->noContent();
    }

    public function destroy(Film $film)
    {
        $film->materials()->delete();
        $film->reviews()->delete();
        $film->delete();

        return response()->noContent();
    }
    
    public function toggleUserWhoWantedToWatch(Request $request)
    {
        $film = Film::findOrFail($request->film_id);
        $userId = $request->user_id;
        $func = $request->func;
        $film->usersWhoWantedToWatch()->$func($userId);

        return response()->noContent();
    }

    public function toggleUserWhoWatched(Request $request)
    {
        $film = Film::findOrFail($request->film_id);
        $userId = $request->user_id;
        $func = $request->func;
        $film->usersWhoWatched()->$func($userId);

        return response()->noContent();
    }

    public function allCountries(Request $request)
    {
        return Film::getAllCountries();
    }

    public function getFilmsWith(Request $request, $filmId)
    {
        return Film::with($request->with)->findOrFail($filmId);
    }
}
