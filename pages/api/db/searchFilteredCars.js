import mysql from 'mysql2';

export default function handler(req,res){

  const db =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'haricanesql@123',
    database: 'car_rental'
  });

  // console.log("request body",req.body)
      
  const queryString = 
    `select * from cars C 
    where C.branch_id = (
        select B.branch_id from branch B where B.name = '${req.body.branch}'
    )
    and not exists(
        select * from transactions T
        where T.car_reg_no = C.reg_no and(
        startTime BETWEEN "${req.body.startTime}" AND "${req.body.endTime}"
        or endTime BETWEEN "${req.body.startTime}" AND "${req.body.endTime}"
        )
    )
    and C.fuel LIKE '${req.body.fuel}' 
    and C.transmission LIKE '${req.body.transmission}' 
    and C.rating LIKE '${req.body.ratings}'
    and C.capacity LIKE '${req.body.capacity}'
    ORDER BY C.price_per_hour ${req.body.sort} 
    ;
    `;

  //console.log(queryString);

  db.query(queryString, (err, results) => {
      
      // console.log("hello from searchfilterd")
      
      if (err) {
        // Handle error
        res.json(err)
        console.log(err)
      } else {
        //console.log(results);
        res.json(results);
        db.end();
      }
  });


  

}