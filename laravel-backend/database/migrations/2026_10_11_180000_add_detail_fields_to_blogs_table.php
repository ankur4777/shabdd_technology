<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            if (! Schema::hasColumn('blogs', 'introduction')) {
                $table->text('introduction')->nullable()->after('description');
            }

            if (! Schema::hasColumn('blogs', 'read_time')) {
                $table->unsignedInteger('read_time')->default(5)->after('introduction');
            }

            if (! Schema::hasColumn('blogs', 'author_name')) {
                $table->string('author_name')->nullable()->after('read_time');
            }

            if (! Schema::hasColumn('blogs', 'author_role')) {
                $table->string('author_role')->nullable()->after('author_name');
            }

            if (! Schema::hasColumn('blogs', 'author_image')) {
                $table->string('author_image')->nullable()->after('author_role');
            }

            if (! Schema::hasColumn('blogs', 'author_bio')) {
                $table->text('author_bio')->nullable()->after('author_image');
            }

            if (! Schema::hasColumn('blogs', 'content_sections')) {
                $table->json('content_sections')->nullable()->after('author_bio');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            foreach ([
                'content_sections',
                'author_bio',
                'author_image',
                'author_role',
                'author_name',
                'read_time',
                'introduction',
            ] as $column) {
                if (Schema::hasColumn('blogs', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
