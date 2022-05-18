/**
 * implement status helper that does:
 *  - updates status to include the user input for status
 *  - centres status to the middle of the text box by calculating the length of the longest line in the status and halfing it
 *  - allows for converting ASCII Art into a useable status (doesn't have to be perfect)
 */
const StringWidth = require('string-width');

module.exports.convertAsciiArt = async function(asciiArt) {

}

module.exports.getStringWidth = async function(string) {
    return await StringWidth(string);
}

module.exports.formatStatus = async function(userStatus) {
    return `
    
    ██╗░░░██╗██╗░░░██╗██╗░░░░░██╗░░██╗
     ██║░░░██║██║░░░██║██║░░░░░╚██╗██╔╝
      ╚██╗░██╔╝██║░░░██║██║░░░░░░╚███╔╝░
       ░╚████╔╝░██║░░░██║██║░░░░░░██╔██╗░
        ░░╚██╔╝░░╚██████╔╝███████╗██╔╝╚██╗
         ░░░╚═╝░░░░╚═════╝░╚══════╝╚═╝░░╚═╝
         
         
         You can check out Vulx @ discord.gg/aquaplays
         
         
         
         
         ${userStatus}
         
         
         
         
         `
}