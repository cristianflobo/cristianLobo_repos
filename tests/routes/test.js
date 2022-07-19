const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get('/informacion', function(req, res) {
  res.status(200)
});

request(app)
  .get('/informacion')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });