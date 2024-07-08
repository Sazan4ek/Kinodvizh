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
            'expertRating' => fake()->randomFloat(2, 0, 9), 
            'rating' => fake()->randomFloat(2, 0, 9),
            'expertMarksCount' => fake()->numberBetween(0, 500000),
            'marksCount' => fake()->numberBetween(),
            'seasonsCount' => fake()->randomDigitNotNull(), 
            'seriesDuration' => fake()->time('H:i:s', '02:00:00')
        ];
    }
}
