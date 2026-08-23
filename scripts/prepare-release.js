const fs = require('fs');
const path = require('path');

const root = process.cwd();
const releaseDir = path.join(root, 'release');

const filesToCopy = [
    '.env.example',
];

const dirsToCopy = [
    'dist',
];

function ensureExists(targetPath) {
    if (!fs.existsSync(targetPath)) {
        throw new Error(`Missing required path: ${targetPath}`);
    }
}

function copyFileIfExists(relativePath) {
    const from = path.join(root, relativePath);
    if (!fs.existsSync(from)) {
        return;
    }
    const to = path.join(releaseDir, relativePath);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
}

function copyDir(relativePath) {
    const from = path.join(root, relativePath);
    const to = path.join(releaseDir, relativePath);
    fs.cpSync(from, to, { recursive: true, force: true });
}

function removeLicenseSidecars() {
    const distDir = path.join(releaseDir, 'dist');
    if (!fs.existsSync(distDir)) {
        return;
    }

    const files = fs.readdirSync(distDir);
    for (const file of files) {
        if (file.endsWith('.LICENSE.txt')) {
            fs.rmSync(path.join(distDir, file), { force: true });
        }
    }
}

function createMinimalPackageJson() {
    const original = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

    const minimal = {
        name: original.name,
        version: original.version,
        description: 'Production build - all dependencies bundled in dist/main.js',
        scripts: {
            start: 'node dist/main.js'
        },
        engines: {
            node: '>=18.0.0'
        }
    };

    fs.writeFileSync(
        path.join(releaseDir, 'package.json'),
        JSON.stringify(minimal, null, 2),
        'utf8'
    );
}

function writeReleaseReadme() {
    const text = [
        '# Release Bundle',
        '',
        'This directory is generated automatically for deployment.',
        '',
        '## ВАЖНО: Все зависимости уже включены в dist/main.js',
        '',
        'НЕ запускайте `npm install` на хостинге! Это вызовет ошибку TAR_ENTRY_ERROR из-за лимита inodes.',
        'Webpack собрал все зависимости (TypeORM, pg, NestJS и др.) в один файл dist/main.js.',
        '',
        '## Deploy steps on aHOST',
        '',
        '1. Загрузите все файлы из этой папки через FTP/File Manager',
        '2. В cPanel установите переменные окружения:',
        '   - NODE_ENV=production',
        '   - DATABASE_URL=postgresql://user:password@localhost:5432/db',
        '     ⚠ ВАЖНО: используйте localhost (НЕ внешний IP хостинга!)',
        '     ⚠ Если пароль содержит спецсимволы (&$;=*@#), используйте URL-encoding:',
        '     & → %26, $ → %24, ; → %3B, = → %3D, * → %2A',
        '     Инструмент: https://www.urlencoder.org/',
        '   - DB_SSL=false (важно! aHOST не поддерживает SSL для PostgreSQL)',
        '   - TELEGRAM_BOT_TOKEN=ваш_токен',
        '   - TELEGRAM_MINI_APP_URL=ваш_url',
        '   - PORT=3000 (или другой)',
        '3. В настройках Node.js приложения укажите:',
        '   - Application URL: ваш домен',
        '   - Application startup file: dist/main.js',
        '   - Node.js version: 18.x или выше',
        '4. НЕ устанавливайте зависимости! Просто запустите приложение.',
        '',
        '## Размер bundle',
        '',
        'dist/main.js содержит весь код приложения и все зависимости.',
        'Размер файла: ~3-5 MB.',
        'Количество файлов: 3 (package.json, dist/main.js, .env.example).',
        '',
        '## Миграции',
        '',
        'Миграции применяются автоматически при старте приложения.',
        '',
        '## Решение проблем',
        '',
        '### "The server does not support SSL connections"',
        'Убедитесь, что переменная окружения DB_SSL=false.',
        '',
        '### "uuid-ossp.control: No such file or directory"',
        'Расширение uuid-ossp недоступно на shared hosting.',
        'Проект использует gen_random_uuid() (встроенная функция PostgreSQL 13+).',
        'Пересоберите проект: npm run build && npm run release:prepare',
        '',
        '### "connect ECONNREFUSED"',
        'В DATABASE_URL используйте localhost, а не внешний IP хостинга.',
        'Правильно: postgresql://user:pass@localhost:5432/db',
        '',
        '### "password authentication failed"',
        'Специальные символы в пароле должны быть URL-encoded в DATABASE_URL.',
        'Например, пароль "a&b$c" должен быть "a%26b%24c".',
        'Инструмент: https://www.urlencoder.org/',
        '',
        '### "TAR_ENTRY_ERROR / Disk quota exceeded"',
        'Не запускайте npm install! Все зависимости уже в dist/main.js.',
        '',
    ].join('\n');

    fs.writeFileSync(path.join(releaseDir, 'README_RELEASE.md'), text, 'utf8');
}

function main() {
    ensureExists(path.join(root, 'dist'));
    ensureExists(path.join(root, 'package.json'));

    fs.rmSync(releaseDir, { recursive: true, force: true });
    fs.mkdirSync(releaseDir, { recursive: true });

    for (const file of filesToCopy) {
        copyFileIfExists(file);
    }

    for (const dir of dirsToCopy) {
        copyDir(dir);
    }

    removeLicenseSidecars();

    createMinimalPackageJson();

    writeReleaseReadme();

    console.log('✓ Release bundle created at:');
    console.log('  ' + path.relative(root, releaseDir));
    console.log('');
    console.log('✓ Bundle size:');
    const mainJsPath = path.join(releaseDir, 'dist', 'main.js');
    if (fs.existsSync(mainJsPath)) {
        const stats = fs.statSync(mainJsPath);
        console.log('  ' + (stats.size / 1024 / 1024).toFixed(2) + ' MB');
    }
    console.log('');
    console.log('⚠ ВАЖНО: НЕ запускайте npm install на хостинге!');
    console.log('  Все зависимости уже включены в dist/main.js');
}

main();
