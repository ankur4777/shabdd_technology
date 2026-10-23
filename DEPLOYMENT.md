# Shared hosting deployment

The server layout is:

```text
account-root/
  laravel-backend/       Laravel code, vendor, .env, database and writable storage
  public_html/           Contents of the local build folder
    index.html           React frontend
    index.php            Laravel entry point
    .htaccess            React, API, admin and Livewire routing
    static/              Compiled React CSS and JavaScript
    css/filament/        Filament styles
    js/filament/         Filament JavaScript
    fonts/filament/      Filament fonts
    storage/             Existing uploaded images; preserved separately
```

## Build

Install Node dependencies at the project root and Composer dependencies in
`laravel-backend` first. PHP must be available on PATH and Laravel must have a
working `.env`.

The root `.env.production` sets the blog API to
`https://shabddtechnology.in/api` and the contact endpoint to
`https://shabddtechnology.in/api/contact` for production builds. These are public
URLs, not credentials. Local `.env.production.local` overrides take precedence;
keep any such overrides aligned with the production domain.

```bash
npm run build
```

This builds React, runs `php artisan filament:assets` against the installed
backend, and copies the published CSS, JavaScript and fonts into `build`.
Existing Laravel Vite assets in `laravel-backend/public/build` are included when
present. The build fails if required assets cannot be prepared.

## Upload

1. Upload the **contents** of `build/` into `public_html/`, including the hidden
   `.htaccess`. Do not upload `build` as a nested directory.
2. Upload backend code changes to the sibling `laravel-backend/` directory.
   Keep the server's `.env`, database and uploaded files. Install/update backend
   Composer dependencies when they change.
3. After a backend or configuration deployment, clear stale Laravel caches:

   ```bash
   cd laravel-backend
   php artisan optimize:clear
   ```

The public entry point sets Laravel's public path to `public_html`. The public
filesystem disk uses `public_path('storage')`, so web uploads are stored in
`public_html/storage` with this layout. Preserve that directory when uploading
new builds; it is deliberately excluded from the generated package. Existing
images in a different location need to be transferred separately once.

For scheduled jobs or Artisan commands that write to the public disk, set
`APP_PUBLIC_PATH` in the **server** backend `.env` to the absolute path of
`public_html` (for example `/home/account/domains/shabddtechnology.in/public_html`;
replace the account path with the real hosting path).
The public filesystem disk then uses the same storage directory for CLI and web
requests. Leave this unset locally.

Use these values in the server's backend `.env`:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://shabddtechnology.in
APP_STORAGE_URL=https://shabddtechnology.in/storage
FILESYSTEM_DISK=public
```

Keep the existing `APP_KEY`, database credentials and mail credentials. Backend
`.env` files are never copied into `build`. The admin login URL is
`https://shabddtechnology.in/admin/login`.

Apache/LiteSpeed must support `.htaccess` rewrite rules. `/admin`, `/api`,
`/livewire` and `/up` are handled by Laravel; other page routes use React.
Missing asset requests return 404 instead of React HTML.

After uploading, verify the home page, a React page such as `/about`,
`/admin/login`, a blog API response, and a known `/storage/...` image URL.
