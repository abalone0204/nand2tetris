// Stage 1
var C_ARITHMETIC = 'arithemetic';
var C_PUSH = 'push',
    C_POP = 'pop';
// Stage 2
var C_LABEL;
var C_GOTO, C_IF;
var C_FUNCTION;
var C_RETURN;
var C_CALL;

var arithOps = ['add', 'sub', 'neg',
    'eq', 'gt', 'lt',
    'and', 'or', 'not'
];
var memoOps = ['push', 'pop'];

var test = "push";

function matchArithmetic(op) {
    return !(arithOps.indexOf(op) === -1);
}

function matchMemoryAccess(op) {
    return !(memoOps.indexOf(op) === -1);
}

function setCommandType(stream) {
    var streamObject = {};
    streamObject.command = stream;
    var op = streamObject.command.split(" ")[0];
    if (matchArithmetic(op)) {
        streamObject.commandType = C_ARITHMETIC;
    } else if (matchMemoryAccess(op)) {
        streamObject.commandType = op;
    } else {
        streamObject.commandType = "other";
    }
    return streamObject;
}

module.exports.setCommandType = setCommandType;