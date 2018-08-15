BEGIN ;

DROP TABLE IF EXISTS users, post, comments CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY ,
fullName VARCHAR(100) NOT NULL ,
password1 VARCHAR(30) NOT NULL,
password2 VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL

);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post TEXT,
  user_id INTEGER REFERENCES users(id)
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id) 
);

insert into users (fullName, password1, password2, email) VALUES
 ('Marwan Mohammad', '$$11aa','$$11aa', 'marwan@marwan.com'),
 ('Ali Mohammad', '$$11aa','$$11aa', 'ali@marwan.com'),
 ('Osama Mohammad', '$$11aa','$$11aa', 'osama@marwan.com'),
 ('Heba Mohammad', '$$11aa','$$11aa', 'heba@marwan.com'),
 ('Amany Mohammad', '$$11aa','$$11aa', 'amany@marwan.com');

 insert into posts (post, user_id) VALUES
 ('How to program c++ ?', 1),
 ('How to program javaScript ?', 2),
 ('How to built database', 3);

 insert into comments (comment, post_id, user_id) VALUES
 ('Read this book ', 1 , 2),
 ('Review last lecture ', 1 , 3),
 ('Read this article ', 2 , 1);



COMMIT;