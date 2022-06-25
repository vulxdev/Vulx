const axios = require('axios');
const https = require('https');

const LockFile = require('./lockfile');

const lockFile = new LockFile();

const axiosHelperInit = async () => {
    await lockFile.getLockfile();
}

const vulxAxios = axios.create({
    timeout: 1000,
    headers: {
        common: {
            'User-Agent': 'ShooterGame/8 Windows/10.0.19042.1.768.64bit', 
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuNzY4LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-04.07-shipping-13-697073',
            'Content-Type': 'application/json'
        },
        put: {
            'Content-Type': 'application/json'
        }
    },
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
});

vulxAxios.interceptors.request.use(function(config) {
    config.baseURL = `https://127.0.0.1:${lockFile.port}`;
    config.headers.common['Authorization'] = 'Basic ' + Buffer.from(`riot:${lockFile.password}`).toString('base64');
    return config;
})

vulxAxios.interceptors.response.use(
    response => response
)

module.exports = {
    axiosHelperInit,
    vulxAxios,
    lockFile
}