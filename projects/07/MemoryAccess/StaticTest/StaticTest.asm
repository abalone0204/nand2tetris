@SP
A=M
M=111
@SP
M=M+1
@SP
A=M
M=333
@SP
M=M+1
@SP
A=M
M=888
@SP
M=M+1
@SP
M=M-1
A=M
D=M
@MemoryAccess/StaticTest/StaticTest.8
M=D@SP
M=M-1
A=M
D=M
@MemoryAccess/StaticTest/StaticTest.3
M=D@SP
M=M-1
A=M
D=M
@MemoryAccess/StaticTest/StaticTest.1
M=D// push static 2
@MemoryAccess/StaticTest/StaticTest.3
D=M
@SP
A=M
M=D
@SP
M=M+1// push static 2
@MemoryAccess/StaticTest/StaticTest.1
D=M
@SP
A=M
M=D
@SP
M=M+1@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M-D@SP
M=M+1
// push static 2
@MemoryAccess/StaticTest/StaticTest.8
D=M
@SP
A=M
M=D
@SP
M=M+1@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D+M
M=D
@SP
M=M+1
