const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const backendRoot = path.join(projectRoot, 'laravel-backend');
const backendPublic = path.join(backendRoot, 'public');
const buildRoot = path.join(projectRoot, 'build');

function requireFile(file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    throw new Error(`Missing required file: ${path.relative(projectRoot, file)}`);
  }
}

try {
  requireFile(path.join(backendRoot, 'vendor', 'autoload.php'));
  requireFile(path.join(buildRoot, 'index.html'));

  // Publish assets from the installed Filament version before packaging them.
  const result = spawnSync('php', ['artisan', 'filament:assets', '--no-interaction'], {
    cwd: backendRoot,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw new Error(`Cannot publish Filament assets. PHP must be on PATH. ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error('Filament asset publishing failed. Check the Laravel installation above.');
  }

  // Only public application assets belong in public_html. Never copy .env,
  // vendor, database files, caches, or uploaded storage from the backend.
  for (const directory of ['css', 'js', 'fonts']) {
    const source = path.join(backendPublic, directory);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing Filament asset directory: ${source}`);
    }
    fs.cpSync(source, path.join(buildRoot, directory), { recursive: true, dereference: true });
  }

  // Include Laravel Vite assets too if this backend uses them.
  const viteBuild = path.join(backendPublic, 'build');
  if (fs.existsSync(viteBuild)) {
    fs.cpSync(viteBuild, path.join(buildRoot, 'build'), { recursive: true, dereference: true });
  }

  for (const file of ['index.php', '.htaccess']) {
    fs.copyFileSync(path.join(projectRoot, 'public', file), path.join(buildRoot, file));
  }

  for (const file of [
    'index.php',
    '.htaccess',
    'css/filament/filament/app.css',
    'js/filament/filament/app.js',
  ]) {
    requireFile(path.join(buildRoot, file));
  }

  console.log('\nDeployment ready: upload the CONTENTS of build/ into public_html/.');
  console.log('Keep laravel-backend/ beside public_html/ and preserve public_html/storage/.');
} catch (error) {
  console.error(`\nDeployment packaging failed: ${error.message}`);
  process.exitCode = 1;
}
