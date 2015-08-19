var fs = require('fs');
var path = require('path');
var C = require('../constants.js')
var asm = require('../asm_components.js');
var GOTO_TOP_STACK = asm.GOTO_TOP_STACK;
var SP_INC = asm.SP_INC;
var commandIndex = 0;

function comparisonASM(command) {
    var op = command.toUpperCase();
    var templatePath = path.join(__dirname, "../asm_templates/comparison.asm")
    var comparisonTemplate = fs.readFileSync(templatePath).toString();
    // var ltStream = logicalTemplate.split("\n")
    cpStream = comparisonTemplate
        .replace(/\$/g, commandIndex)
        .replace(/{.+}/, op);
    commandIndex += 1;
    return ltStream
};

function logicalASM(command) {
    var op = command === "and" ? "&" : "|";
    var templatePath = path.join(__dirname, "../asm_templates/logical.asm");
    var lgStream = fs.readFileSync(templatePath)
        .toString().replace(/{.+}/, op);
    return lgStream;
}
function translate(command) {
    switch (command) {
        case 'add':
            return GOTO_TOP_STACK + "D=M\n" + GOTO_TOP_STACK + "D=D+M\nM=D\n" + SP_INC;
            break;
        case 'sub':
            return GOTO_TOP_STACK + "D=M\n" + GOTO_TOP_STACK + "M=M-D" + SP_INC;
            break;
        case 'neg':
            return GOTO_TOP_STACK + "M=-M\n" + SP_INC;
            break;
        case 'not':
            return GOTO_TOP_STACK + "M=!M\n" + SP_INC;
            break;
        case 'gt':
        case 'lt':
        case 'eq':
            return comparisonASM(command);
            break;
        case 'and':
        case 'or':
            return logicalASM(command);
            break;
        default:
            return "aa\naa\n";
            break;
    }
}


function writeArithmetic(commandStream) {
    if (commandStream.commandType !== C.ARITHMETIC) {
        return commandStream;
    }
    var arithName = commandStream.arg1;
    var arithCodeStream = {};
    arithCodeStream.command = arithName;
    arithCodeStream.commandType = commandStream.commandType;
    arithCodeStream.asmCode = translate(arithName)
    return arithCodeStream;
};
module.exports = writeArithmetic;