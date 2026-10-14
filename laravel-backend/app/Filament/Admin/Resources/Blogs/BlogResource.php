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
use Filament\Forms\Components\Repeater;
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
                        'WEB DEVELOPMENT' => 'WEB DEVELOPMENT',
                        'WEB APPLICATION' => 'WEB APPLICATION',
                        'DIGITAL MARKETING' => 'DIGITAL MARKETING',         
                        'SEO' => 'SEO',
                        'META ADS' => 'META ADS',
                        'GRAPHIC DESIGNER' => 'GRAPHIC DESIGNER',
                        'YOUTUBE ADS' => 'YOUTUBE ADS',
                       
                    ])
                    ->required(),

                // 3. Publish Date (e.g. Aug 08, 2024)
                DatePicker::make('published_date')
                    ->label('Publish Date')
                    ->default(now())
                    ->required(),

                TextInput::make('read_time')
                    ->label('Read Time (minutes)')
                    ->numeric()
                    ->default(5)
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

                Textarea::make('introduction')
                    ->label('Introduction Text')
                    ->rows(4)
                    ->columnSpanFull(),

                TextInput::make('author_name')
                    ->label('Author Name')
                    ->default('Priya Sharma')
                    ->required(),

                TextInput::make('author_role')
                    ->label('Author Position / Role')
                    ->default('Content Writer at Shabdd Technology')
                    ->required(),

                FileUpload::make('author_image')
                    ->label('Author Image')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
                    ->disk('public')
                    ->directory('authors')
                    ->imagePreviewHeight('80')
                    ->columnSpanFull(),

                Textarea::make('author_bio')
                    ->label('Author Bio')
                    ->rows(3)
                    ->default('Passionate about technology, digital marketing, and helping businesses grow through innovative content.')
                    ->columnSpanFull(),

                Repeater::make('content_sections')
                    ->label('Detail Page Sections')
                    ->schema([
                        TextInput::make('heading')
                            ->label('Subtitle / Section Heading')
                            ->required(),
                        Textarea::make('body')
                            ->label('Section Description')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),
                    ])
                    ->defaultItems(2)
                    ->addActionLabel('Add Section')
                    ->itemLabel(fn (array $state): ?string => $state['heading'] ?? 'Section')
                    ->reorderableWithButtons()
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
                TextColumn::make('author_name')->label('Author')->searchable(),
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

