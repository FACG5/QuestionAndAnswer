const tape = require("tape");
const bulid_db = require("../database/db_build");
const signUpQuery = require("../database/query/add_user")
const getPosts = require("../database/query/getPostsQuery")

tape("Testing The Length of Result about users table", t => {
  bulid_db((err, res) => {
    signUpQuery('donia11@hotmail.com' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'femal',(err, res) => {
      t.deepEqual(Object.keys(res.rows[0]) , ['id' , 'email' ,'pass','nickname'] , 'They records shouls hold the proper properties')
      t.equal(res.rows[0].email , 'donia11@hotmail.com' , 'it should test data \'donia@hotmail.com\'')
      console.log(res.rows);
      
      t.error(err);
      t.equal(res.rows.length > 0, true, "DB Should Have Rows inside");
      t.end();
    });
  });
});

tape("Testing The Length of Result about posts table", t => {
  bulid_db((err, res) => {
    getPosts((err, res) => {
      t.error(err);
      t.equal(res.rows > 0, false, "DB Should Have Rows inside");
      console.log(res.rows);
      
      t.end();
    });
  });
});


