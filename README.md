# zenDeskServer
zenDeskServer (CentOS 7, MacBook , EC2 Linux AMI2)
Deployed using Dockers.
Project Software : (NodeJS , Dockers)

For other info , find at page end

How to Deploy:
 Requirements: Docker must be installed.
 If Docker not install (Run Docker install shell command)
 

 If DOCKER ready skip step 1.

 Go into root/shell_scripts
 1) run command:
     - ./dockerinstall.sh
      -After install suggest reboot 

 2) git clone https://github.com/indeayer/zenDeskServer.git 

 3) run: (shell folder)

    ./docker-up.sh 

or: 
-go to root folder

run: docker-compose up 



(---- Installation done and Setup done ----)


How to use:

Access Application via Nginx: 
localhost:8600 

How to Unit Test:

(If facing any issue in unit testing, can be resolve by installing nodeJS and running npm install)

Option 1:
1) cd to 'src' folder 

2) run 
   "npm test"

Option 2:
1) cd to shell_scripts 
2) ./test_script.sh


Test Folder located "src/test"



(--------Manual Access Section--------)

Logs files of set and get store at container (web_app)

Command:
-docker exec -it web_app /bin/bash
-cd /src/log
-tail app.logs 


Login to Database:
Username: ZenUser
Password: 

mysql -s -h 127.0.0.1 --port=8500 -u ZenUser -p



Dockers Port Details 

-APP SERVER PORT: 8400

-DB SERVER PORT : 8500

-NGIX SERVER PORT : 8600

Port mapped to 8400 beyond to prevent localhost software crash.

Environment tested on: EC2 , Centos

