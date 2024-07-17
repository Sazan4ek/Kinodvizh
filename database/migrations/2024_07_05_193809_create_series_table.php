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
            $table->unsignedBigInteger('budget')->nullable();
            $table->unsignedBigInteger('fees')->nullable();
            $table->unsignedTinyInteger('ageLimit')->nullable();
            $table->unsignedTinyInteger('seasonsCount');
            $table->time('seriesDuration');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('marksSum')->default(0);
            $table->unsignedBigInteger('expertMarksSum')->default(0);
            $table->unsignedDecimal('expertRating', 3, 1)->default(0);
            $table->unsignedDecimal('rating', 3, 1)->default(0);
            $table->unsignedBigInteger('expertMarksCount')->default(0);
            $table->unsignedBigInteger('marksCount')->default(0);
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
