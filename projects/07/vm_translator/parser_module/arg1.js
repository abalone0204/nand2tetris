var C=require('../constants.js');

function setArg1(stream) {
    if (stream.commandType === C.ARITHMETIC) {
        stream.arg1 = stream.command;
    } else {
        stream.arg1 = stream.command.split(" ")[1];
    }
    return stream;
}


module.exports.setArg1 = setArg1;