CREATE DATABASE car_rental;
use car_rental;

--Creating tables

create table customer (
    cust_id bigint PRIMARY KEY auto_increment,
    name varchar(30) not null,
    DOB date not null,
    address varchar(80) not null,
    email varchar(30) not null,
    license_no varchar(20) not null,
    gender enum('Male','Female') not null,
    phone_no bigint not null,
    password varchar(20) not null

);

create table cars(
    reg_no varchar(10) PRIMARY KEY,
    km_driven int,
    year_manf YEAR not null,
    branch_id bigint not null,
    capacity int ,
    transmission enum('Manual','Automatic'),
    rating int ,
    brand varchar(20) not null,
    model varchar(40) not null,
    colour varchar(20),
    drivewheel enum('FWD','RWD','AWD'),
    price_per_hour int not null,
    fuel enum('petrol','diesel','electric','CNG'),
    img varchar(40)

);

create table branch(
    manager_id BIGINT,
    branch_id BIGINT primary key,
    name varchar(40),
    address varchar(80)
);

create table Employee(
    emp_id bigint PRIMARY KEY auto_increment,
    name varchar(30) not null,
    dob date not null,
    JoinDate date not null,
    email varchar(30) not null,
    address varchar(80),
    Gender enum('Male','Female') not null,
    branch_id bigint,
    password varchar(20) not null
);

create table Transactions(
    trans_id bigint PRIMARY KEY auto_increment,
    cust_id bigint not null,
    car_reg_no varchar(10) not null,
    startTime DateTime ,
    endTime DateTime,
    Status enum('InProgress','Completed','Cancelled','Initiated'),
    amount decimal(10,2),
    branch_id bigint not null
);

create table Payment(
    pay_id bigint PRIMARY KEY,
    trans_id bigint not null,
    amount decimal(10,2),
    status enum('successful','unsuccessful')
);

-- Adding foreign key constraints

ALTER TABLE cars
ADD FOREIGN KEY (branch_id) REFERENCES branch(branch_id);

ALTER TABLE branch
ADD FOREIGN KEY (manager_id) REFERENCES Employee(emp_id)
on delete set null;

ALTER TABLE Employee
ADD FOREIGN KEY (branch_id) REFERENCES branch(branch_id);

ALTER TABLE Transactions
ADD FOREIGN KEY (cust_id) REFERENCES customer(cust_id);

ALTER TABLE Transactions
ADD FOREIGN KEY (car_reg_no) REFERENCES cars(reg_no);

ALTER TABLE Transactions 
ADD FOREIGN KEY (branch_id) REFERENCES branch(branch_id);

ALTER TABLE Payment
ADD FOREIGN KEY (trans_id) REFERENCES Transactions(trans_id);

