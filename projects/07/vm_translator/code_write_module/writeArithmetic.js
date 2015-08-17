var C = require('../constants.js')
var asm = require('../asm_components.js');
var GOTO_TOP_STACK = asm.GOTO_TOP_STACK;
var SP_INC = asm.SP_INC;

function transAdd() {
    return GOTO_TOP_STACK + "D=M\n" + GOTO_TOP_STACK + "D=D+M\nM=D\n" + SP_INC;
}

function writeArithmetic(commandStream) {
    if (commandStream.commandType !== C.ARITHMETIC) {
        return commandStream;
    }
    var arithName = commandStream.arg1;
    var arithCodeStream = {};
    arithCodeStream.command = arithName;
    arithCodeStream.commandType = commandStream.commandType;
    switch (arithName) {
        case 'add':
            arithCodeStream.asmCode = transAdd();
            break;
        default:
            arithCodeStream.asmCode = "aa\naa\n";
            break;
    }
    return arithCodeStream;
};
module.exports = writeArithmetic;