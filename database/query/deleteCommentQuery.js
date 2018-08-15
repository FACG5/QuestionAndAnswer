const dbConnection = require("../db_connection")

const deleteComment = (id,userid, cb) => {

    let sql1 = {
        text: "select user_id from comments where id  = $1",
        values: [id]
    };

    dbConnection.query(sql1, (err, res) => {
        if(err)
        console.log(err.message)
        else
        if(res.rows[0].user_id == userid){
            let sql2 = {
                text: "DELETE FROM comments WHERE id = $1",
                values: [id]
            };
            dbConnection.query(sql2, (err, res) => {
        
                        if (err) {
                            cb(err)
                        }
                        else {
                            console.log(res.rowCount);
                            cb(null,res.rowCount)
                        }
                   
            })
        }
        else
        cb(new Error("You Can Only Delete Your Comments"))

    })



}

module.exports = deleteComment
