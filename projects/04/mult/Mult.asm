// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
//
// m=r0
// n=r1
// i=0
// result=0
// for i< n {
//     result = result+m
//     i= i+1
// }
// r2 = result

@R0
D=M
@m
M=D

@R1
D=M
@n
M=D

@i
M=0
@result
M=0

@m
D=M
@Zero
D;JEQ

@n
D=M
@Zero
D;JEQ

// init all vars done
(Loop)
@result
D=M
@m
D=D+M

@result
M=D

@i
M=M+1
D=M
@n
D=M-D
@Loop
D; JGT

(Zero)
@result
D=M
@R2
M=D
(End)
@End
0;JMP
