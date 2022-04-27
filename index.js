//Add logs only for debug mode
const path = require('path');
const fs = require('fs');
const https = require('https');
const open = require('open');
const discord = require("./utils/discord")
const lockfile = require('./utils/lockfile')
const logger = require('./utils/logger')
const session = require('./utils/session')
const express = require('express');
const configHelper = require('./utils/configHelper');
const portfinder = require('portfinder')

const app = express();

const config = configHelper.getConfig();
const valConfig = configHelper.getValConfig();
//const lolConfig = configHelper.getLolConfig();

portfinder.basePort = config.port;
portfinder.highestPort = config.port + 100;
let port;

process.argv.forEach(arg => {
	if (arg.includes("debug")) {
		logger.debugMode = true;
		logger.debug("Debug mode enabled!");
	}
})

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// TODO: Figure out why the actual fuck pkg doesn't include this in the compiled exe even after having it included through pkg config
path.join(__dirname, 'public/style.css')

async function createJson(settings, leagueToggle) {
	const lolConfig = configHelper.getLolConfig();
	const lolSettingsEncoded = JSON.stringify(lolConfig).toString()
	return JSON.stringify(
		{
			"state": "chat",
			"msg": "i hate this game ♥",
			"private": leagueToggle ? lolSettingsEncoded : Buffer.from(settings).toString('base64'),
			"shared": {
				"actor": "",
				"details": "",
				"location": "",
				"product": leagueToggle ? "league_of_legends" : "valorant",
				"time": new Date().valueOf() + 10000000 //Extended timestamp to allow update bypass
			}
		}
	);
}

async function startInstance() {
	port = await portfinder.getPortPromise();

	if (port != config.port)
		logger.info(`Dashboard port changed from ${config.port} to ${port}`);

	const file = new lockfile()
	await file.getLockfile()

	const axios = require('axios').create({
		baseURL: `https://127.0.0.1:${file.port}`,
		timeout: 1000,
		headers: {
			'Authorization': 'Basic ' + Buffer.from(`riot:${file.password}`).toString('base64'), 
			'User-Agent': 'ShooterGame/8 Windows/10.0.19042.1.768.64bit', 
			'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuNzY4LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
			'X-Riot-ClientVersion': 'release-04.07-shipping-13-697073',
			'Content-Type': 'application/json'
		},
		httpsAgent: new https.Agent({  
			rejectUnauthorized: false
		})
	});

	app.get("/", (req, res) => {
		res.set({ "Allow-access-Allow-Origin": "*" });
		res.sendFile(path.join(__dirname, '/public/welcome.html'));
	});

	app.post("/updatePresence", async (req, res) => {
		const valConfig = configHelper.getValConfig();
		valConfig.queueId = req.body.status;
		valConfig.competitiveTier = req.body.rank;
		valConfig.leaderboardPosition = req.body.position;
		valConfig.accountLevel = req.body.level;
		valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
		valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;
		fs.writeFileSync("./valorant.json", JSON.stringify(valConfig));
		let json = await createJson(JSON.stringify(valConfig), false)
		discord.update(req.body.status)
		return sendRequest("/chat/v2/me", json) && res.sendFile(path.join(__dirname, '/public/index.html'));
	});

	app.post("/updateSettings", async (req, res) => {
		const cfg = configHelper.getConfig();
		logger.debug(req.body)
		switch (req.body.updateType) {
			case "settingsIndex":
				cfg.experimental = req.body.experimentalFeatures === "true" ? true : false;
				cfg.discordRpc = req.body.discordRpc === "true" ? true : false;
				break;
			case "settingsWelcome":
				cfg.firstLaunch = req.body.firstLaunch;
				cfg.discordRpc = req.body.data.discordRpc === "true" ? true : false;
				cfg.experimental = req.body.data.testFeatures === "true" ? true : false;
				break;
			default:
				break;
		}
		//using the debug config field, log that the settings were updated
		fs.writeFileSync("./config.json", JSON.stringify(cfg));
		return res.sendFile(path.join(__dirname, '/public/index.html'));
	});

	app.post("/resetAccount", async (req, res) => {
		if(req.body.resetAccount == true) {
			logger.debug("Account reset")
			fs.unlinkSync("./valorant.json");
			fs.unlinkSync("./config.json");
			fs.unlinkSync("./league_of_legends.json");
			return true;
		}
		return true;
	});

	app.get("/currentSettings", (req, res) => {
		const valConfig = configHelper.getValConfig();
		const data = {
			queueId: valConfig.queueId,
			competitiveTier: valConfig.competitiveTier,
			leaderboardPosition: valConfig.leaderboardPosition,
			accountLevel: valConfig.accountLevel,
			partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
			partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam
		}
		logger.debug(data)
		return res.send(data);
	});

	app.get("/userSession", (req, res) => {
		const cfg = configHelper.getConfig();
		axios.get("/chat/v1/session", {})
            .then((response) => {
				const data = {
					session: response.data,
					config: cfg,
					port: file.port,
					password: Buffer.from(`riot:${file.password}`).toString('base64')
				}
				logger.debug(data)
				return res.send(data);
            })
            .catch((reason) => {
              if (reason.response?.status !== 200) {
                logger.error(reason)
            }
		})
	});

	app.listen(port, () => {
		logger.debug(`Dashboard started on port: ${port}`);
		if(process.pkg)
			open('http://127.0.0.1:' + port);
	});

	async function sendRequest(endpoint, requestData) {
		axios.put(endpoint, requestData)
			.then((res) => {
			if (!res.isAxiosError) {
				logger.debug("Updated account")
				return res;
			}
		  })
		.catch(async (reason)=> {
			if (reason.response?.status == 503) {
				const checkSession = new session(axios)
				await checkSession.getSession()
				.then(function(results){
					axios.put(endpoint, requestData)
					.then((res) => {
						logger.debug("Updated account")
						return res;
					})
				});
			}
			else if (reason.response?.status !== 200) {
				logger.error(reason)
			}
		})
	}

	let jsonData = await createJson(JSON.stringify(valConfig), false)
	await sendRequest("/chat/v2/me", jsonData);
	discord.update("Playing Valorant")
}
discord.startRPC();
startInstance();
