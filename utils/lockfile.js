var fs = require('fs');
const logger = require('./logger')

async function checkFileExist(path, timeout) {
    let totalTime = 0; 
    let checkTime = timeout / 40;

    return await new Promise((resolve, reject) => {
        const timer = setInterval(function() {
            totalTime += checkTime;
            let fileExists = fs.existsSync(path);

            if (fileExists) {
                clearInterval(timer);
                logger.info("Found Valorant, loaded client")
                resolve(fileExists);
            }
            else if(totalTime >= timeout) {
                clearInterval(timer);
                logger.error("Failed to find Process..")
                process.exit();
            }
            else { 
                logger.info("Waiting for Valorant..") 
            }
        }, checkTime);
    });
}

class lockfile {
    port = null
    password = null
    protocol = null
    async getLockfile() {  
        let returnData;
        const filePath = process.env.LOCALAPPDATA + '\\Riot Games\\Riot Client\\Config\\lockfile';
        logger.info("Checking for lockfile...")
        await checkFileExist(filePath, 120000)
            .then(function(results){
                if(results == true) {
                    var data = fs.readFileSync(filePath, { encoding:'utf8' })
                        .toString()
                        .split(":");
                    returnData = data;
                }
            });
        this.port = returnData[2]
        this.password = returnData[3]
        this.protocol = returnData[4]
        return true;
    }
}

module.exports = lockfile