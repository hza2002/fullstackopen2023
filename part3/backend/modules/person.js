require('dotenv').config()

const mysql = require('mysql');
const databaseName = process.env.DATABASE_NAME
const con = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: databaseName,
});

// Connected
con.connect(function(err) {
  if (err) {
    console.log('Error connecting to MySql:', err)
  } else {
    console.log("Connected!");
  }
})

// Query All Records
const queryALL = () => {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM persons", function(err, result) {
      if (err) {
        console.log('Error querying all records:', err);
        reject(err);
      } else {
        console.log('Query all records successful');
        const persons = result.map(row => ({
          id: row.id,
          name: row.name,
          number: row.number
        }));
        resolve(persons);
      }
    });
  });
};

// Query Record
const queryRecord = (id) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM persons WHERE id = '${id}'`, function(err, result) {
      if (err) {
        console.log('Error querying one record:', err);
        reject(err);
      } else {
        console.log(`Query id:${id} record successful`);
        const person = result[0]
        resolve(person);
      }
    });
  });
};

// Update Record
const updateRecord = (id, number) => {
  return new Promise((resolve, reject) => {
    con.query(`UPDATE persons SET number = '${number}' WHERE id = '${id}'`, function(err, result) {
      if (err) {
        console.log('Error update record:', err)
        reject(err);
      } else {
        console.log(result, "record updated")
        resolve(result)
      }
    })
  })
}

// Add Record
const addRecord = ({ name, number }) => {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO persons (name, number) VALUES ('${name}', '${number}')`, function(err) {
      if (err) {
        console.log('Error add record:', err)
        reject(err);
      } else {
        console.log(result, "record added")
        resolve(result)
      }
    })
  })
}

// Delete Record
const deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    con.query(`DELETE FROM persons WHERE id = '${id}'`, function(err, result) {
      if (err) {
        console.log('Error delete one record:', err);
        reject(err);
      } else {
        console.log(`Deleted id:${id} record successful`);
        resolve(result);
      }
    });
  });
};

module.exports = {
  queryALL,
  queryRecord,
  updateRecord,
  addRecord,
  deleteRecord
};
