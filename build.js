// build.js
const exe = require('@angablue/exe');

const build = exe({
    entry: './index.js',
    out: './build/Vulx.exe',
    pkg: ['--config', 'package.json'],
    version: '1.0.0',
    target: 'node17-win-x64',
    icon: './public/icon.ico',
    properties: {
        FileDescription: 'Vulx',
        ProductName: 'Vulx',
        LegalCopyright: 'Vulx Team - All Rights Reserved',
        OriginalFilename: 'Vulx.exe'
    }
});

build.then(() => console.log('Build completed!'));