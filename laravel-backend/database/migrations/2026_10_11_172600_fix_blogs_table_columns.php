<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            if (! Schema::hasColumn('blogs', 'title')) {
                $table->string('title')->nullable()->after('published_date');
            }
        });

        if (Schema::hasColumn('blogs', 'descriptioin') && ! Schema::hasColumn('blogs', 'description')) {
            Schema::table('blogs', function (Blueprint $table) {
                $table->renameColumn('descriptioin', 'description');
            });

            return;
        }

        Schema::table('blogs', function (Blueprint $table) {
            if (! Schema::hasColumn('blogs', 'description')) {
                $table->text('description')->nullable()->after('title');
            }
        });

        if (Schema::hasColumn('blogs', 'descriptioin') && Schema::hasColumn('blogs', 'description')) {
            DB::table('blogs')
                ->whereNull('description')
                ->update(['description' => DB::raw('descriptioin')]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            if (Schema::hasColumn('blogs', 'title')) {
                $table->dropColumn('title');
            }

            if (Schema::hasColumn('blogs', 'description') && ! Schema::hasColumn('blogs', 'descriptioin')) {
                $table->renameColumn('description', 'descriptioin');
            }
        });
    }
};
