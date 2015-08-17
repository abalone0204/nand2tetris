var path = process.argv[2];
var parse = require('./parser').parse;
var codeWrite = require('./codeWriter').codeWrite;
var parsedStreams = parse(path);

codeWrite(parsedStreams);

