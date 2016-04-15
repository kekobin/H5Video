:: 此脚本由pub.cmd调用

@echo off & echo.

if exist %cd%\pub.cmd (
	echo 此脚本由pub.cmd调用
	echo 请不要单独执行此脚本
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
echo 请按任意键退出. . . 
pause>nul & exit