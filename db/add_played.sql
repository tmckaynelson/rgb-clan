INSERT INTO played
(user_id, game_id)
VALUES
($2, $1)
RETURNING *;