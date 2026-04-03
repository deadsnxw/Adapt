CREATE TABLE users (
    id uuid PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    height_cm INTEGER NOT NULL,
    weight_kg DOUBLE PRECISION NOT NULL,
    gender VARCHAR(255) NOT NULL,
    activity_level VARCHAR(255) NOT NULL,
    goal VARCHAR(255) NOT NULL
);