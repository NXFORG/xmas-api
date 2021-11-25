CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar(12) NOT NULL,
    password varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS presents (
    id serial PRIMARY KEY,
    user_id int NOT NULL,
    present_name varchar NOT NULL,
    present_description varchar,
    present_price varchar(10) NOT NULL,
    present_link varchar,
    present_priority varchar(10),
    present_occasion varchar(10)
);