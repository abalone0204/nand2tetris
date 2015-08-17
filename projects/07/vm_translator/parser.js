var init = require('./parser_module/constructor').init;
var path = process.argv[2];
var setCommandType = require('./parser_module/commandType.js').setCommandType;
var setArg1 = require('./parser_module/arg1.js').setArg1;

function getStream(input) {
    return input.dataStream.map((fileStream) => {
        return {
            path: fileStream.path,
            stream: fileStream.stream
                .map((inputStream) => {
                    return inputStream
                        .replace(/\/\/.+/, '')
                        .replace(/\r/g, '');
                })
                .filter((command) => {
                    return command !== "";
                })
                .map((command) => {
                    return command;
                })
        };
    });

}

function parse(path) {
    var input = init(path);
    var fileStreams = getStream(input);
    return fileStreams.map((fileStream) => {
        return {
            path: fileStream.path,
            stream: fileStream.stream
                .map((stream) => {
                    return setCommandType(stream);
                })
                .map((stream) => {
                    return setArg1(stream);
                })
        }
    });
}

module.exports.parse = parse;