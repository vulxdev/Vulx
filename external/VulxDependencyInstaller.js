const { PluginManager } = require("live-plugin-manager");
const Logger = require('./VulxLogger.js');

const vulxPluginPath = `${homedir()}/AppData/Local/Vulx/plugins/`;
const pluginManager = new PluginManager({ pluginsPath: vulxPluginPath });

module.exports = async moduleName => {
    await pluginManager.install(moduleI)
	return pluginManager.require(moduleName);
};