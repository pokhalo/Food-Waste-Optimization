CREATE TABLE restaurants (
    id INTEGER UNIQUE PRIMARY KEY,
    name TEXT
);

CREATE TABLE biowaste (
    date DATE,
    restaurant_id INTEGER REFERENCES restaurants (id),
    biowaste_customer NUMERIC,
    biowaste_coffee NUMERIC,
    biowaste_kitchen NUMERIC,
    biowaste_hall NUMERIC,
    PRIMARY KEY (date, restaurant_id)
);

CREATE TABLE customers_per_x (
    date DATE,
    hour INTEGER,
    amount INTEGER,
    restaurant_id INTEGER REFERENCES restaurants (id)
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    category_id INTEGER REFERENCES category (id)
);

CREATE TABLE sold_lunches (
-- needs more information about source data
    -- date and time
    restaurant_id INTEGER REFERENCES restaurants (id),
    dish_id INTEGER REFERENCES dishes (id),
    amount INTEGER
);

