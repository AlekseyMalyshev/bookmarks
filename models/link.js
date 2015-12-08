'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let linkSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    likes: [String],
    ilike: Boolean,  // this is not stored in the database, it is only for the client side
    updated: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('link', linkSchema);
