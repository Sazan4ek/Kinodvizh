<?php

namespace Database\Factories;

use App\Models\Film;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rating' => fake()->numberBetween(0, 10),
            'text' => fake()->text(), 
            'likesCount' => fake()->numberBetween(0,10000),
            'dislikesCount' => fake()->numberBetween(0, 10000),
        ];
        
    }

    public function configure(): static
    {
        return $this->afterCreating(function(Review $review) {
            if(rand() % 2)
            {
                $film = Film::all()->random();
                $film->reviews()->save($review);
            }
            else 
            {
                $series = Series::all()->random();
                $series->reviews()->save($review);
            }
        });
    }
}
