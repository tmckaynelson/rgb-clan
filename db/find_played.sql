SELECT * FROM played
WHERE user_id = $2 AND game_id = $1;