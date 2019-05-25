-- create table users (
--     user_id serial primary key not null,
--     firstname varchar not null,
--     lastname varchar,
--     email varchar not null,
--     hashed_password text not null
-- );

--   so_id INTEGER REFERENCES so_headers(id),


create table trips (
    trip_id serial primary key not null,
    user_id integer references users(user_id)  not null,
    name varchar not null,
    description text,
    tags
);

create table lists (
    list_id serial primary key not null,
    user_id integer references users(user_id) not null,
    name varchar,
    description text,
    tags
);

create table items (
    item_id serial primary key not null,
    user_id integer references users(user_id) not null,
    name varchar not null,
    img_url text,
    weight float,
    volume float,
    description text,
    tags text
);