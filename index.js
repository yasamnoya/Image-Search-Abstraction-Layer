const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected on database'));

const app = express();

app.use(cors());
app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});