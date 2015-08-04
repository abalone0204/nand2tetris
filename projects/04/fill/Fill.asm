// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.

// Put your code here.

//(Listen)
//if KBD != 0
//    i = 0 
//    for i < SCREEN.length {
//        SCREEN[i] = -1
//        i = i + 1
//    }
//else
//    for i < SCREEN.length {
//        SCREEN[i] = 0
//        i = i + 1
//    }
//goto Listen

(Listen)
@SCREEN
D=A
@addr
M=D
@i
M=0

@KBD
D=M
@Bright
D; JEQ
(Dark)
@addr
D=M
@i
A=D+M
M=-1
@i
M=M+1

@addr
D=M
@i
D=D+M
@KBD
D=A-D
@End
D;JEQ
@Dark
D;JNE

(Bright)
@addr
D=M
@i
A=D+M
M=0
@i
M=M+1

@addr
D=M
@i
D=D+M
@KBD
D=A-D
@End
D;JEQ
@Bright
D;JNE

(End)
@Listen
0;JMP