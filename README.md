Simple TypeORM Demo
===

### Prerequisites:  
* install Docker 

### Steps
1. Pull this repository
2. change to the directory where the project was cloned.
3. run: ```npm install```
4. run: ```docker run -d -p 1433:1433 -v mssql-data:/var/opt/mssql --name=typeorm-demo-server topaztechnology/mssql-server-linux:latest```
5. run: ```npm run test```