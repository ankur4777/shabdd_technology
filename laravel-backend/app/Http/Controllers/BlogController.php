<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $blogs = Blog::query()
            ->latest('published_date')
            ->get()
            ->map(fn (Blog $blog): array => $this->formatBlog($blog));

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        return response()->json($this->formatBlog($blog));
    }

    private function formatBlog(Blog $blog): array
    {
        return [
            'id' => $blog->id,
            'slug' => $blog->slug,
            'category' => $blog->category,
            'date' => optional($blog->published_date)->format('M d, Y'),
            'published_date' => optional($blog->published_date)->toDateString(),
            'title' => $blog->title,
            'description' => $blog->description,
            'desc' => $blog->description,
            'introduction' => $blog->introduction,
            'read_time' => $blog->read_time,
            'image' => $this->publicUrl($blog->image),
            'author' => [
                'name' => $blog->author_name,
                'role' => $blog->author_role,
                'image' => $this->publicUrl($blog->author_image),
                'bio' => $blog->author_bio,
            ],
            'content_sections' => $blog->content_sections ?? [],
        ];
    }

    private function publicUrl(?string $path): ?string
    {
        return $path ? Storage::disk('public')->url($path) : null;
    }
}
