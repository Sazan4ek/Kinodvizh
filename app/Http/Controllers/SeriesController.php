<?php

namespace App\Http\Controllers;

use App\Models\Series;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function index(Request $request)
    {
        $seriesList = Series::getFilteredData($request);
        return $seriesList;
    }

    public function toggleUserWhoWantedToWatch(Request $request)
    {
        $series = Series::find($request->series_id);
        $userId = $request->user_id;
        $func = $request->func;
        $series->usersWhoWantedToWatch()->$func($userId);

        return response()->noContent();
    }

    public function toggleUserWhoWatched(Request $request)
    {
        $series = Series::find($request->series_id);
        $userId = $request->user_id;
        $func = $request->func;
        $series->usersWhoWatched()->$func($userId);

        return response()->noContent();
    }

    public function allCountries(Request $request)
    {
        return Series::getAllCountries();
    }
}
