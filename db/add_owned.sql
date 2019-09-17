INSERT INTO owned
(user_id, game_id)
VALUES
($2, $1)
RETURNING *;