/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PRIVATE_KEY = Buffer.from('LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ3N6ZEtST1BacFU1NksKUGQzclNqRWVoRmlrTlZHeUdGRHMvRC9YSzMzYWZETHd3eFFBeWJjQmh0TE9KK2dzUm1iY0lTcnREdnA3TU4zRgprdlJlb3c2eG9DaTZhVVQwQUJQQlVWZ2ZSSm9WL2htb3NMSUFubDZ6WkRtS3J6MTU2ZGVDSCt5WW1QcGU4UlNNCm9mRlI2eTA1UFpvc1NnQVVIOUJON1ZlRjJsQjFWOWRHcXBGeGF6SFY2WTY2ck1rWDNnMHR4L2R4UUlhMVRtaFoKMjlIWG9RZ0pUT3VQT25EajNCZ1Q3U0pUdTdzS1g1RHh5cFhFYXVabDhIclRaaTkvNlV5RjQvbm9Vdzk3WW8wOQpqQS82bXVXRnIrY1I2NGFiQkpVcThPdThwT0Q2ZVJjbTdZSVZLYXJHZGRzanhGVUdiRmlkTXZ5OUVEQVc3eTRUCjFtNGZqa1BKQWdNQkFBRUNnZ0VBT2VvbmFzV0JERTdhb1RGWDZZNHRoVEZNOWdmcXIvb25VUzIvaGJGTlZrYnUKMmJNL3huM1VhRjRUMDhVYk1vK0wxTFlIQ1hsT0tMQjVlMGlqdnYzK0pEanR2WUFmZkhsMEpZUEtPWHlIK2R2MgpKSXZIdEo1ZlZkYyswOFNrb1hIbWFQV2pHWWVYemU4VmVJYWo5dFVQakpJaFZEdWU2Qis3ZEFxYUhVSE1XbTcvCnJGTEdCWW5vVDl4TVFaMWsxUU5zSS9Hd2pWdjVUVnhPUXFIL283Q1Z4OFVhcU5uQ04xcEpzSDFlRjZSdWFMQUgKTFpoeHhoaDRXOUZqcmQ3TWZhcUdodEVCa0RSd3dkeGhjWXA4eDJGZHVZSFJqMVE0S1pmOEczUlc1MC84NVNkNwpHVnZLQlltUkdKc2JxUlNIR2Vad2JBMzBwekdISTk3WHBnODZ5YWtXOHdLQmdRRFljaHd5RldKSXZCbEJJb1NoCldhN0xkalZxNExCNDJKUVRRUmZ1b3NWMXZHZnFZRkloUFJQRUN1SkRRcjBDZkt3N3BJVHJPZkZKM2tqVjhrdWQKbTI5OWd1cFJCTXhZc1o0c3hFV0ZCQ1lScWp3VzkxYXdSaGNFWldNUVQrb2M3TGJJOS8zYkY1dXk0UkV3aW54MgpDWXVlTlBnN25SejliVXpsV1FXSUhjb01Vd0tCZ1FETVlnbjBQcTZkSlpRTFpOM1VzZkFZZFphMFJmYW5HYnJTCkRYTnBSaEhja3h0TkVoRlVxdkdCWjluTldEYXh1OTRORE16VkxORXI1QmJSSXdVVno5dU5iNFo1R3g4UXBXREgKcFc2V0ZWTEpsQyswZzZxL3dnTkoxVTBHNHBVREp6Y2d5RkhLVFVOa0pEWlVBcUt1SVZLMlE0amRhL3g0dGgzbgppZFlwblM4TDh3S0JnR0g1SFB3cW84ZHFwVC9QZ1J1TC9jd0pJTnJWQSt4ZmxIODJxcitSSERKVDZ2R3pVZG5MCnpNT2piWkdtaHVtMlJ6dmtGMnBtV3VybDNEQkRzYWlRc0NHdS9hTll1YXE0RTNJT0VhM0pGL1pOQ1ZBWCt6eGwKTFl3RzNKV0lwdDhhNHc0Syt2U09OaUw5TDR1NlUrWVdJZ1dsMG1zaGpmckUyOWJBdWZsSUNxb1RBb0dBSEY5Mwoxa3BsWHpkNlIrS20wUUlxdkpxR1kxeGJFM09FOWVnY0gzODB0NVJNYy9TUUoxcmIwQVVrdlZjRHNNVE4zSzNzCk9hUFJIZkM2SWlwa2FGVEV1K3ZCbFVwb2s1MEJ4SFY0MXFqN0p6VEZNcUFjc2lZeTRxc1QyR0xZSU9udXcwUkwKNW5PM2FVMkZwVUFBYVlBQ3hYNjJuMWFBWkJtVUtUSi9ZcU9KaG5VQ2dZRUEwVGowNkI2Z1JuWEtFVytZUGtjUAo4RTkwUVFqR04xK0d5a1lnR1pGc3B5c1pYRjl5R0dmME93RlBzYytZV0U5U25HdTQzcjkwMWh2cHRnUU5BUkZyCnhPamI2eTZDeHJOVGpMa01OSHpzRjdDQ3dCcUNjWU5vMXhBVjliTHNOSkxSbEVpTmM5dU8yai9JRUV2SnJJaG8KcFdlOVZxaU9SSjVETGhiOC9oV1ZQdjg9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0KWywoxD0eNmraW6LvGA9DnQpmjRUKOoSTztWXV1CgScqeLa4SmQLOI0RwKeoZGOPOsOmv/O1CJaG3W71nM8w4bb6OlQpnOxNQaSuXWdmQ47mkWeCAV2R8oSRo1HgdHtuUkFO9/K7msmLugGQ2+bzkaIOZM1edeehNC31xF7JdygIscg/w8I1olCFfUD4fr+tlysQXyIxSLLg7s7ae8V69Vhv8aP7lsaGbkNQltJRsK0L1Q+/aq/xEKOC6FKlF7bmCksSlXDZTOjuWNwlNack6w8THbGND+bZ2QYBlKhEhwY2ZR+aHNtO4pyaAMYYb+UvDGzVdpzFk/2JSnOhhnOt9Pg==', 'base64').toString();

module.exports.computeScriptSHA512 = function(scriptPathFolder){
    // check if folder exists
    if (!fs.existsSync(scriptPathFolder)){
        return null;
    }
   
    var scriptPath = path.join(scriptPathFolder, 'index.js');
    return crypto.createHash('sha512').update(fs.readFileSync(scriptPath)).digest('hex');
}

module.exports.checkScriptIntegrity = function(scriptPathFolder, scriptHash){
    var hashFile = path.join(scriptPathFolder, '.hash');
    if(!fs.existsSync(hashFile)){
        return false;
    }
  
    var data = fs.readFileSync(hashFile, 'utf8');
    var decryptedData = decryptData(data);
    return decryptedData != null && decryptedData == scriptHash;
}

const decryptData = function(data){
    return transformData(data, PRIVATE_KEY, true);
}

module.exports.encryptData = function(pubKey, data){
    return transformData(data, pubKey, false);
}

function transformData (data, key, isDecrypt){
    var props = {
        key: key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }
    try{
    if(isDecrypt){
       return crypto.privateDecrypt(props, Buffer.from(data, 'base64')).toString();
    }
    else{
        return crypto.publicEncrypt(props, Buffer.from(data)).toString('base64');
    }
  }
  catch(err){
    return null;
  }
}