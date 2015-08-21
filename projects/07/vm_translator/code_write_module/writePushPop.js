var C = require('../constants.js');



var pushDispatcher = require('./dispatchers/push_dispatcher.js');
var popDispatcher = require('./dispatchers/pop_dispatcher.js');
function popDispatcher(command, path) {
    return;    
}

function translate(command, path) {
    if (command.commandType === C.PUSH) {
        return pushDispatcher(command, path);
    } else {
        return popDispatcher(command, path);
    };
    return 'shiiiitt';
}

function writePushPop(command, path) {
    if (command.commandType === C.ARITHMETIC) {
        return command;
    }
    command.asmCode = translate(command, path);
    return command;
}

module.exports = writePushPop;