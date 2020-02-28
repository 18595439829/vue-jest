let remove = function(connection, id) {
  let sql_query = `DELETE FROM ball_list WHERE id = '${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql_query, function(error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = remove;
