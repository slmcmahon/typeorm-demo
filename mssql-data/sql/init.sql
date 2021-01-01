use master
go

if not exists (select * from sys.sql_logins where name = 'typeormuser')
    create login [typeormuser] with password = 'Qcijb-fe4k-vD6Bo9deYOw';
if not exists (select * from sys.sysusers where name = 'typeormuser')
    create user [typeormuser] for login [typeormuser];

if not exists (select * from sys.databases where name = 'typeormdemo')
    create database [typeormdemo]
go

use [typeormdemo]
go

if not exists (select * from sys.sysusers where name = 'typeormuser')
    create user [typeormuser] for login [typeormuser];
-- this user needs to be able to manage the schema, so we give it dbo access
alter role db_owner add member [typeormuser];