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

var dealDest = function(dest) {
    var result = [0, 0, 0];
    if (dest.match(/M/)) {
        result[2] = 1;
    }
    if (dest.match(/D/)) {
        result[1] = 1;
    }
    if (dest.match(/A/)) {
        result[0] = 1;
    }
    return result.join('');
};

var dealJump = function(jump) {
    var result = [0, 0, 0];
    if (jump === undefined) {
        return result.join('');
    }
    if (jump === 'JMP') {
        return '111';
    };
    if (jump.match(/G/)) {
        result[2] = 1;
    }
    if (jump.match(/L/)) {
        result[0] = 1;
    }
    if (jump.match(/EQ/)) {
        result[1] = 1;
    }
    if (jump.match(/NE/)) {
        result[0] = 1;
        result[1] = 0;
        result[2] = 1;
    }
    return result.join('');
};



var zeroD = function(n) {
    this[1] = n;
    return this;
};
var negD = function(n) {
    this[2] = n;
    return this;
};
var zeroA = function(n) {
    this[3] = n;
    return this;
};
var negA = function(n) {
    this[4] = n;
    return this;
};

var f = function(n) {
    this[5] = n;
    return this;
};

var no = function(n) {
    this[6] = n;
    return this;
};

Array.prototype.zeroD = zeroD;
Array.prototype.zeroA = zeroA;
Array.prototype.negD = negD;
Array.prototype.negA = negA;
Array.prototype.f = f;
Array.prototype.no = no;

var dealComp = function(comp) {
    var result = [0, 0, 0, 0, 0, 0, 0];
    if (result === undefined) {
        return result.join('');
    }
    if (comp === '0') {
        return result
            .zeroA(1)
            .zeroD(1)
            .f(1);
    }
    if (comp === '1') {
        return result
            .zeroA(1)
            .zeroD(1)
            .negD(1)
            .negA(1)
            .f(1)
            .no(1);
    }
    if (comp === '-1') {
        return result
            .zeroA(1)
            .zeroD(1)
            .negD(1)
            .f(1)
    }

    if (comp.match(/M/)) {
        result[0] = 1;
    } 

    if (comp.match(/D/)) {
        result.zeroD(0);
    } else {
        result.zeroD(1);
    }

    if(comp.match(/A/)) {
        result.zeroA(0);
    } else {
        result.zeroA(1);
    }

    if (comp.match(/\+/)) {
        result.f(1);
    }

    if (comp.match(/\!([DAM])/)) {
        result.f(1);
    }


    return result.join('');
}

var transC = function(underlyingFields) {
    var destCode = dealDest(underlyingFields.dest);
    var compCode = dealComp(underlyingFields.computation);
    var jumpCode = dealJump(underlyingFields.jump);
    // console.log("dest: "+destCode);
    return '111' + compCode + destCode + jumpCode;
};
// Main function
var translate = function(underlyingFields) {
    var commandType = underlyingFields.commandType;
    switch (commandType) {
        case A_COMMAND:
            return transA(underlyingFields);
            break;
        case C_COMMAND:
            return transC(underlyingFields)
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