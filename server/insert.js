let uuid = require("uuid");

let format = require('date-fns/format/index.js')

let insert = function(connection, data_insert) {
  let data = { ...data_insert };
  data.time = data.time
    ? format(new Date(data.time), "yyyy-MM-dd HH:mm:ss")
    : format(new Date(), "yyyy-MM-dd HH:mm:ss");
  data.id = uuid.v1().replace(/-/g, '');
  let sql_insert =
    "INSERT INTO ball_list SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql_insert, [data], function(error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = insert;