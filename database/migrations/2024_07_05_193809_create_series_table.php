<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('director');
            $table->string('country');
            $table->date('releaseDate');
            $table->string('scenarioMaker');
            $table->string('producer');
            $table->unsignedBigInteger('budget');
            $table->unsignedBigInteger('fees');
            $table->unsignedTinyInteger('agelimit');
            $table->unsignedTinyInteger('seasonsCount');
            $table->time('seriesDuration');
            $table->text('description');
            $table->unsignedDecimal('expertRating', 3, 1);
            $table->unsignedDecimal('rating', 3, 1);
            $table->unsignedBigInteger('expertMarksCount');
            $table->unsignedBigInteger('marksCount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
    }
};
