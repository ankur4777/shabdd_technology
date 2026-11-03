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
        "article_content",
        "slug"
    ]; 
    protected $casts = [
        "published_date" => "date",
        "content_sections" => "array"
    ];

    // Expose one editor while retaining the existing stored section structure.
    public function getArticleContentAttribute(): string
    {
        return implode("\n", array_map(static function (array $section): string {
            $heading = trim((string) ($section['heading'] ?? ''));
            $body = (string) ($section['body'] ?? '');
            $html = $body === strip_tags($body) ? '<p>'.nl2br(e($body)).'</p>' : $body;

            return ($heading !== '' ? '<h3>'.e($heading).'</h3>' : '').$html;
        }, $this->content_sections ?? []));
    }

    public function setArticleContentAttribute(?string $content): void
    {
        $this->content_sections = filled($content) ? [['body' => $content]] : [];
    }
}
