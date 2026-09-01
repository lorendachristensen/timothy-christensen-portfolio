@echo off
REM Double-click this to publish any newly-published O'Colly clips to the website.
REM It runs scripts\add-latest.ps1 (sits next to this file) and keeps the window open.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0add-latest.ps1"
echo.
pause
