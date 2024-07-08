<?php

namespace Database\Factories;

use App\Models\Film;
use App\Models\Series;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function(User $user) {
            $user->filmsWantedToWatch()->attach(Film::all()->random(2));
            $user->watchedFilms()->attach(Film::all()->random());
            $user->seriesWantedToWatch()->attach(Series::all()->random(2));
            $user->watchedSeries()->attach(Series::all()->random());
        });
    }
}
