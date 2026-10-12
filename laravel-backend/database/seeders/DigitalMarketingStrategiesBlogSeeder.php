<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class DigitalMarketingStrategiesBlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::updateOrCreate(
            ['slug' => '10-digital-marketing-strategies-to-grow-your-business-in-2026'],
            [
                'image' => 'blogs/digital-marketing-strategies-2026.png',
                'category' => 'DIGITAL MARKETING',
                'published_date' => '2026-10-11',
                'title' => '10 Digital Marketing Strategies to Grow Your Business in 2026',
                'description' => 'Discover the most effective digital marketing strategies for 2026, including SEO, content marketing, social media campaigns, email automation, and paid advertising.',
                'introduction' => 'Digital marketing helps businesses reach customers where they spend most of their time: search engines, websites, social media, email, paid channels, and online communities.',
                'read_time' => 5,
                'author_name' => 'Priya Sharma',
                'author_role' => 'Content Writer at Shabdd Technology',
                'author_image' => 'authors/priya-sharma.jpg',
                'author_bio' => 'Passionate about technology, digital marketing, and helping businesses grow through innovative content.',
                'content_sections' => [
                    [
                        'heading' => 'Define Your Goals',
                        'body' => 'Start with clear business goals such as more leads, better brand awareness, stronger search visibility, or higher sales conversion.',
                    ],
                    [
                        'heading' => 'Research Your Audience',
                        'body' => 'A strong digital strategy combines useful content, search visibility, paid campaigns, automation, and consistent performance tracking.',
                    ],
                    [
                        'heading' => 'Measure and Improve',
                        'body' => 'Track campaign performance regularly so you can improve what works, reduce wasted spend, and keep growing with real data.',
                    ],
                ],
            ],
        );
    }
}
