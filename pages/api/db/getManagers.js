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
    select B.branch_id, E.name as name, B.name as branch_name, E.emp_id, E.gender, E.JoinDate from branch B 
    join employee E on b.manager_id = E.emp_id;
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