var C= require('../constants.js');



function setArg2 (stream) {
    var targetTypes = [C.PUSH, C.POP, C.FUNCTION, C.CALL];
    if (targetTypes.indexOf(stream.commandType) !== -1) {
        stream.arg2 = parseInt(stream.command.split(" ")[2]);
    }
    return stream;
}

module.exports.setArg2 = setArg2;