<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Models\Genre;
use App\Models\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Film::factory(30)->has(Storage::factory(2), 'materials')->create();
    }
}
