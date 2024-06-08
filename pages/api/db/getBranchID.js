import mysql from 'mysql2';

// Requirement:
// const fetch_body = {
//         emp_id : '9876543210',
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
    select branch_id from employee where email = "${req.body.email}";
    `;

  console.log(queryString);

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