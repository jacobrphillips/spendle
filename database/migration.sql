DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name varchar(25),
    last_name varchar(25)
);

CREATE TABLE budgets (
    budget_id serial PRIMARY KEY,
    budget_total integer,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
    expense_id serial PRIMARY KEY,
    expense_name varchar(25),
    expense_amount integer,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);