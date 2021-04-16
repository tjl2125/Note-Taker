const express = require('express');

const db = require('../db/db.json');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => res.json(db));

  app.post('/api/notes', (req, res) => {
      db.push(req.body);
      res.json(true);
  });

  app.post('/api/clear', (req, res) => {

    db.length = 0;

    res.json({ ok: true });
  });
};
