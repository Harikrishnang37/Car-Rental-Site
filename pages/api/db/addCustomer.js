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
    insert into customer(name,DOB,license_no,gender,phone_no, email, address, password) 
    values 
    ("${data.name}", "${data.dob}","${data.lis_no}",'${data.gender}',${data.phone_no}, '${data.email}',"${data.address}", '${data.password}');
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