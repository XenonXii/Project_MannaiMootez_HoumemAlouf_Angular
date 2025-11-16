@echo off
echo Starting application...


:: Start Angular app
start "Angular Frontend - Port 4200" cmd /k "cd . && ng serve --port 4200 --open"


echo Angular app running at http://localhost:4200
