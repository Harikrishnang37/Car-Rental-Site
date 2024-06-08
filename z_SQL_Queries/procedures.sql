-- changing manager:

drop procedure if exists changeMan;
Delimiter $$
CREATE PROCEDURE changeMan (
    IN old_man_id bigint,
    IN gname VARCHAR(30),
    IN gemail VARCHAR(30),
    IN gaddress VARCHAR(80),
    IN ggender VARCHAR(10),
    IN gpassword VARCHAR(20),
    IN gbranch_id bigint,
    IN gdob date
) 
BEGIN

    insert into Employee(name, email, address,gender,password, JoinDate,branch_id,dob)
    values
    (gname,gemail,gaddress,ggender,gpassword,curdate(), gbranch_id,gdob);

    delete from employee where emp_id = old_man_id;

    update branch set manager_id = (select emp_id from employee where email = gemail)  
    where branch_id = gbranch_id;

end $$
Delimiter ;

---------

--- checking for duplicate:

Delimiter &&
CREATE TRIGGER employee_insert_trigger
    BEFORE INSERT
    ON employee
    FOR EACH ROW
    BEGIN
    IF EXISTS (SELECT 1
        FROM employee
        WHERE email = NEW.email)
        THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User Already Exists ';
    END IF;
END&&
Delimiter ;

--- 

Delimiter &&
CREATE TRIGGER customer_insert_trigger
    BEFORE INSERT
    ON customer
    FOR EACH ROW
    BEGIN
    IF EXISTS (SELECT 1
        FROM customer
        WHERE email = NEW.email)
        THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User Already Exists ';
    END IF;
END&&
Delimiter ;

