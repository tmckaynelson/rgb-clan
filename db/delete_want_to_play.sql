DELETE FROM want_to_play
WHERE user_id = $1 AND game_id = $2;