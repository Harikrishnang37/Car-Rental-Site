import mysql from 'mysql2';

// Requirement:
// const fetch_body = {
//         email: "jason@gmail.com",
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
    select * from employee E where E.branch_id = (
        select branch_id from employee M
        where M.email = "${req.body.email}" or M.emp_id LIKE '${req.body.emp_id}'
    )
    and E.email <> "${req.body.email}" and E.emp_id NOT LIKE '${req.body.emp_id}' ;
    `;

  //console.log(queryString);

  db.query(queryString, (err, results) => {
      
      if (err) {
        // Handle error
        console.log(err)
      } else {
        console.log("emps",results);
        res.json(results);
        db.end();
      }
  });


  

}