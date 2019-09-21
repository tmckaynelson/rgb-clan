INSERT INTO users
(username, password, first_name, last_name, active, email, profile_pic)
VALUES
($1, $2, $3, $4, true, $5, $6)
RETURNING username, first_name, last_name, user_id, profile_pic