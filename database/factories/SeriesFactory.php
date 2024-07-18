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
            'marksSum' => $marksSum = fake()->numberBetween(0, 100000),
            'expertMarksSum' => $expertMarksSum = fake()->numberBetween(0, 100000),
            'expertMarksCount' => $expertMarksCount = fake()->numberBetween(round($expertMarksSum / 10), $expertMarksSum),
            'marksCount' => $marksCount = fake()->numberBetween(round($marksSum / 10), $marksSum),
            'expertRating' => (round($expertMarksSum / $expertMarksCount, 1)),
            'rating' => (round($marksSum / $marksCount, 1)),
            'seasonsCount' => fake()->randomDigitNotNull(), 
            'seriesDuration' => fake()->time('H:i:s', '02:00:00')
        ];
    }
}
