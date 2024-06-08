import mysql from 'mysql2';

// Requirement:
// const fetch_body = {
//         email: "blah",
//          
//
// }

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'emp',
    password: 'emppwd',
    database: 'car_rental'
  });

  console.log("view in prog called")
      
  const queryString = 
    `
    select Cr.brand as brand, Cr.model as model,Cr.reg_no as reg_no, C.name, C.email, C.cust_id, B.name as branch, T.startTime as startTime, T.endTime as endTime, T.amount as amount, T.status as status, T.trans_id as trans_id  
    from transactions T 
    join customer C on T.cust_id = C.cust_id 
    join cars Cr on Cr.reg_no = T.car_reg_no 
    join branch B on B.branch_id = T.branch_id 
    where T.status = 'InProgress' and (
      T.branch_id = (select branch_id from employee where email = "${req.body.email}")
      or T.branch_id = (select branch_id from branch where name LIKE "${req.body.branch}")
      );
    `;

  //console.log(queryString);

  db.query(queryString, (err, results) => {
      
      if (err) {
        // Handle error
        console.log(err)
      } else {
        console.log(results);
        res.json(results);
        db.end();
      }
  });


  

}