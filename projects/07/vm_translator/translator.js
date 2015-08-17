var parse = require('./parser').parse;
var path = process.argv[2];

console.log(parse(path));