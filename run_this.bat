@echo off

start cmd /k "echo name:Client && echo starting in 5 sec && cd client && npm run dev"
timeout /t 5 > nul

start http://localhost:5173
echo name:Server
echo to close simply close the two cmd name client and server
cd server
npm run dev