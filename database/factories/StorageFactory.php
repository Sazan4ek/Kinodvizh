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
    public function definition(): array
    {
        $is_poster = rand() % 2;
        return [
            'type' => $is_poster ? 'poster' : 'trailer', 
            'uri' => $is_poster ? fake()->imageUrl() : fake()->imageUrl()
        ];
    }
}
