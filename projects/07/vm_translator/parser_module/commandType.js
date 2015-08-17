// Stage 1
var C_ARITHMETIC = 'arithemetic';
var C_PUSH, C_POP;
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

var test = "push";

function matchArithmetic(command) {
    var op = command.split(" ")[0];
    return !(arithOps.indexOf(op) === -1);
}

function determineCommandType(command) {
    if (matchArithmetic(command)) {
        return C_ARITHMETIC;
    } else {
        return "other";
    }
}

module.exports=determineCommandType;