const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  BOOK_code: {
    type: String,
    required: true
  },
  BOOK_name: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Roll_Id: {
    type: String,
  },
  Book_details: {
    type: String,
  },
  Book_Returned: {
    type: String,
  },
  Roll_Id_previous: {
    type: String,
  },
  Book_details_previous: {
    type: String,
  },
  Book_Renew: {
    type: String,
  },

  Issuedate: {
    type: Date
  }

});
const datasss = mongoose.model('datasss', dataSchema);

module.exports = datasss;
