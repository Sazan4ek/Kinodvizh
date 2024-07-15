<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $filmsList = Film::getFilteredData($request);
        return $filmsList;
    }

    public function toggleUserWhoWantedToWatch(Request $request)
    {
        $film = Film::find($request->film_id);
        $userId = $request->user_id;
        $func = $request->func;
        $film->usersWhoWantedToWatch()->$func($userId);

        return response()->noContent();
    }

    public function toggleUserWhoWatched(Request $request)
    {
        $film = Film::find($request->film_id);
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
        return Film::with($request->with)->find($filmId);
    }
}
