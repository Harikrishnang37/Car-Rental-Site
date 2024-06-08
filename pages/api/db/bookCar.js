import mysql from 'mysql2';

// Requirement:
// const fetch_body = {
//         email: "jason@gmail.com",
//         phone_no : '9876543210',
//
// }

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'haricanesql@123',
    database: 'car_rental'
  });
      
  const queryString = 
  `
  insert into Transactions(cust_id, car_reg_no, branch_id, startTime, endTime,status, amount)
  values
  (${req.body.cust_id}, 
      "${req.body.car_reg_no}",
      ${req.body.branch_id},
      '${req.body.startTime}',
      '${req.body.endTime}',
      'InProgress',
      '${req.body.amount}'
  )
  `;

  //console.log(queryString);

  db.query(queryString, (err, results) => {
      
      if (err) {
        // Handle error
        console.log(err)
      } else {
        //console.log(results);
        res.json(results);
        db.end();
      }
  });


  

}