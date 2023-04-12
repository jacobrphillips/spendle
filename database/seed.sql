
INSERT INTO users (first_name, last_name) VALUES ('John', 'Doe') RETURNING id;


INSERT INTO budgets (budget_total, user_id) VALUES (1000, 1);


INSERT INTO expenses (expense_name, expense_amount, user_id) VALUES ('Rent', 500, 1);
