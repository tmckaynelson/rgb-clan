CREATE TABLE friends (
    friend_key INTEGER PRIMARY KEY,
    user1 INTEGER REFERENCES users(user_id) NOT NULL,
    user2 INTEGER REFERENCES users(user_id) NOT NULL
);