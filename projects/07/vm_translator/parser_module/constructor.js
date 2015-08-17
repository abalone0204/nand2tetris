var constructor = {};
var fs = require('fs');
var FILE_TYPE = 'file';
var DIR_TYPE = 'dit'

function getStat(path) {
    if (fs.lstatSync(path).isFile()) {
        return FILE_TYPE;
    } else if (fs.lstatSync(path).isDirectory()) {
        return DIR_TYPE;
    }
}

function init(path) {
    var result = {};
    var argType = getStat(path);
    if (argType === DIR_TYPE) {
        var dataStream = fs.readdirSync(path)
            .map((file) => {
                var fileStream = {
                    path: path + "/" + file
                }
                fileStream.stream = fs.readFileSync(path + "/" + file).toString().split("\n");
                return fileStream;
            });
        result.dataStream = dataStream
    } else if (argType === FILE_TYPE) {
        result.dataStream = [{
            path: path,
            stream: fs.readFileSync(path).toString().split("\n")
        }];
    };
    result.argType = argType;
    return result;
}

constructor.init = init;

module.exports = constructor;