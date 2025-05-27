<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Series;
use App\Models\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Series::factory()
            ->has(Genre::factory(), 'genres')
            ->has(Storage::factory(2), 'materials')
            ->create();
    }
}
