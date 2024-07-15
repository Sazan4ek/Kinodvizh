<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $review = Review::create([
            'rating' => $request->rating,
            'text' => $request->text,
            'user_id' => $request->userId
        ]);

        if($request->watchableType === 'film') $watchable = Film::find($request->filmId);
        else $watchable = Series::find($request->seriesId);

        $watchable->marksCount++;
        $watchable->marksSum += $request->rating;

        $marksCount = $watchable->marksCount;
        $marksSum = $watchable->marksSum;

        $watchable->rating = round($marksSum / $marksCount, 1);

        $watchable->reviews()->save($review);
        $watchable->save();

        return [$watchable->reviews()->with('user')->get(), $marksCount, $watchable->rating];
    }

    public function toggleLike(Request $request)
    {
        $review = Review::find($request->reviewId);
        if($request->action === 'add') $review->likesCount++;
        else $review->likesCount--;
        $review->save();
        return $review->likesCount;
    }

    public function toggleDislike(Request $request)
    {
        $review = Review::find($request->reviewId);
        if($request->action === 'add') $review->dislikesCount++;
        else $review->dislikesCount--;
        $review->save();
        return $review->dislikesCount;
    }
}
