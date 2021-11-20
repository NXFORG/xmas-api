INSERT INTO users (username, password)
VALUES 
('jeff', 'test123'),
('steve', 'test123'),
('saskia', 'test123');

INSERT INTO presents (user_id, present_name, present_description, present_price, present_link, present_priority, present_occasion)
VALUES 
(1, 'xbox mini fridge', 'xbox mini fridge', '£89', 'www.link.com', 'high', 'birthday'),
(1, 'desk', 'standing office desk', '£79', 'www.link.com', 'medium', 'birthday');