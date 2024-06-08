import mysql from 'mysql2';

// Requirement:
// const fetch_body = {
//         email: "morty@gmail.com",
//         phone_no : '9876543210',
//         password : mortypwd
//
// }

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'customer',
    password: 'customerpwd',
    database: 'car_rental'
  });
      
  const queryString = 
    `
    select * from customer
    where (email = '${req.body.email}' or phone_no = '${req.body.phone_no}') and password = '${req.body.password}';
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