const mysql = require('mysql');

// 参数不足
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mysql.js <password>')
  process.exit(1)
};

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.argv[2],
});

// Connected
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const databaseName = "phonebook"

// Reset Database
con.query(`DROP DATABASE IF EXISTS ${databaseName}`, (err) => {
  if (err) throw (err);
  console.log(`Database ${databaseName} droped (if it exists)`)
});

// Check Database 
con.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
  if (err) throw (err);
  console.log(`Database ${databaseName} created (if it didn't exist)`)
});

// Use Database
con.changeUser({ database: databaseName }, (err) => {
  if (err) throw (err);
})

// Check Table Persons
const createTable = "CREATE TABLE IF NOT EXISTS persons ( \
  id INT AUTO_INCREMENT PRIMARY KEY, \
  name VARCHAR(255) UNIQUE NOT NULL, \
  number VARCHAR(255))";
con.query(createTable, (err) => {
  if (err) throw (err);
  console.log(`Table created (if it didn't exist)`)
});

// Init Records
const initRecords = [
  "INSERT INTO persons (name, number) VALUES ('Arto Hellas', '040-123456')",
  "INSERT INTO persons (name, number) VALUES ('Ada Lovelace', '39-44-5323523')",
  "INSERT INTO persons (name, number) VALUES ('Dan Abramov', '12-43-234345')",
  "INSERT INTO persons (name, number) VALUES ('Mary Poppendieck', '39-23-6423122')",
]
initRecords.forEach(record => {
  con.query(record, function(err) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

// 打印所有数据
if (process.argv.length === 3) {
  // Select Table
  con.query("SELECT * FROM persons", function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}

// 插入新数据
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const newRecord = `INSERT INTO persons (name, number) VALUES ('${name}', '${number}')`;
  con.query(newRecord, function(err) {
    if (err) throw err;
    console.log(`Added ${name} number ${number} to phonebook`);
  });
}

// Break Connect
con.end()
