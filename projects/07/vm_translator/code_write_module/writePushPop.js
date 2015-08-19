var fs = require('fs');
var path = require('path');
var C = require('../constants.js');
var segments = {
    LOCAL: 'LCL',
    ARGUMENT: 'ARG',
    THIS: 'THIS',
    THAT: 'THAT'
}

function pushLatt(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/latt.asm");
    var seg = segments[command.arg1.toUpperCase()];
    return fs.readFileSync(templatePath).toString()
        .replace(/\$/g, command.arg2)
        .replace(/{.+}/g, seg);
}

function pushConstant(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/" + command.arg1 + ".asm");
    return fs.readFileSync(templatePath).toString().replace(/\$/g, command.arg2);
};

function translate(command) {
    if (command.commandType === C.PUSH) {
        switch (command.arg1) {
            case 'constant':
                return pushConstant(command);
                break;
            case 'local':
            case 'argument':
            case 'this':
            case 'that':
                return pushLatt(command);
                break;
            default:
                return "not yet"
                break;
        }
    };
    return 'shiiiitt';
}

function writePushPop(command) {
    if (command.commandType === C.ARITHMETIC) {
        return command;
    }
    command.asmCode = translate(command);
    return command;
}

module.exports = writePushPop;