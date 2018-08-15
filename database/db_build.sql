BEGIN ;
DROP TABLE IF EXISTS students,register;

CREATE TABLE students (
Id SERIAL PRIMARY KEY ,
first_name VARCHAR(100) NOT NULL ,
surname VARCHAR(100) NOT NULL,
gender VARCHAR(100) NOT NULL

);

CREATE TABLE register (
id SERIAL PRIMARY KEY,
std_ID INTEGER,
course_name VARCHAR(30),
trainer_name VARCHAR(30),
FOREIGN KEY (std_ID) REFERENCES students(Id)
);

insert into students (first_name,surname,gender) values ('ahmad' , 'libda', 'male'),
('ali' , 'joe', 'male'),
('donia' , 'hassona', 'female'),
('sara' , 'mohammed', 'femal'),
('mohammed' , 'hasan', 'male');

insert into register(std_ID,course_name,trainer_name) values
(1,'Math','Hussam'),
(1,'Arabic','Ali'),
(1,'English','Yousef'),
(3,'Math','Hussam'),
(4,'English','Yousef'),
(2,'Math','Hussam'),
(4,'Arabic','Ali'),
(2,'Arabic','Ali'),
(2,'English','Yousef');

COMMIT;