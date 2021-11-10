const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const Query = require('./query');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected on database'));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

app.get('/search', async (req, res) => {
  let { q, page } = req.query;
  q = q ? q : '';
  page = page ? page : 1;
  console.log(q, page);

  let query = await Query.findOne({ query: q });
  if (!query) {
    query = await Query.create({ query: q });
  } else {
    await query.updateOne({ queryAt: Date.now() });
  }

  const result = await axios.get(`https://pixabay.com/api?key=24255346-bc4cc700acb7802c2fd2ed183&q=${q}&${page}`)
  res.json({ images: result.data.hits });
});

app.get('/recent', async (req, res) => {
  const queries = await Query.find({}).sort({ queryAt: -1 }).limit(10);
  const queryStrings = queries.map((q) => q.query);
  const json = {};
  for (let i = 0; i < queryStrings.length; i++) {
    json[i] = queryStrings[i];
  }

  res.json({ queries: json });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});