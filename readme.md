# ABOUT

this is the repository for the UoM Gamdev Socities Website, forked from the hacksoc website

# SETUP

this is temp notes for how i set this up locally

run `npm i`

## set up the env file  
copy `.env.example` into a file called `.env`

Minimum needed so far
```
PORT=8080
ENVIRONMENT="dev"

DB_DIALECT="mysql"
DB_DATABASE="gamedev"
DB_HOST="localhost"
DB_USER="[USERNAME]"
DB_PASSWORD="[PASSWORD]"

SESSIONS_SECRET="[SECRET]"

```

also create a database called gamedev, or w.e you want but change the DB_DATABASE accordingly
i think secret can be anything, not really sure what it does right now.

## run the webserver
to run the webserver use the command `npm run dev`,
this should run the server on `localhost:8080` by default

might need to setup nodemon globaly, not sure
command is `npm install -g nodemon` if running the server doesnt work
