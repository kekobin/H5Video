:: �˽ű���pub.cmd����

@echo off & echo.

if exist %cd%\pub.cmd (
	echo �˽ű���pub.cmd����
	echo �벻Ҫ����ִ�д˽ű�
	GOTO EOF
)

cd.. 
rem & cd..
set dist=%cd%\dist
set pkg=%dist%\pkg

if not exist %pkg% md %pkg%
move /y %dist%\vplayer* %pkg%
move /y %dist%\images %pkg%\images

echo.
if not exist "F:\huya_h5player" GOTO EOF
set svndir=F:\huya_h5player\v%random%
md %svndir% & md %svndir%\images
copy /b /y %pkg%\* %svndir%
copy /b /y %pkg%\images\* %svndir%\images

:EOF
echo.
echo �밴������˳�. . . 
pause>nul & exit