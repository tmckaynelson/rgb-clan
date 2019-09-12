CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    type post_type NOT NULL,
    title VARCHAR(160) NOT NULL,
    content TEXT,
    game_id INTEGER NOT NULL,
    location add_location,
    review_id INTEGER REFERENCES reviews(review_id) NOT NULL
);