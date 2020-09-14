# zenDeskServer
zenDeskServer

Deployed using Dockers.
Tested on EC2 , Localhost

Project Software : (NodeJS , Dockers)

Dockers Port Details 
APP SERVER PORT: 8400
DB SERVER PORT : 8500
NGIX SERVER PORT : 8600

Port mapped to 8400 beyond to prevent localhost software crash.

How to Deploy:

Requirements: Docker must be installed.
 If Docker not install (Run Docker install shell command)
 If docker ready skip this step 1.

 Go into root/shell_scripts
 1) run command:
     - ./dockerinstall.sh

2) git clone https://github.com/indeayer/zenDeskServer.git 
3) go to "ZENDESKSERVER"
4) type:
    docker-compose up 

or:
    run ./docker-up.sh (shell folder)

(---- Installation done and Setup done ----)


How to use:

Access Application via Nginx: 
localhost:8600 

How to Unit Test:
Option 1:
1) cd to 'src' folder 
2) run 
   "npm test"

Option 2:
1) cd to shell_scripts 
2) /.test_script.sh


Test Folder located "src/test"



(--------Manual Access Section--------)

Logs files of set and get store at container (web_app)

Command:
docker exec -it web_app /bin/bash
cd /src/log
tail logs 


Login to Database:
Username: ZenUser
Password: 
mysql -s -h 127.0.0.1 --port=8500 -u ZenUser -p
