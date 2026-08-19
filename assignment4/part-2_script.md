//roles of the user
enum user_role{
admin
seller
customer
}

table user {
id serial [pk]
email text [unique, not null]
first_name varchar(255) [not null]
last_name varchar(255) [not null]
password text [not null]
role user_role [not null,default: 'customer']
}
// user has a multivalued phone field so it must be there a new table to record the phone numbers for each user
table user_phone {
id serial [pk]
user_id int [not null, ref: > user.id]
phone_number text [not null]
}

table product{
id serial [pk]
name varchar(255) [not null]
stock int [ not null,note: 'CHECK (stock >= 0)']
is_deleted bool [not null , default: false]
price numeric(10,2) [not null ,note:'check (price>0)']
user_id int [not null,ref:> user.id]
}
//according to the relation one user has many products so each product has only one user[given in the erd diagram but that's not a usual case for me xD]
