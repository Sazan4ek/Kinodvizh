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
    static protected bool $isPoster = true;
    

    protected const POSTER_URLS = [
        'https://i0.wp.com/opencountrymag.com/wp-content/uploads/2023/06/Gangs-of-Lagos-film-poster.jpg?fit=480%2C640&ssl=1',
        'https://www.lucasfilm.com/app/uploads/the-mandalorian_production_poster-aspect-ratio-640-948-480x711.jpg',
        'https://m.media-amazon.com/images/I/71lbFfxfMtL._AC_UF894,1000_QL80_.jpg',
        'https://c8.alamy.com/comp/B839N5/bad-boys-year-1995-usa-will-smith-martin-lawrence-ta-leoni-affiche-B839N5.jpg',
        'https://upload.wikimedia.org/wikipedia/ru/e/e9/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%D0%94%D0%B8%D0%BA%D1%82%D0%B0%D1%82%D0%BE%D1%80.jpg',
        'https://c8.alamy.com/comp/2WK91KW/land-of-bad-2024-directed-by-william-eubank-and-starring-liam-hemsworth-russell-crowe-and-luke-hemsworth-a-delta-force-team-is-sent-to-rescue-a-cia-agent-from-terrorists-in-mindanao-philippines-us-one-sheet-poster-editorial-use-only-credit-bfa-the-avenue-entertainment-2WK91KW.jpg',
        'https://img.freepik.com/premium-psd/action-movie-poster_1117895-529.jpg?w=740',

    ];
    
    public function definition(): array
    {
        static $urlIndex = 0;
        self::$isPoster = !self::$isPoster;

        $isPosterNow = self::$isPoster;

        return [
            'type' => $isPosterNow ? 'poster' : 'trailer', 
            'uri' => $isPosterNow 
                ? self::POSTER_URLS[$urlIndex++ % count(self::POSTER_URLS)]
                : 'https://dn720303.ca.archive.org/0/items/rick-astley-never-gonna-give-you-up-hd-4-k-60-fps/Rick%20Astley%20Never%20Gonna%20Give%20You%20Up%20HD%204K%2060%20FPS.mp4'
        ];
    }
}
