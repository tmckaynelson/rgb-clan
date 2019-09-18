CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    profile_pic text
);