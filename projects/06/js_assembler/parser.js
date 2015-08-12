// Unpacks each instruction into  its underlying fields

var parser = {};
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";

parser.hello = function() {
    console.log("parser's hello");
};
var removeWhiteSpace = function(instruction) {
    return instruction.replace(/\s/g, '');
};
var differAorC = function(instruction) {
    var opCode = instruction[0];
    var label = instruction.match(/^\(.+\)$/);
    if (opCode == "@") {
        return A_COMMAND;
    } else if (label !== null) {
        return L_COMMAND;
    } else {
        return C_COMMAND;
    };
};

var parseInstructionA = function(instruction) {
    var opCode = instruction[0];
    var register = instruction.slice(1, instruction.length);
    var underlyingFields = {
        commanType: A_COMMAND,
        opCode: opCode,
        register: register
    };
    return underlyingFields;
};

var parseInstructionC = function(instruction) {
    var dest;
    var computation;
    var jump;
    if (instruction.match(/(.+)=(.+)/)) {
        var insD = instruction.match(/(.+)=(.+)/);
        dest = insD[1]
        if (insD[2].match(/(.+);(.+)/)) {
            var insDWithJump = insD[2].match(/(.+);(.+)/);
            computation = insDWithJump[1];
            jump = insDWithJump[2];
        } else {
            computation = insD[2];
        }
    } else {
        dest = instruction.match(/(.+);(.+)/)[1];
        jump = instruction.match(/(.+);(.+)/)[2];
    }
    var underlyingFields = {
        commanType: C_COMMAND,
        dest: dest,
        computation: computation,
        jump: jump
    };
    return underlyingFields;
};

var parseInstructionL = function(instruction) {
    var labelName = instruction.match(/^\((.+)\)$/)[1];
    var underlyingFields = {
        commanType: L_COMMAND,
        labelName: labelName
    };
    return underlyingFields;
};

var parseInstruction = function(instruction) {
    instruction = removeWhiteSpace(instruction);
    var commandType = differAorC(instruction);
    switch (commandType) {
        case A_COMMAND:
            return parseInstructionA(instruction);
            break;
        case C_COMMAND:
            return parseInstructionC(instruction);
            break;
        case L_COMMAND:
            return parseInstructionL(instruction);
            break;
        default:
            throw err;
            break;
    }

}
parser.parse = parseInstruction;
module.exports = parser;