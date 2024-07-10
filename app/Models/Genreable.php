<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genreable extends Model
{
    use HasFactory;

    protected $fillable = [
        'genreable_type', 
        'genreable_id', 
        'genre_id'
    ];
}
