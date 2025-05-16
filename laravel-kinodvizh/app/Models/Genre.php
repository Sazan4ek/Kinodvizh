<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Genre extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name', 
        'image'
    ];
    
    public function genreable(): MorphTo
    {
        return $this->morphTo('genreable');
    }

    public function films(): MorphToMany
    {
        return $this->morphedByMany(Film::class, 'genreable', 'genreables');
    }

    public function series(): MorphToMany
    {
        return $this->morphedByMany(Series::class, 'genreable', 'genreables');
    }
}
