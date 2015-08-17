var init = require('./parser_module/constructor').init;
var path = process.argv[2]
var commandType = require('./parser_module/commandType.js')
var arg1 = 

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
            stream: fileStream.stream.map((command) => {
                return {
                    commandType: commandType(command),
                    command: command
                };
            })
        }
    });
}

module.exports.parse = parse;