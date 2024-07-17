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
            'uri' => self::$is_poster ? fake()->imageUrl() : 'https://dn720303.ca.archive.org/0/items/rick-astley-never-gonna-give-you-up-hd-4-k-60-fps/Rick%20Astley%20Never%20Gonna%20Give%20You%20Up%20HD%204K%2060%20FPS.mp4'
        ];
    }
}
