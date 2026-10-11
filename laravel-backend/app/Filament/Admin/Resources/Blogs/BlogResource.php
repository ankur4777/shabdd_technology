<?php

namespace App\Filament\Admin\Resources\Blogs;

use App\Filament\Admin\Resources\Blogs\Pages\CreateBlog;
use App\Filament\Admin\Resources\Blogs\Pages\EditBlog;
use App\Filament\Admin\Resources\Blogs\Pages\ListBlogs;
use App\Models\Blog;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    // CHANGED THIS LINE from 'Blog' to 'title' (matches our database column)
    protected static ?string $recordTitleAttribute = 'title';

    // =========================================================================
    // 1. HERE IS WHERE WE ADDED THE ADMIN FORM INPUTS (Instead of BlogForm)
    // =========================================================================
    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                // 1. Card Image Upload
                FileUpload::make('image')
                    ->label('Card Image')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
                    ->disk('public')
                    ->directory('blogs')
                    ->required()
                    ->columnSpanFull(),

                // 2. Category Label (e.g. DIGITAL MARKETING)
                Select::make('category')
                    ->label('Category Label')
                    ->options([
                        'DIGITAL MARKETING' => 'DIGITAL MARKETING',
                        'WEB DEVELOPMENT' => 'WEB DEVELOPMENT',
                        'SEO' => 'SEO',
                        'DESIGN' => 'DESIGN',
                        'E-COMMERCE' => 'E-COMMERCE',
                        'TECHNOLOGY' => 'TECHNOLOGY',
                        'BUSINESS' => 'BUSINESS',
                    ])
                    ->required(),

                // 3. Publish Date (e.g. Aug 08, 2024)
                DatePicker::make('published_date')
                    ->label('Publish Date')
                    ->default(now())
                    ->disabled()
                    ->dehydrated()
                    ->required(),

                // 4. Blog Title
                TextInput::make('title')
                    ->label('Blog Title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (?string $state, Set $set) => $set('slug', Str::slug($state ?? ''))),

                // URL Slug (Auto-filled from Title for "Read More ->")
                TextInput::make('slug')
                    ->label('URL Slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                // 5. Short Description
                Textarea::make('description')
                    ->label('Short Description')
                    ->rows(3)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    // =========================================================================
    // 2. HERE IS WHERE WE ADDED THE ADMIN TABLE COLUMNS (Instead of BlogsTable)
    // =========================================================================
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->visibility('public')
                    ->imageHeight(60)
                    ->imageWidth(90)
                    ->label('Image'),
                TextColumn::make('category')->badge()->searchable(),
                TextColumn::make('title')->searchable()->limit(40),
                TextColumn::make('published_date')->date('M d, Y')->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBlogs::route('/'),
            'create' => CreateBlog::route('/create'),
            'edit' => EditBlog::route('/{record}/edit'),
        ];
    }
}

