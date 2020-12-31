Simple TypeORM Demo
===

### Prerequisites:  
* install Docker 

### Steps
1. Pull this repository
2. change to the directory where the project was cloned.
3. run: ```npm install```
4. change to the ```test``` directory and run: ```npm install```
5. run: ```docker run --memory=2G -d -e 'SQL_USER=typeormuser' -e 'SQL_PASSWORD=Qcijb-fe4k-vD6Bo9deYOw' -e 'SQL_DB=typeormdemo' -p 1433:1433 -v mssql-data:/var/opt/mssql --name=typeorm-demo-server topaztechnology/mssql-server-linux:latest```
6. run: ```npm run test```