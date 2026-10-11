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
        "introduction",
        "read_time",
        "author_name",
        "author_role",
        "author_image",
        "author_bio",
        "content_sections",
        "slug"
    ]; 
    protected $casts = [
        "published_date" => "date",
        "content_sections" => "array"
    ];
}
