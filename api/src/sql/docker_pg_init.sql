CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name varchar(128) UNIQUE NOT NULL,
    email varchar(254) UNIQUE NOT NULL,
    password varchar(128) NOT NULL
);