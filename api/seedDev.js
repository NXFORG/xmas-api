const db = require('./dbConfig.js');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seed_db.sql').toString();

db.query(seeds, () => console.log('Dev database seeded'));