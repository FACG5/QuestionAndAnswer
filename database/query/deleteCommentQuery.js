const dbConnection = require("../db_connection")

const deleteComment = (id, cb) => {

    let sql = {
        text: "DELETE FROM comments WHERE id = $1",
        values: [id]
    };
 

    dbConnection.query(sql, (err, res) => {

                if (err) {
                    cb(err)
                }
                else {
                    console.log(res.rowCount);
                    cb(null,res.rowCount)
                }
           
    })
}

module.exports = deleteComment
