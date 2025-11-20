@echo off
echo Starting application...

:: Start JSON servers
start "Admin Server - Port 3000" cmd /k "cd src\app\assets && json-server db.json --port 3000"




echo Services started!
echo JSON Server running at http://localhost:3000

