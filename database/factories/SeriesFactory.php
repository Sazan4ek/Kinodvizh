<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Series>
 */
class SeriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'director' => fake()->firstName().' '.fake()->lastName(),
            'country' => fake()->country(),
            'releaseDate' => fake()->date(), 
            'scenarioMaker' => fake()->firstName().' '.fake()->lastName(), 
            'producer' => fake()->firstName().' '.fake()->lastName(), 
            'budget' => fake()->numberBetween(), 
            'fees' => fake()->numberBetween(), 
            'ageLimit' => fake()->numberBetween(0, 18),
            'description' => fake()->text(), 
            'expertMarksCount' => $expertMarksCount = fake()->numberBetween(0, 10000),
            'marksCount' => $marksCount = fake()->numberBetween(0, 10000),
            'marksSum' => $marksSum = fake()->numberBetween(0, 100000),
            'expertMarksSum' => $expertMarksSum = fake()->numberBetween(0, 100000),
            'expertRating' => (round($expertMarksSum / $expertMarksCount, 1) > 10 ? 6.9 : round($expertMarksSum / $expertMarksCount, 1)), 
            'rating' => (round($marksSum / $marksCount, 1) > 10 ? 6.9 : round($marksSum / $marksCount, 1)),
            'seasonsCount' => fake()->randomDigitNotNull(), 
            'seriesDuration' => fake()->time('H:i:s', '02:00:00')
        ];
    }
}
