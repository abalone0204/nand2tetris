var fs = require('fs');
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

function writeStream(asmStreams) {
    asmStreams.forEach((as) => {
        fs.writeFile(as.path, '', {
            flags: 'wx'
        }, function(err) {
            if (err) throw err;
            console.log("[NOTICE] "+as.path + " is created successfully.");
        })

        as.streams.forEach((command)=>{
            fs.appendFileSync(as.path, command.asmCode);
        });
    })
    return
}

function codeWrite(parsedStreams) {
    var asmStreams = getStream(parsedStreams);
    writeStream(asmStreams);
    asmStreams.forEach((as) => {
        console.log(as);
        // console.log(as.streams.map((c) => {
        //     return c
        // }));
    })
    return asmStreams;

}

module.exports.codeWrite = codeWrite;