<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)
            ->has(Review::factory(3), 'reviews')
            ->for(Role::all()->random())
            ->create();
    }
}
