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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string("image");
            $table->string("category");
            $table->date("published_date");
            $table->string("title");
            $table->text("description");
            $table->text("introduction")->nullable();
            $table->unsignedInteger("read_time")->default(5);
            $table->string("author_name")->nullable();
            $table->string("author_role")->nullable();
            $table->string("author_image")->nullable();
            $table->text("author_bio")->nullable();
            $table->json("content_sections")->nullable();
            $table->string("slug")->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
