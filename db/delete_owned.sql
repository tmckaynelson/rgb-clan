DELETE FROM owned
WHERE user_id = $1 AND game_id = $2;