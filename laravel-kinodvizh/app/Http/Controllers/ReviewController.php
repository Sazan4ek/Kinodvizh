<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Film;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(ReviewRequest $request)
    {
        $review = Review::create($request->all());

        if($request->watchableType === 'film') $watchable = Film::findOrFail($request->filmId);
        else $watchable = Series::findOrFail($request->seriesId);

        $watchable->marksCount++;
        $watchable->marksSum += $request->rating;

        $marksCount = $watchable->marksCount;
        $marksSum = $watchable->marksSum;

        $watchable->rating = round($marksSum / $marksCount, 1);

        $watchable->reviews()->save($review);
        $watchable->save();

        return [$watchable->reviews()->with('user')->get(), $marksCount, $watchable->rating];
    }

    public function blockText(Review $review)
    {   
        $newText = $review->text = '*Review text was blocked by the moderator*';
        $review->save();

        return response()->json($newText);
    }

    public function toggleLike(Request $request)
    {
        $review = Review::findOrFail($request->reviewId);
        if($request->action === 'add') $review->likesCount++;
        else $review->likesCount--;
        $review->save();
        return $review->likesCount;
    }

    public function toggleDislike(Request $request)
    {
        $review = Review::findOrFail($request->reviewId);
        if($request->action === 'add') $review->dislikesCount++;
        else $review->dislikesCount--;
        $review->save();
        return $review->dislikesCount;
    }
}
