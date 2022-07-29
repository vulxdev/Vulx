const eastAsianWidth = require("eastAsianWidth");
const emojiRegex = require("emoji-regex");

function stringWidth(string, options = {}) {
	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	options = {
		ambiguousIsNarrow: true,
		...options
	};

    const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
	].join('|');

	string = string.replace(pattern, '');

	if (string.length === 0) {
		return 0;
	}

	string = string.replace(emojiRegex(), '  ');

	const ambiguousCharacterWidth = options.ambiguousIsNarrow ? 1 : 2;
	let width = 0;

	for (const character of string) {
		const codePoint = character.codePointAt(0);

		// Ignore control characters
		if (codePoint <= 0x1F || (codePoint >= 0x7F && codePoint <= 0x9F)) {
			continue;
		}

		// Ignore combining characters
		if (codePoint >= 0x300 && codePoint <= 0x36F) {
			continue;
		}

		const code = eastAsianWidth.eastAsianWidth(character);
		switch (code) {
			case 'F':
			case 'W':
				width += 2;
				break;
			case 'A':
				width += ambiguousCharacterWidth;
				break;
			default:
				width += 1;
		}
	}

	return width;
}

module.exports.convertAsciiArt = function(asciiArt) {
    asciiArt = asciiArt.replace(/[^(\\x20-\\x7F\\n)]+/u, " ");
    return asciiArt;
}

module.exports.formatStatus = function(userStatus) {
    let vulxStatus = `

    ██╗░░░██╗██╗░░░██╗██╗░░░░░██╗░░██╗
     ██║░░░██║██║░░░██║██║░░░░░╚██╗██╔╝
      ╚██╗░██╔╝██║░░░██║██║░░░░░░╚███╔╝░
       ░╚████╔╝░██║░░░██║██║░░░░░░██╔██╗░
        ░░╚██╔╝░░╚██████╔╝███████╗██╔╝╚██╗
         ░░░╚═╝░░░░╚═════╝░╚══════╝╚═╝░░╚═╝


        (MOTD)




            (STATUS)




`

    let motd = "You can check out Vulx @ discord.gg/aquaplays"

    const longestLineLength = Math.max(...(vulxStatus.split(/[\r\n]/gm).map(el => stringWidth(el))));

    vulxStatus = vulxStatus.replace("(MOTD)", ' '.repeat(longestLineLength - Math.floor(stringWidth(motd) / 2)) + motd);
    vulxStatus = vulxStatus.replace("(STATUS)", ' '.repeat(longestLineLength - Math.floor(stringWidth(userStatus) / 2)) + userStatus);

    return vulxStatus;
}

module.exports.formatSmallStatus = function(userStatus) {
    let vulxStatus = `
            (STATUS)


			(MOTD)
`

    let motd = `Check out Vulx @ discord.gg/aquaplays`

    const longestLineLength = Math.max(...(vulxStatus.split(/[\r\n]/gm).map(el => stringWidth(el))));

    vulxStatus = vulxStatus.replace("(MOTD)", ' '.repeat(longestLineLength - Math.floor(stringWidth(motd) / 2)) + motd);
    vulxStatus = vulxStatus.replace("(STATUS)", ' '.repeat(longestLineLength - Math.floor(stringWidth(userStatus) / 2)) + userStatus);

    return vulxStatus;
}