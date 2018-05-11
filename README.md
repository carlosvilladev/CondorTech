# Condor Tech
Condor Lab Test

  - ###### Backend (Node.js, Express.js, MongoDB)
  - ###### DB (MySQL)
  - ###### Frontend (React.js)

# Backend
To solve the problem I will use the following technologies **Node.js**, **Express.js**, **Mongoose**.

CRUD (Create, Read, Update, Delete), these are the endpoints to consume the API:

| Method | Endpoint |
| ------ | ------ |
| GET | http://127.0.0.1:3000/providers |
| GET | http://127.0.0.1:3000/providers/:id |
| PUT | http://127.0.0.1:3000/providers/:id |
| POST | http://127.0.0.1:3000/providers |
| DELETE | http://127.0.0.1:3000/providers/:id |

### Run
To run the backend app please follow the next steps:
```sh
$ cd Backend
$ npm install
$ export MLAB_ENV='mongodb://[User]:[Password]@ds125146.mlab.com:25146/foundation-test1'
$ npm start
```
* [User] = mLab user sent by email
* [Password] = mLab password sent by email

# Database

The Queries that consults the data in MySQL are described in the folder DB.
And this is the order to execute it:
1. mydb.sql => (This query creates de DB and it's tables)
2. fake_data.sql => (This query creates fake data and populate de table)
3. The order in the other files .sql files isn't important. You can execute when you want it. 

The reports queries are in the reports folder. Each one with the specific name.
* reports/

# Frontend
To start the app it's just necessary execute the next commands:

```sh
$ cd Frontend
$ npm install
$ npm start
```
When the app finished to build the project, it will appear in the URL:
- http://localhost:3000/

Credits Template: https://www.creative-tim.com/live/material-dashboard-react
