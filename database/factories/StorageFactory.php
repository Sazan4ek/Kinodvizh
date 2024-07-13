<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Storage>
 */
class StorageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    static protected $is_poster = true;
    
    public function definition(): array
    {
        self::$is_poster = !self::$is_poster;
        return [
            'type' => self::$is_poster ? 'poster' : 'trailer', 
            'uri' => fake()->imageUrl()
        ];
    }
}
