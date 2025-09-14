@echo off
setlocal
cd /d D:\stuff\used-car-checklist-wizard

rem stage all
git add -A

rem commit (if nothing to commit, Git returns nonzero; we just print a note)
git commit -m "deploy"
if errorlevel 1 echo No changes to commit.

rem push
git push -u origin main

rem open your live site
start "" "https://used-car-checklist-wizard.vercel.app"

pause
endlocal
