CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL,
    title VARCHAR(160) NOT NULL,
    content text NOT NULL
);