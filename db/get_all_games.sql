SELECT wto.game_id, u.user_id FROM users AS u
JOIN want_to_own AS wto ON wto.user_id = u.user_id
WHERE u.user_id = $1;

SELECT wtp.game_id, u.user_id FROM users AS u
JOIN want_to_play AS wtp ON wtp.user_id = u.user_id
WHERE u.user_id = $1;

SELECT o.game_id, u.user_id FROM users AS u
JOIN owned AS o ON o.user_id = u.user_id
WHERE u.user_id = $1;

SELECT p.game_id, u.user_id FROM users AS u
JOIN played AS p ON p.user_id = u.user_id
WHERE u.user_id = $1;
