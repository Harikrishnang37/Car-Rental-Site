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
    select B.branch_id, B.name as branch_name,E.emp_id as manager_id, E.name as manager_name, sum(T.amount) as revenue, count(*) as sales
    from transactions T 
    join cars C on C.reg_no = T.car_reg_no 
    join branch B on T.branch_id = B.branch_id
    join employee E on E.emp_id = B.manager_id
    GROUP BY B.branch_id, B.name , E.emp_id,E.name;
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