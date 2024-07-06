<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WantedStuff extends Model
{
    use HasFactory;

    protected $fillable = [
        'wantable_type', 
        'wantable_id', 
        'user_id'
    ];
}
