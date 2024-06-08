import mysql from 'mysql2';

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'haricanesql@123',
    database: 'car_rental'
  });
      
  const queryString = 
    `
    update transactions set status = 'Completed' where trans_id = ${req.body.trans_id};
    
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