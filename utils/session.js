const logger = require('./logger')

async function checkSession(client, timeout) {
  let totalTime = 0; 
  let checkTime = timeout / 25;
  let stateConnected;

  return await new Promise((resolve, reject) => {
      const timer = setInterval(function() {
          totalTime += checkTime;

          client.get("/chat/v1/session", {})
            .then((res) => {
              if (res.data.state == "connected") {
                stateConnected = true;
              }
            })
            .catch((reason) => {
              if (reason.response?.status !== 200) {
                logger.error(reason)
            }
          })

          if (stateConnected) {
              clearInterval(timer);
              logger.info("Found session, updating account..")
              resolve(stateConnected);
          }
          else if(totalTime >= timeout) {
              clearInterval(timer);
              logger.error("Failed to connect to session..")
              process.exit();
          }
          else { 
            logger.debug("Connecting to session..") 
        }
      }, checkTime);
  });
}

class session {
    constructor(client) {
      this.client = client
    }
    async getSession() {
      await checkSession(this.client, 120000)
      .then(function(results){
        return results;
      })
    }
}

module.exports = session