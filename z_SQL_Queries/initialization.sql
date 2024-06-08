--Branches:

insert into branch(branch_id, name, address) 
values
(1001, 'Cox Town', '#302, 7th Street, Assaye Road, Cox Town, Bangalore'),
(1002, 'Ulsoor', '#411, 9th Street, Cambridge Road, Halasuru, Bangalore'),
(1003, 'Indiranagar', '#233, 2nd Main Road, Indiranagar, Bangalore'),
(1004, 'Majestic', '#12, 1st Main Road, Majesic, Bangalore');


--Cars:

insert into cars(brand,model,drivewheel,fuel,capacity,transmission, reg_no, price_per_hour, branch_id, km_driven, year_manf, rating, colour, img) 
values
("Tata" ,           "Nano Genx" ,       "RWD" , "Petrol" ,4 ,"Automatic",   "KA01YH3456", 220, 1001, 25000, '2018',4, 'blue',   'tata_nano'),
("Tata" ,           "Nano Genx" ,       'RWD' , "CNG" ,   4 ,"Manual",      "KA01HU7543", 200, 1002, 75000, '2014',3, 'blue',   'tata_nano'),
("Datsun" ,         "Redi-Go" ,         "FWD" , "Petrol" ,5 ,"Manual",      "KA02GY2345", 200, 1003, 25000, '2018',3, 'red',    'datsun_redigo'),
("Datsun" ,         "Redi-Go" ,         "FWD" , "Petrol" ,5 ,"Manual",      "KA02GR7532", 200, 1002, 100000, '2018',3, 'red',   'datsun_redigo'),
("Renault" ,        "Kwid" ,            "FWD" , "Petrol" ,5 ,"Manual",      "KA05MX4598", 240, 1003, 25000, '2019',4, 'white',  'renault_kwid'),
("Renault" ,        "Kwid" ,            "FWD" , "Petrol" ,5 ,"Manual",      "KA09WQ4918", 240, 1004, 25000, '2018',4, 'white',  'renault_kwid'),
("Maruti Suzuki" ,  "Eeco" ,            "RWD" , "Petrol" ,5 ,'Manual',      "KA21AS8734", 300, 1001, 30000, '2018',2, 'silver', 'ms_ecco'),
("Maruti Suzuki" ,  "Alto K10" ,        "FWD" , "Petrol" ,5 ,"Manual",      "KA06TY7698", 210, 1001, 25000, '2017',4, 'red',    'ms_altok10'),
("Maruti Suzuki" ,  "Celerio X" ,       "FWD" , "Petrol" ,5 ,"Automatic",   "KA08HG3456", 230, 1002, 25000, '2018',4, 'yellow', 'ms_celerio'),
("Maruti Suzuki" ,  "Dzire" ,           "FWD" , "Diesel" ,5 ,"Automatic",   "KA01UH4523", 260, 1002, 25000, '2018',4, 'white',  'ms_dzire'),
("Maruti Suzuki" ,  "Dzire" ,           "FWD" , "Diesel" ,5 ,"Manual",      "KA01UH4213", 240, 1001, 25000, '2018',4, 'white',  'ms_dzire'),
("Maruti Suzuki" ,  "Dzire" ,           "FWD" , "Diesel" ,5 ,"Manual",      "KA01MG4203", 240, 1003, 40000, '2016',5, 'white',  'ms_dzire'),
("Volkswagen" ,     "Ameo" ,            "FWD" , "Diesel" ,5 ,"Manual",      "KA02NK7867", 260, 1003, 25000, '2018',4, 'yellow', 'vw_ameo'),
("Volkswagen" ,     "Ameo" ,            "FWD" , "Diesel" ,5 ,"Manual",      "KA06YT9067", 260, 1004, 25000, '2016',4, 'yellow', 'vw_ameo'),
("Audi" ,           "A3" ,              'FWD' , "Diesel" ,5 ,"Automatic",   "KA01HL2002", 420, 1003, 25000, '2018',4, 'black',  'audi_a3'),
("Audi" ,           "Q3" ,              "FWD" , "Diesel" ,5 ,"Manual",      "KA08BH3002", 430, 1003, 25000, '2018',5, 'black',  'audi_q3'),
("Volvo" ,          "Xc40" ,            "AWD" , "Petrol" ,5 ,"Automatic",   "KA23NG4567", 470, 1003, 5000, '2022',5, 'white',   'volvo_xc40'),
("Maruti Suzuki" ,  "Swift" ,           "FWD" , "Petrol" ,5 ,"Manual",      "KA08UY6798", 220, 1004, 25000, '2018',4, 'blue',   'ms_swift')
;



--Customers:

insert into customer(cust_id,name,DOB,license_no,gender,phone_no, email, address, password) 
values 
(2002, "Morty", "2002-06-18","PQ798TY65",'Male',0987654321,  'morty@gmail.com','#4, geneva street, kormanagala', 'mortypwd'),
(2001, "Rick", "2003-04-15","HY786TY65",'Male',9876543210, 'ricksanchez@gmail.com','#3, polo street, jp nagar', 'rickpwd')
;


--Employees:

insert into Employee(emp_id,name,dob,JoinDate,gender,branch_id, email, address, password)
values
(3002, "Angela","1998-03-017","2020-03-05",'Female',1003, 'angelamartin@gmail.com', '#23 commerical street', 'angelapwd')
(3001, "Kevin","1995-09-02","2019-01-15",'Male',1003, 'kevin@gmail.com', '#6, home street, ulsoor', 'keinpwd'),
;

insert into Employee(emp_id,name,dob,JoinDate,gender,branch_id, email, address, password)
values
(3003, "Jim","1994-06-09","2019-01-15",'Male',1001, 'jim@gmail.com', '#8, Coner House', 'jimpwd'),
(3004, "Pam","1989-05-07","2020-03-05",'Female',1002, 'pam@gmail.com', '#29 VP street', 'pampwd'),
(3005, "Dwight","1988-11-17","2020-03-05",'Male',1004, 'dwight@gmail.com', '#21 Farm Road', 'dwightpwd')
;

--Transactions:

-- insert into Transactions(trans_id, cust_id,car_reg_no, branch_id, startTime, endTime)
-- values
-- (4001, 2001, "KA01MG4203",1003, '2023-11-12 14:30:00', '2023-11-15 09:30:00'),
-- (4002, 2002, "KA01HL2002",1003, '2023-11-13 14:30:00', '2023-11-16 09:30:00');








