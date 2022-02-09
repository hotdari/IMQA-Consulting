// const sample = require("../pptxConvertor/dbReportSample.js");
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let isConn = false;
console.log(process.resourcesPath)
console.log(__dirname)
console.log(path.sep)

const dataPath = process.env.NODE_ENV === 'development'
  ? './db/database.db'
  : __dirname + '/db/database.db';

// const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
// const db = new sqlite3.Database('sqlite:///Users/id-yunseol/Desktop/db/database.db', sqlite3.OPEN_READWRITE, (err) => {
// const db = new sqlite3.Database(path.join(__dirname, "./db/database.db"), sqlite3.OPEN_READWRITE, (err) => {
// const dbFile = path.join(__dirname, path.sep+'/db/database.db').replace(path.sep+'app.asar', '');
// console.log(dbFile)

export const db = new sqlite3.Database(dataPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the test database.');
    // isConn = true;
    // db.run('CREATE TABLE IF NOT EXISTS report ( report_id INTEGER PRIMARY KEY, project_id INTEGER, desc TEXT, content TEXT )',[], arg=>{
    //   console.log('create',arg);
    // });
  }
});

export function dbClose(arg) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
