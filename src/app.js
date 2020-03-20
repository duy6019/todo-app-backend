require('dotenv').config();
const express = require('express');
const cors = require('cors');
const allRoutes = require('express-list-endpoints');
const db = require('./db');

const router = require('./routers');

const app = express();
const port = process.env.PORT || 8080;

db.defaults({
  todos: [],
}).write();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api', router);

app.listen(port, () => {
  console.log(`App listen on port ${port}!`);
  console.log(allRoutes(app));
});
