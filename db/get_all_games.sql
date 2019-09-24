SELECT DISTINCT wto.game_id, wtp.game_id, o.game_id, p.game_id FROM want_to_own AS wto
JOIN want_to_play AS wtp ON wtp.user_id = wto.user_id
JOIN played AS p ON p.user_id = wto.user_id
JOIN owned AS o ON o.user_id = wto.user_id
WHERE wto.user_id = $1