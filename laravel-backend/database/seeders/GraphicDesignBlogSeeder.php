<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class GraphicDesignBlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::updateOrCreate(
            ['slug' => 'the-importance-of-graphic-design-for-your-brand'],
            [
                'image' => 'blogs/graphic-design-brand-hero.png',
                'category' => 'DESIGN',
                'published_date' => '2024-07-15',
                'title' => 'The Importance of Graphic Design for Your Brand',
                'description' => 'Understand how professional graphic design can strengthen your brand identity and create a lasting impression.',
                'introduction' => 'Graphic design shapes the first impression people have of your brand. Good visuals make your business look clear, confident and trustworthy.',
                'read_time' => 5,
                'author_name' => 'Priya Sharma',
                'author_role' => 'Content Writer at Shabdd Technology',
                'author_image' => 'authors/priya-sharma.jpg',
                'author_bio' => 'Passionate about technology, digital marketing, and helping businesses grow through innovative content.',
                'content_sections' => [
                    [
                        'heading' => 'Define Your Goals',
                        'body' => 'Graphic design shapes the first impression people have of your brand. Good visuals make your business look clear, confident and trustworthy.',
                    ],
                    [
                        'heading' => 'Research Your Audience',
                        'body' => 'A strong design system includes colors, typography, layout style, social templates, ads, brochures and website visuals that all feel connected.',
                    ],
                ],
            ],
        );
    }
}
