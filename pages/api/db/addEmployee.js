import mysql from 'mysql2';

// Requirement:
// const fetch_data = {
//     name: name,
//     email : email,
//     address : address,
//     dob : DOB,
//     gender : gender,
//     password : password,
//     branch_manager_email: ""
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
    insert into Employee(name, email, address,gender,password, JoinDate,branch_id,dob   )
    values
    ("${req.body.name}","${req.body.email}","${req.body.address}",'${req.body.gender}','${req.body.password}',curdate(), ${req.body.branch_id},"${req.body.dob}");
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