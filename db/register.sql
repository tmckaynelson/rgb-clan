INSERT INTO users
(username, password, first_name, last_name, active)
VALUES
($1, $2, $3, $4, true)
RETURNING username, first_name, last_name, user_id