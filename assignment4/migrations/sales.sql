create table sale (
    id serial PRIMARY key,
    product_id int REFERENCES product(id),
    quantity int not null check(quantity>=0),
    date DATE NOT Null default now()
)