INSERT INTO users
(username, password, first_name, last_name, active, email)
VALUES
($1, $2, $3, $4, true, $5)
RETURNING username, first_name, last_name, user_id