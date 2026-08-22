const fs = require('fs');
const path = require('path');

const root = process.cwd();
const releaseDir = path.join(root, 'release');

const filesToCopy = [
    'package.json',
    'package-lock.json',
    'prisma.config.ts',
    '.env.example',
];

const dirsToCopy = [
    'dist',
    'prisma',
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

function writeReleaseReadme() {
    const text = [
        '# Release Bundle',
        '',
        'This directory is generated automatically for deployment.',
        '',
        '## Deploy steps on hosting',
        '',
        '1. Upload all files from this folder.',
        '2. Install production dependencies: npm ci --omit=dev',
        '3. Set environment variables on hosting panel (DATABASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_MINI_APP_URL, PORT).',
        '4. Apply migrations: npm run prisma:migrate:deploy',
        '5. Start service: npm run start:prod',
        '',
        'Or run both steps 4+5 with:',
        'npm run start:prod:migrate',
        '',
    ].join('\n');

    fs.writeFileSync(path.join(releaseDir, 'README_RELEASE.md'), text, 'utf8');
}

function main() {
    ensureExists(path.join(root, 'dist'));
    ensureExists(path.join(root, 'prisma'));
    ensureExists(path.join(root, 'package.json'));

    fs.rmSync(releaseDir, { recursive: true, force: true });
    fs.mkdirSync(releaseDir, { recursive: true });

    for (const file of filesToCopy) {
        copyFileIfExists(file);
    }

    for (const dir of dirsToCopy) {
        copyDir(dir);
    }

    writeReleaseReadme();

    console.log('Release bundle created at:');
    console.log(path.relative(root, releaseDir));
}

main();
