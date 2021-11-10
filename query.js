const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  queryAt: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;