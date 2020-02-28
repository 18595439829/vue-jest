let query = function(connection, data) {
  let sql_query = `SELECT * FROM ball_list WHERE INSTR(content, '${
    data.query
  }') > 0 ORDER BY time ASC LIMIT ${(data.pageNum - 1) * data.pageSize},${data.pageNum * data.pageSize}`;
  return new Promise((resolve, reject) => {
    connection.query(sql_query, function(error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = query;