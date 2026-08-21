CREATE USER store_manager IDENTIFIED BY PASSWORD 'StrongPassword123!';

GRANT SELECT, INSERT, UPDATE
ON demo.*  TO store_manager;

REVOKE UPDATE
ON demo.*  FROM store_manager;


GRANT DELETE
ON demo.sale
TO store_manager;