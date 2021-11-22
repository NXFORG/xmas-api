INSERT INTO users (username, password)
VALUES 
('jeff', '$2a$10$pjdcueIJKzClOy/2SzVBAeSxc/RTc6RVDEH.v1X6aHvq9gnDP3x4C'),
('steve', 'test123'),
('saskia', 'test123');

INSERT INTO presents (user_id, present_name, present_description, present_price, present_link, present_priority, present_occasion)
VALUES 
(1, 'xbox mini fridge', 'xbox mini fridge', '£89', 'www.apple.com', 'high', 'birthday'),
(1, 'desk', 'standing office desk', '£79', 'www.amazon.co.uk', 'medium', 'birthday');