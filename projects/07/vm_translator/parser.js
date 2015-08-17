var init = require('./parser_module/constructor').init;
var path = process.argv[2]
function getStream(input) {
    return input.dataStream.map((fileStream) => {
        return {
            path: fileStream.path,
            stream: fileStream.stream
                .map((inputStream) => {
                    return inputStream.replace(/\/\/.+/, '')
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
    return getStream(input);
}

module.exports.parse = parse;