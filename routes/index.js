'use strict';

let express = require('express');
let router = express.Router();
let Address6 = require('ip-address').Address6;

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

let Link = require('../models/link');

router.get('/api/links', function(req, res, next) {
  Link.find({}, (err, links) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      res.json({links: links });
    }
  });
});

router.post('/api/links', function(req, res, next) {
  let link = new Link(req.body);
  link.save((err, link) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      res.json(link);
    }
  });
});

let getRemoteIp = (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

router.post('/api/links/:linkId/like', function(req, res, next) {
  Link.findOneAndUpdate({_id: req.params.linkId}, { $addToSet: { likes: getRemoteIp(req)}}, {new: true}, (err, link) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      console.log('result:', link);
      res.json(link);
    }
  });
});

router.delete('/api/links/:linkId/like', function(req, res, next) {
  Link.findOneAndUpdate({_id: req.params.linkId}, { $pull: { likes: req.ip}}, {new: true}, (err, link) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      console.log('result:', link);
      res.json(link);
    }
  });
});

router.delete('/api/links/:linkId', function(req, res, next) {
  Link.findOneAndRemove({_id: req.params.linkId}, (err, data) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      console.log('bookmark deleted:', data);
      res.json(data);
    }
  });
});

module.exports = router;
