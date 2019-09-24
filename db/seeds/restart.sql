drop table if exists played;
drop table if exists owned;
drop table if exists want_to_own;
drop table if exists want_to_play;
drop table if exists friends;
drop table if exists posts;
drop table if exists reviews;
drop table if exists users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE friends (
    friend_key INTEGER PRIMARY KEY,
    user1 INTEGER REFERENCES users(user_id) NOT NULL,
    user2 INTEGER REFERENCES users(user_id) NOT NULL
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL,
    title VARCHAR(160) NOT NULL,
    content text NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    type post_type NOT NULL,
    title VARCHAR(160) NOT NULL,
    content TEXT,
    game_id INTEGER NOT NULL,
    location add_location,
    review_id INTEGER REFERENCES reviews(review_id)
);

CREATE TABLE owned (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL
);

CREATE TABLE played (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL
);

CREATE TABLE want_to_own (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL
);

CREATE TABLE want_to_play (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL
);

INSERT INTO users
(username, password, first_name, last_name, email)
VALUES
('karcaroth', '$2a$13$brbMuhFEtA7Cagc/GAfqu.lKuzAOpOnMjKUhay41DdD6fwObmOII2', 'McKay', 'Nelson', 'tmckaynelson@gmail.com');