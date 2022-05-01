const client = require('ValorantAPI')
const { vulxAxios } = require('./axiosHelper');

//Add logic to re-new access token / regrab if needed (im unsure, havent had val to test)
//Make sure the web interceptor on the vulxAxios instance isnt overwriting the bearer token (should not matter)
//Check if axios is even working (i cant get it to even log the request it attempts, im probally being stupid but its 3am :D)

const getAccessToken = async function() {
    await vulxAxios.get("/entitlements/v1/token", {}).then((res) => {
        if (!res.isAxiosError) {
            logger.debug("Grabbed access token");
            return res.data.accessToken;
        }
    });
}

module.exports.startValorantAPI = async function() {
    const ValApi = new client.Api(client.Region.Europe)
    await getAccessToken().then(async (data) => {
        await ValApi.getEntitlementToken(data)    
    });
   return ValApi;
}

module.exports.client = client;