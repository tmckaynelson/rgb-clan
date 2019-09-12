CREATE TABLE played (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    game_id INTEGER NOT NULL
);