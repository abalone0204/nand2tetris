function init(parsedStream) {
    parsedStream.path =parsedStream.path.replace(/\.vm$/, ".asm");
    return parsedStream;
};

module.exports.init = init;