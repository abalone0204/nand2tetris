@SP
A=M
M=7
@SP
M=M+1
@SP
A=M
M=8
@SP
M=M+1
@SP
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
@SP
M=M-1
A=M
D=M
@tmep1
M=D
@ARG
D=M
@2
D=A+D
@temp2
M=D
@tmep1
D=M
@temp2
A=M
M=D

@SP
M=M-1
A=M
D=M
@THAT
A=M
M=D@SP
M=M-1
A=M
D=M
@temp1
M=D
@5
D=A
@5
D=A+D
@temp2
M=D
@temp1
D=M
@temp2
A=M
M=D@SP
M=M-1
A=M
D=M
@SimpleAdd.4
M=D