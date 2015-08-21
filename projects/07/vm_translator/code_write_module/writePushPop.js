var fs = require('fs');
var path = require('path');
var C = require('../constants.js');
var segments = {
    LOCAL: 'LCL',
    ARGUMENT: 'ARG',
    THIS: 'THIS',
    THAT: 'THAT'
}

function pushStatic(command, pathName) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/static.asm");
    var fileName = pathName.match(/\/(.+).asm/)[1];
    return fs.readFileSync(templatePath).toString()
        .replace(/{.+}/g, fileName)
        .replace(/\$/g, command.arg2);
}

function pushLatt(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/latt.asm");
    var seg = segments[command.arg1.toUpperCase()];
    return fs.readFileSync(templatePath).toString()
        .replace(/\$/g, command.arg2)
        .replace(/{.+}/g, seg);
}

function pushPointer(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/pointer.asm");
    var pointer = command.arg2 === 0 ? "THIS" : "THAT";
    return fs.readFileSync(templatePath).toString()
        .replace(/{.+}/g, pointer);
}

function pushTemp(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/temp.asm");
    return fs.readFileSync(templatePath).toString().replace(/\$/, command.arg2);
}

function pushConstant(command) {
    var templatePath = path.join(__dirname, "../asm_templates/" + command.commandType + "/" + command.arg1 + ".asm");
    return fs.readFileSync(templatePath).toString().replace(/\$/g, command.arg2);
};

function pushDispatcher(command, path) {
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
        case 'pointer':
            return pushPointer(command);
            break;
        case 'temp':
            return pushTemp(command);
            break;
        case 'static':
            return pushStatic(command, path);
            break;
        default:
            return "not yet"
            break;
    }
}

function popDispatcher(command, path) {
    
}

function translate(command, path) {
    if (command.commandType === C.PUSH) {
        return pushDispatcher(command, path);
    } else {
        return popDispatcher(command, path);
    };
    return 'shiiiitt';
}

function writePushPop(command, path) {
    if (command.commandType === C.ARITHMETIC) {
        return command;
    }
    command.asmCode = translate(command, path);
    return command;
}

module.exports = writePushPop;