let update = function(connection, data) {
    console.log(data);
  let sql_update = `UPDATE ball_list SET content = '${data.content}',time = '${data.time}' WHERE id = '${data.id}'`;
  return new Promise((resolve, reject) => {
    connection.query(
      sql_update,
      function(error, results) {
        if (error) {
          // eslint-disable-next-line no-console
          console.log("chucuole");
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = update;
