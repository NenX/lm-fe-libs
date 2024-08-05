const ora = require('ora');
const chalk = require('chalk');

const ORA_SPINNER = {
    "interval": 80,
    "frames": [
        "   ⠋",
        "   ⠙",
        "   ⠚",
        "   ⠞",
        "   ⠖",
        "   ⠦",
        "   ⠴",
        "   ⠲",
        "   ⠳",
        "   ⠓"
    ]
};
module.exports = (startText = '',) => {
    const spinner = ora({
        text: startText,
        spinner: ORA_SPINNER
    }).start();

    return (endText = '') => {
        spinner.stopAndPersist({
            symbol: chalk.green('   ✔'),
            text: endText
        });
    }
}