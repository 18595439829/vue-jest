let sql_insert = "INSERT INTO ball_list(id, content, time) VALUES(0,'','','')";

let insert = function(connection, data_insert) {
  return new Promise((resolve, reject) => {
    connection.query(sql_insert, data_insert, function(error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = insert;