let query = function(connection, data) {
  let sql_total = `SELECT COUNT(*) FROM ball_list WHERE INSTR(content, '${data.query}') > 0`;
  let P_total = new Promise((resolve, reject) => {
    connection.query(sql_total, function(error, results) {
      if (error) reject(error);
      resolve(results[0]['COUNT(*)']);
    });
  });
  let sql_query = `SELECT * FROM ball_list WHERE INSTR(content, '${
    data.query
  }') > 0 ORDER BY time ASC LIMIT ${(data.pageNum - 1) *
    data.pageSize},${data.pageNum * data.pageSize}`;
  let P_data = new Promise((resolve, reject) => {
    connection.query(sql_query, function(error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
  return new Promise((resolve, reject) => {
    Promise.all([P_total, P_data])
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = query;
