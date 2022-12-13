CREATE TABLE users (
   id  SERIAL PRIMARY KEY,
   first_name varchar(255),
   last_name varchar(255),
   age int, 
   active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE orders (
   id  SERIAL PRIMARY KEY,
   price float,
   date timestamp,
   user_id int,
   FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (first_name, last_name, age) VALUES ('John', 'Doe', 18);
INSERT INTO users (first_name, last_name, age) VALUES ('Bob', 'Dylan', 30);
INSERT INTO users (first_name, last_name, age) VALUES ('Jane', 'Doe', 25);
INSERT INTO orders (price,date, user_id) VALUES ( 18, '2021-01-01 00:00:00', 1);
INSERT INTO orders (price,date, user_id) VALUES ( 18, '2021-01-02 04:00:00', 1);
INSERT INTO orders (price,date, user_id) VALUES ( 18, '2021-01-03 05:00:00', 2);
INSERT INTO orders (price,date, user_id) VALUES ( 18, '2021-01-04 06:00:00', 2);