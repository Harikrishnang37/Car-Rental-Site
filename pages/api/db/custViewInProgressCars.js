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
    user: 'root',
    password: 'haricanesql@123',
    database: 'car_rental'
  });

  console.log("view in prog called")
      
  const queryString = 
    `
    select Cr.brand as brand, Cr.model as model, Cr.reg_no as reg_no, B.name as branch, T.startTime as startTime, T.endTime as endTime, T.amount as amount, T.status as status 
    from transactions T 
    join customer C on T.cust_id = C.cust_id 
    join cars Cr on Cr.reg_no = T.car_reg_no 
    join branch B on B.branch_id = T.branch_id 
    where Status = 'InProgress' and (C.email = "${req.body.email}" or C.phone_no = "${req.body.email}" or C.cust_id LIKE "${req.body.email}");
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