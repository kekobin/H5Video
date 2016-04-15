@echo off & cls & cd.. & cd..
if exist dist rd /s /q dist
rem keep next line single
cd src
fis release -f cmd/fis-pub.js -d pub -opD & call cmd/sub.cmd