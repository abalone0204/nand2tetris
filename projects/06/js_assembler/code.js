// less symbolic version

var code = {};
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";

code.hello = function() {
    console.log("hello");
};

var addZero = function(address) {
    var len = 16;
    if (address.length < len) {
        address = '0'.concat(address);
        return addZero(address)
    } else {
        return address;
    }
};

var transA = function(underlyingFields) {
    var address = underlyingFields.register.toString(2);
    return addZero(address);
};

// Main function
var translate = function(underlyingFields) {
    var commandType = underlyingFields.commandType;
    console.log(commandType);
    switch (commandType) {
        case A_COMMAND:
            return transA(underlyingFields)
            break;
        case C_COMMAND:
            break;
        case L_COMMAND:
            break;
        default:
            throw err;
            break;
    };
};
code.translate = translate;

module.exports = code;