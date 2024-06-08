--check if customer exists:

select cust_id, name from customer
where email = 'morty@gmail.com' or phone_no = '9876543210';

-- authenticate customer:

select cust_id , name from customer
where (email = 'morty@gmail.com' or phone_no = '9876543210') and password = 'mortypwd';

-- authenticate employee :

select * from employee
where (email = 'morty@gmail.com' or phone_no = '9876543210') and password = 'mortypwd';

--check if employee is a mangaer:

select * from employee E
where email = 'kevin@gmail.com'
and exists (
    select * from branch B where E.emp_id = B.manager_id
);

-- add new customer:

insert into customer(name,DOB,license_no,gender,phone_no, email, address, password) 
values 
("Morty", "2002-06-18","PQ798TY65",'Male',0987654321, 'morty@gmail.com','#4, geneva street, kormanagala', 'mortypwd');

-- fetch all branches:

select branch_id, name from branch;

--serachCars (no filters):

select * from cars C 
where C.branch_id = (
    select B.branch_id from branch B where B.name = 'indiranagar'
)
and not exists(
    select * from transactions T
    where T.car_reg_no = C.reg_no and(
    startTime BETWEEN "2023-11-14 00:00:00" AND "2023-11-17 00:00:00"
    or endTime BETWEEN "2023-11-14 00:00:00" AND "2023-11-17 00:00:00"
    )
)

--filtered cars search:

select * from cars C 
where C.branch_id = (
    select B.branch_id from branch B where B.name = 'indiranagar'
)
and not exists(
    select * from transactions T
    where T.car_reg_no = C.reg_no and(
    startTime BETWEEN "2023-11-14 00:00:00" AND "2023-11-17 00:00:00"
    or endTime BETWEEN "2023-11-14 00:00:00" AND "2023-11-17 00:00:00"
    )
)
and C.fuel LIKE '%' 
and C.transmission LIKE '%' 
and C.rating LIKE '%'
and C.capacity LIKE '%'
ORDER BY C.price_per_hour 
;

--booking car:

insert into Transactions(cust_id, car_reg_no, branch_id, startTime, endTime, status, amount)
values
(2002, "KA01MG4203",1003, '2023-12-02 14:30:00', '2023-12-06 09:30:00', 'InProgress', 90);

-- show transactions:

select C.brand as brand, C.model as model,B.name as branch, T.startTime as startTime, T.endTime as endTime, T.amount as amount, T.status as status 
from transactions T 
join customer C on T.cust_id = C.cust_id 
join cars Cr on Cr.reg_no = T.car_reg_no 
join branch B on B.branch_id = T.branch_id 
where Status = 'InProgress' and (C.email = "${req.body.email}" or C.phone_no = "${req.body.email}" or C.cust_id = ${req.body.email});
    

select Cr.brand as brand, Cr.model as model,B.name as branch, T.startTime as startTime, T.endTime as endTime, T.amount as amount, T.status as status 
from transactions T 
join customer C on T.cust_id = C.cust_id 
join cars Cr on Cr.reg_no = T.car_reg_no 
join branch B on B.branch_id = T.branch_id 
where Status <> 'InProgress' and (C.email = "${req.body.email}" or C.phone_no = "${req.body.email}" or C.cust_id = ${req.body.email});

select Cr.brand as brand, Cr.model as model, C.name, C.email, C.cust_id, B.name as branch, T.startTime as startTime, T.endTime as endTime, T.amount as amount, T.status as status 
from transactions T 
join customer C on T.cust_id = C.cust_id 
join cars Cr on Cr.reg_no = T.car_reg_no 
join branch B on B.branch_id = T.branch_id 
where T.status <> 'InProgress' and (
    T.branch_id = (select branch_id from employee where email = "kevin@gmail.com")
    or T.branch_id = (select branch_id from branch where name LIKE "Indiranagar")
    );

-- make a booking:

update transactions set status = 'Completed' where trans_id = 90;

-- view employees:

select * from employee E where branch_id = (
    select branch_id from employee M
    where M.email = "kevin@gmail.com" or M.emp_id = 3001
)
and E.email <> "kevin@gmail.com" and E.emp_id NOT LIKE '3001' ;

--remove employees

delete from employee where emp_id = 3002;

--add employee

call changeMan(3003,"Angela","angela@gmail.com","something road",'Female','angelapwd',1001,"1998-03-17");

--fetch manager details:

select * from branch B
join employee E on b.manager_id = E.emp_id;

--remove manager:

call changeMan(3003,"Angela","angela@gmail.com","something road",'Female','angelapwd',1001,"1998-03-17");

-- helpful:

select COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_COLUMN_NAME, REFERENCED_TABLE_NAME
from information_schema.KEY_COLUMN_USAGE
where TABLE_NAME = 'branch';

ALTER TABLE branch 
DROP CONSTRAINT `branch_ibfk_1`;

-- analytics:

select B.branch_id, B.name as branch_name,E.emp_id as manager_id, E.name as manager_name, sum(T.amount) as revenue, count(*) as sales
from transactions T 
join cars C on C.reg_no = T.car_reg_no 
join branch B on T.branch_id = B.branch_id
join employee E on E.emp_id = B.manager_id
GROUP BY B.branch_id, B.name , E.emp_id,E.name;












