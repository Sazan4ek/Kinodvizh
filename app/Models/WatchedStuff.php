<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchedStuff extends Model
{
    use HasFactory;

    protected $fillable = [
        'watchable_type', 
        'watchable_id', 
        'user_id'
    ];
}
