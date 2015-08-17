// Stage 1
var C= require('../constants.js');

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
        streamObject.commandType = C.ARITHMETIC;
    } else if (matchMemoryAccess(op)) {
        streamObject.commandType = op;
    } else {
        streamObject.commandType = "other";
    }
    return streamObject;
}

module.exports.setCommandType = setCommandType;