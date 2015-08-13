var assert = require('assert');
var assembler = require('./assembler');
var parser = require('./parser')
var code = require('./code');
var symbolTable = require("./symbolTable");

var instructionA = "   @20   ";
var instructionCNoJump = "D = M+1";
var instructionCJump = "D = M+1 ; JMP";
var instructionJump = "0; JMP"
var instructionL = "( hello )";

console.log('A type:');
console.log(parser.parse(instructionA));
console.log('======');
console.log('C type(comp no jump):');
console.log(parser.parse(instructionCNoJump));
console.log('======');
console.log('C type( comp with jump):');
console.log(parser.parse(instructionCJump));
console.log('======');
console.log('C type( no comp, only jump):');
console.log(parser.parse(instructionJump));
console.log('======');
console.log('Label:');
console.log(parser.parse(instructionL));
console.log('end');