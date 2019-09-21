UPDATE users
SET first_name = $1, last_name = $2, email = $3, profile_pic = $5
WHERE user_id = $4
RETURNING username, user_id, first_name, last_name, email, profile_pic;