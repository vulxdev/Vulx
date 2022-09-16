/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const AxiosHelper = require("./AxiosHelper");
const Logger = require("./Logger");

class SystemMessageHelper {
	constructor() { }

	async _doInitialize() {
		await this._initializeVulxAxios();
	}

	async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeVulxAxios() {
		this.vulxAxios = await AxiosHelper.getVulxAxios();
	}

	async sendSystemMessage(message) {
		await this._initialize();
		const conversations = await this.vulxAxios.get("/chat/v6/conversations").then(res => res.data);
		await this.vulxAxios.post("/chat/v6/messages", {
			cid: conversations.conversations[0].cid,
			type: "system", // suprised this is undocumented, ok thanks, this is now kyles, yoink, k bi thx x
			message
		}).catch(() => Logger.error("Failed to send system message"));
	}
}

module.exports = new SystemMessageHelper();