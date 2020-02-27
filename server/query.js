let sql_query = "SELECT * FROM ball_list";
let query = function(connection, data_query) {
  return new Promise((resolve, reject) => {
    connection.query(sql_query, data_query, function(error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = query;