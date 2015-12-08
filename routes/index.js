'use strict';

let express = require('express');
let router = express.Router();

let Link = require('../models/link');

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

let getRemoteIp = (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

router.get('/api/links', function(req, res, next) {
  Link.find({}, (err, links) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      let rIp = getRemoteIp(req);
      for (var i = 0; i < links.length; i++) {
        if (links[i]) {
          links[i].ilike = !!~links[i].likes.indexOf(rIp);
        }
      };
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

router.post('/api/links/:linkId/like', function(req, res, next) {
  Link.findOneAndUpdate({_id: req.params.linkId}, { $addToSet: { likes: getRemoteIp(req)}}, {new: true}, (err, link) => {
    if (err) {
      res.status(500).json('operation failed');
    }
    else {
      link.ilike = true;
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
      if (link) {
        link.ilike = false;
      }
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
      res.json(data);
    }
  });
});

module.exports = router;
