<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable=[
        "image",
        "category",
        "published_date",
        "title",
        "description",
        "slug"
    ]; 
    protected $casts = [
        "published_date" => "date"
    ];
}
