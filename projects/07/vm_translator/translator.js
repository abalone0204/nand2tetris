var parse = require('./parser').parse;
var path = process.argv[2];

var parsedStream=parse(path);
parsedStream.forEach((ps)=>{
    console.log(ps.stream);
});
