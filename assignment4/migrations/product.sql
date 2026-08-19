create table product(
    id serial PRIMARY KEY,
    name text not null,
    price Numeric(10,2) not null check (price>0),
    stock int not null check (stock >= 0),
    supplier_id int REFERENCES supplier(id)
)