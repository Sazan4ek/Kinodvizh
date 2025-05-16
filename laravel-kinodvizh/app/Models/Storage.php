<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Storage extends Model
{
    use HasFactory;

    protected $fillable = [
        'storable_type', 
        'storable_id', 
        'type', 
        'uri'
    ];

    public function storable(): MorphTo
    {
        return $this->morphTo('storable');
    }
}
