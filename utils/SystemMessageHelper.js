const axiosHelper = require("./axiosHelper");
const Logger = require("./logger");

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
		this.vulxAxios = await axiosHelper.getVulxAxios();
	}

	async sendSystemMessage(message) {
		await this._initialize();
		const conversations = await this.vulxAxios.get("/chat/v6/conversations").then(res => res.data);
		await this.vulxAxios.post("/chat/v6/messages", {
			cid: conversations.conversations[0].cid,
			type: "system",
			message
		}).catch(() => Logger.error("Failed to send system message"));
	}
}

module.exports = new SystemMessageHelper();