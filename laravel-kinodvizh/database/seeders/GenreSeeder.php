<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Models\Genre;
use App\Models\Series;
use App\Models\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Genre::factory(10)->has(Film::factory(3)->has(Storage::factory(2), 'materials'), 'films')->has(Series::factory(2)->has(Storage::factory(2), 'materials'), 'series')->create();
    }
}
