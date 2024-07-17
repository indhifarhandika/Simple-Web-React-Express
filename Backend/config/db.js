const knex = require('knex');
const knexConfig = require('./knex');

const db = knex(knexConfig);

module.exports = db;
