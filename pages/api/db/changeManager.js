import mysql from 'mysql2';

// fetch_data = {
//     name: name,
//     phone_no : phone,
//     email : email,
//     address : address,
//     dob : DOB,
//     lis_no : Lis_no,
//     gender : gender,
//     password : password
// }

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'haricanesql@123',
    database: 'car_rental'
  });
    
  const data = req.body;
  const queryString = 
    `
    call changeMan(${req.body.man_id},"${req.body.name}","${req.body.email}","${req.body.address}",'${req.body.gender}','${req.body.password}',${req.body.branch_id},"${req.body.dob}");
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