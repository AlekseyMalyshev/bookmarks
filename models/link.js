'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let linkSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    likes: [String],
    updated: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('link', linkSchema);
