BEGIN ;
DROP TABLE IF EXISTS posts,comments,users;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL ,
pass VARCHAR(100) NOT NULL,
nickname VARCHAR(100) NOT NULL
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
user_id INTEGER,
post_text VARCHAR(500),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
comment_text VARCHAR(500),
user_id INTEGER,
post_id INTEGER,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);


insert into users (email,pass,nickname) values
('afal@live.com' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'AFAL'),
('marwan@hotmail.com' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'male'),
('ibrahim@hotmail.com' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'female'),
('donia@hotmail.com' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'femal'),
('mohammed' , '$2a$13$jpuDCy4ZM/OXAlk9Ncq7me.yDXFHpsvB88pL.VCYjTc9GBEYxGDQe', 'male');

insert into posts(user_id,post_text) values
(1,'Math'),
(1,'Arabic'),
(1,'English'),
(3,'Math'),
(4,'English'),
(2,'Math'),
(4,'Arabic'),
(2,'Arabic'),
(2,'English');


insert into comments(user_id,post_id,comment_text) values
(1,2,'Hussam'),
(1,3,'Ali'),
(1,3,'Yousef'),
(3,2,'Hussam'),
(4,4,'Yousef'),
(2,4,'Hussam'),
(4,4,'Ali'),
(2,1,'Ali'),
(2,1,'Yousef');

COMMIT;