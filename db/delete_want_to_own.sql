DELETE FROM want_to_own
WHERE user_id = $1 AND game_id = $2;