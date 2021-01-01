Simple TypeORM Demo
===

### Prerequisites:  
* install Docker 

### Steps
1. Pull this repository
2. change to the directory where the project was cloned.
3. run: ```npm install```
4. run: ```docker run --memory=2G -p 1433:1433 -d --name=typeormdemo slmcmahon/typeorm-demo-server:latest```
5. run: ```npm run test```