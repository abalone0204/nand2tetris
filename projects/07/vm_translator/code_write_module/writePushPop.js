var fs = require('fs');
var path = require('path');
var C= require('../constants.js');
function writePushPop(command) {
    if (command.commandType === C.ARITHMETIC) {
        return command;
    }
    var type = command.commandType;
    var arg1 = command.arg1;
    var arg2 = command.arg2;
    var templatePath = path.join(__dirname, "../asm_templates/"+type+".asm");
    var asmStream= fs.readFileSync(templatePath).toString();
    console.log(asmStream);
    return command;
}

module.exports = writePushPop;