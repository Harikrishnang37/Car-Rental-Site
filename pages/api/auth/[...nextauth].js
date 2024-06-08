'use Client'
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { res } from "next-auth/react";
const mysql = require('mysql2/promise');


const authOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{
                // username: { label: "Username", type: "text", placeholder: "jsmith" },
                // password: { label: "Password", type: "password" }
            },

            async authorize(credentials){
                //const user = {id :"1", name: 'John', password: "boom"}

                //console.log('credentials received',credentials)

                const db =  mysql.createPool({
                    host: 'localhost',
                    user: 'root',
                    password: 'haricanesql@123',
                    database: 'car_rental'
                });

                const userType = credentials.userType;

                if(userType == 'Admin')
                {
                    if(credentials.email == "Admin")
                    {
                        if(credentials.password == "Admin")
                        {
                            const user = {id: "1", name: "Admin", password: "Admin"};
                            console.log("Admin login sucessful");
                            return user;
                        }
                        else {
                            console.log("Wrong password for Admin");
                            return null;
                        }
                    }
                    else{
                        console.log("Wrong email for Admin");
                        return null;
                    }
                }
                else if(userType == "Customer")
                {
                    const queryString = 
                      `select * from customer
                      where email = '${credentials.email}' or phone_no = '${credentials.email}';
                      `;
    
                    const [results, fields] = await db.query(queryString);
        
                    if(results.length > 0)
                    {
                        if(results[0].password == credentials.password)
                        {
                            const user = {id: results[0].cust_id, name: results[0].name, password: results[0].password, userType: userType}
                            console.log("customer password match");
                            console.log(user);
                            return user;
                        }
                        else{
                            console.log("customer incorrect password");
                            return null;
                        }
                    }
                    else{
                        console.log("no such customer");
                        return null;
                    }
                }
                else if (userType == 'Employee')
                {
                    const queryString = 
                    `
                    select * from employee
                    where email = '${credentials.email}';
                    `;
                    const [results, fields] = await db.query(queryString);

                    if(results.length > 0)
                    {
                        if(results[0].password == credentials.password)
                        {
                            console.log("employee password match");
                            console.log("results",results)
                            const user = {id: results[0].emp_id, name: results[0].name, password: results[0].password, userType: userType};
                            console.log("user",user);
                            return user;
                        }
                        else{
                            console.log("employee incorrect password");
                            return null;
                        }
                    }
                    else{
                        console.log("no such employee");
                        return null;
                    }
                    
                }
                else if (userType == 'Manager')
                {
                    const queryString = 
                    `
                    select * from employee
                    where email = '${credentials.email}';
                    `;
                    const [results, fields] = await db.query(queryString);

                    if(results.length > 0) // it is an employee
                    {
                        const queryString2 = 
                        `
                        select * from employee E
                        where email = '${credentials.email}'
                        and exists (
                        select * from branch B where E.emp_id = B.manager_id
                        );
                        `;
                        const [results2, fields] = await db.query(queryString2);

                        if(results2.length > 0) //it is a manager
                        {
                            if(results2[0].password == credentials.password)
                            {
                                const user = { id: results2[0].emp_id, name : results2[0].name, password: results2[0].password, userType: userType };
                                console.log("manager login success")
                                return user;
                            }
                            else{
                                console.log("incorrect password");
                            }
                        }
                        else{ // not a manager, but is an employee
                            console.log("Not a manager")
                        }
                    }
                    else{ //not an employee
                        console.log("no such employee");
                    }
                }

                                     
            }
        })
    ],
    callbacks:{
        async jwt({token, user, session}){     
            
            //take what you want from user and put it into token
            if(user){
                return {
                    ...token,
                    userType : user.id
                };
            }
            else return token;
        },
        async session ({session, token , user}){

            //take what you want from token and put it into session:
            if(token)
            {
                return{
                    ...session,
                    user: {
                        ...session.user,
                        id : token.id,
                        userType : token.userType
                    }
                }
            }
            return session;
        }
      
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/",
    }
}

const handler = NextAuth(authOptions)

export default handler