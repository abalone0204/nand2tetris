var init = require('./code_write_module/constructor').init;
var writeArithmetic = require('./code_write_module/writeArithmetic');
var writePushPop = require('./code_write_module/writePushPop');

function getStream(parsedStreams) {
    var codeStreams = parsedStreams
        .map((ps) => {
            return init(ps);
        });
    return codeStreams
        .map((codeStream) => {
            return {
                path: codeStream.path,
                streams: codeStream
                    .streams
                    .map((command) => {
                         return writeArithmetic(command);
                     })
                    .map((command) => {
                        return writePushPop(command, codeStream.path)
                    })
            }
        })

}

function codeWrite(parsedStreams) {
    var asmStream = getStream(parsedStreams);
    asmStream.forEach((as) => {
        console.log(as);
        // console.log(as.streams.map((c) => {
        //     return c
        // }));
    })
    return asmStream;

}

module.exports.codeWrite = codeWrite;