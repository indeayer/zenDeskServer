# zenDeskServer
zenDeskServer

Project Software : (NodeJS , Dockers)

Dockers Port Details 
APP SERVER PORT: 8400
DB SERVER PORT : 8500
NGIX SERVER PORT : 8600

Port mapped to 8400 beyond to prevent localhost software crash.

How to Deploy:

Requirements: Docker must be installed.

2) git clone https://github.com/indeayer/zenDeskServer.git 
3) go to root folder "ZENDESKSERVER"
4) docker-compose up 

How to use:
After docker has up:

Access Port: localhost:8600 (Reversed Proxy) -  (Actual Host is at port 8400)

How to Test:
1) cd to 'src' folder 
2) run 
   "npm test"

Test Folder located "src/test"
