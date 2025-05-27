<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Genre>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected const GENRES = [
        'action',
        'drama',
        'romantic',
        'comedy',
        'adventure',
        'animation',
        'detective',
        'horror',
        'fantasy',
        'science-fiction',
        'crime and mystery'
    ];
    
    public function definition(): array
    {
        static $index = 0;

        return [
            'name' => $index >= count(self::GENRES)
                ? fake()->unique()->word()
                : self::GENRES[$index++], 
            'image' => fake()->imageUrl(),
        ];
    }
}
