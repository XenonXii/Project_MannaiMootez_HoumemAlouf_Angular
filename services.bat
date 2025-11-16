@echo off
echo Starting application...

:: Start JSON servers
start "Admin Server - Port 3001" cmd /k "cd src\app\assets && json-server admin.json --port 4001"
start "Posts Server - Port 3002" cmd /k "cd src\app\assets && json-server postList.json --port 4002"



echo Services started!
echo Admin Server running at http://localhost:4001
echo Posts Server running at http://localhost:4002
