# Instructions for PostgreSQL

When running software locally, use local database. For remote use there are two databases on University of Helsinki's PostgreSQL cluster, one for testing and one for deployment.

## Local database

1. Install PostgreSQL (version 14) on your computer, if you don't have it yet.
2. Run `psql` on terminal. This opens PostgreSQL.
3. Create a new database with SQL: `CREATE DATABASE [dbname]`. You can open the database with command `\c [dbname]`
4. Save the address of the database to .env-file