/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const readdir = require('fs').readdirSync;
const fs = require('fs');
const { loggers } = require('winston');
const Logger = require("./Logger");
const encrypt = require('./cryptHelper');
const SystemMessageHelper = require("./SystemMessageHelper");

class Script {
	constructor() { }

	async loadScript (scriptFolder, scriptName) {
		try {
			const props = require(`../scripts/${scriptFolder}/${scriptName}`);
			if (props.cfg.enabled === true) {
                var hash = encrypt.computeScriptSHA512(__dirname + `/../scripts/${scriptFolder}`);
                var isValid = encrypt.checkScriptIntegrity(__dirname + `/../scripts/${scriptFolder}`, hash);
                if(!isValid) {
                    Logger.error(`Unable to load script ${scriptFolder}/${scriptName}: File has been modified or is unsafe.`)
                    return;
                } 
				props.run();
				Logger.info(`
                    \n Loaded Script: ${scriptName} in folder ${scriptFolder} 
                    \n Name: ${props.cfg.name} 
                    \n Description: ${props.cfg.description} 
                    \n Author: ${props.cfg.author}
                    \n Url: ${props.cfg.url}
                    \n Version: ${props.cfg.version}
                `);
				await SystemMessageHelper.sendSystemMessage(`♡ Loaded ${scriptFolder}/${scriptName}`);
			}
			return false;
		}
		catch (e) {
			Logger.error(`Unable to load script ${scriptName}: ${e}`);
		}
	};

    async load() {
        try {
            await readdir('./scripts/');
        } catch (e) {
            Logger.error(`Scripts folder is missing missing. Attemping to create folder. \n${e}`);
            await fs.mkdirSync('./scripts/').catch(e => Logger.error(`Unable to create scripts folder. \n${e}`));
        }

        const scriptFolders = await readdir('./scripts/');
        Logger.info(`Loading a total of ${scriptFolders.length} scripts.`);
        scriptFolders.forEach(async (f) => {
            const scriptFiles = await readdir(`./scripts/${f}/`);
            scriptFiles.forEach(async (j) => {
                if (!j.endsWith('.js')) return;
                const response = await this.loadScript(f, j);
                if (response) console.log(response);
            });
        });
    }
}

module.exports = new Script();