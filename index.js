const path = require('path');
const logger = require('./utils/logger');

// TODO: Figure out why the actual fuck pkg doesn't include this in the compiled exe even after having it included through pkg config
path.join(__dirname, 'public/css/style.css');
path.join(__dirname, 'public/js/vulx.load.js');
path.join(__dirname, 'public/js/vulx.request.reset.js');
path.join(__dirname, 'public/js/vulx.request.session.js');
path.join(__dirname, 'public/js/vulx.request.settings.js');
path.join(__dirname, 'public/js/vulx.request.friends.js');
path.join(__dirname, 'public/js/vulx.welcome.js'); 
path.join(__dirname, 'public/experimental.html');
path.join(__dirname, 'public/gamefeed.html');
path.join(__dirname, 'public/dashboard.html');
path.join(__dirname, 'public/index.html');
path.join(__dirname, 'public/welcome.html');

logger.debug("You are in debug mode, this is a feature to print verbose debug information to the console.");
require('./vulx')();