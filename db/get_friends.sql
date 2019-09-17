SELECT * FROM friends
WHERE user1 = $1 OR user2 = $1;