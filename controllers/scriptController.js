/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const httpStatus = require('http-status');
const readdir = require('fs').readdirSync;
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const encrypt = require('../utils/cryptHelper');
const Logger = require('../utils/Logger');

const getScriptJson = catchAsync(async (req, res) => {
    let scripts = [];
    let scriptFolders = readdir('./scripts/');
    scriptFolders.forEach((f) => {
        // var hash = encrypt.computeScriptSHA512(__dirname + `/../scripts/${f}`);
        // var isValid = encrypt.checkScriptIntegrity(__dirname + `/../scripts/${f}`, hash);
        // if(!isValid) {
        //     return false;
        // } 
        const scriptFiles = readdir(`./scripts/${f}/`);
        scriptFiles.forEach((j) => {
            if (!j.endsWith('.json')) return;
            scripts.push(
                {
                    guid: f,
                    data: JSON.parse(fs.readFileSync(path.join(__dirname, `../scripts/${f}/config.json`), 'utf8'))
                }
            );
        });
    });
    const returnJson = {
        data: scripts
    };
    await res.status(httpStatus.OK).send(returnJson);
});

const updateScript = catchAsync(async (req, res) => {
	const script = require(`../scripts/${req.body.guid}/index.js`);
	eval('script.functions' + '.' + req.body.action + '(req.body.data)');
});

module.exports = {
    updateScript,
    getScriptJson
};