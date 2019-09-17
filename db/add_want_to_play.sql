INSERT INTO want_to_play
(user_id, game_id)
VALUES
($2, $1)
RETURNING *;