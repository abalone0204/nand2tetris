var fs = require('fs');
var path = require('path');
var segments = {
    LOCAL: 'LCL',
    ARGUMENT: 'ARG',
    THIS: 'THIS',
    THAT: 'THAT'
};


function popStatic(command, pathName) {
    var templatePath = path.join(__dirname, "../../asm_templates/" + command.commandType + "/static.asm");
    var fileName = pathName.match(/\/(.+).asm/)[1];
    return fs.readFileSync(templatePath).toString()
        .replace(/{.+}/g, fileName)
        .replace(/\$/g, command.arg2);
}

function popTemp(command) {
    var templatePath = path.join(__dirname, "../../asm_templates/" + command.commandType + "/temp.asm");
    return fs.readFileSync(templatePath).toString()
        .replace(/\$/, command.arg2);
}

function popPointer(command) {
    var templatePath = path.join(__dirname, "../../asm_templates/" + command.commandType + "/pointer.asm");
    var pointer = command.arg2 === 0 ? "THIS" : "THAT";
    return fs.readFileSync(templatePath).toString()
        .replace(/{.+}/g, pointer);
}

function popLatt(command) {
    var templatePath = path.join(__dirname, "../../asm_templates/" + command.commandType + "/latt.asm");
    var seg = segments[command.arg1.toUpperCase()];
    return fs.readFileSync(templatePath).toString()
        .replace(/\$/g, command.arg2)
        .replace(/{.+}/g, seg);
}

function popDispatcher(command, path) {
    switch (command.arg1) {
        case 'local':
        case 'argument':
        case 'this':
        case 'that':
            return popLatt(command);
            break;
        case 'pointer':
            return popPointer(command);
            break;
        case 'temp':
            return popTemp(command);
            break;
        case 'static':
            return popStatic(command, path);
            break;
        default:
            return "not yet"
            break;

    }
    return;
}


module.exports = popDispatcher;