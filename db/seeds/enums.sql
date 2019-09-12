CREATE TYPE post_type AS ENUM (
    'review',
    'add_game'
);

CREATE TYPE add_location AS ENUM (
    'played',
    'owned',
    'want_to_play',
    'want_to_own'
);