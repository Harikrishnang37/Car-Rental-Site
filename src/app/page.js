'use client'
import Image from 'next/image'
import homeImage from '/public/Homepage.png'
import Signup from '@/components/Signup'
import { signIn } from "next-auth/react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function Home() {

  const router = useRouter()
  const { data: session, status } = useSession();

  const [emailPhone, setEmailPhone ] = useState("")
  const [password, setPassword ] = useState("")
  const [userType, setUserType] = useState("Customer")
  
  const [showRegisterForm ,setShowRegisterForm] = useState('hidden')

  const [errormsg, seterrormsg] = useState(false)

  const handleUserChange = (e) =>{
    setEmailPhone(e.target.value)
    
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
    console.log(password)

  }

  const handleuserType = (e) => {
    setUserType(e.target.value)
  }

  const showRegister = (e) =>{
    
      setShowRegisterForm('')
    
  }

  const Switch = (e) => {
    if(staffCustomer === 'Staff')
      setStaffCustomer('Customer')
    else
      setStaffCustomer('Staff')
  }

  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
  };

  const handleSigninSubmit = async (e) =>{
    e.preventDefault()
    console.log("Hello")
    seterrormsg(false);

    let res = await signIn('credentials',{
      email: emailPhone,
      password: password,
      userType : userType,
      redirect : false,
    })

    console.log(res)

    if(res.error == null)
    {
      //get all branch names and store it in localstorage before redirecting user.
      if(userType == 'Customer')
      {
        fetch('http://localhost:3000/api/db/getAllBranches',
        {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('All_Branches', JSON.stringify(data));
        });

        fetch('http://localhost:3000/api/db/custViewInProgressCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('cust_inprog_cars', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/custViewPastCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('cust_past_cars', JSON.stringify(data));
  
        });

        
        router.push('/dashboard');
      }
      else if(userType == 'Employee')
      {

        fetch('http://localhost:3000/api/db/empViewInProgressCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              branch : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emp_inprog_cars', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/empViewPastCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              branch : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emp_past_cars', JSON.stringify(data));
  
        });

        router.push('/Emp_dash');
      }
      else if(userType == 'Manager')
      {
        window.localStorage.setItem('manager_email',JSON.stringify(emailPhone))

        fetch('http://localhost:3000/api/db/empViewInProgressCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              branch : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emp_inprog_cars', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/empViewPastCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              branch : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emp_past_cars', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/getEmployees',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emps', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/getBranchID',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          console.log("branch_id", data)
          window.localStorage.setItem('branch_id', JSON.stringify(data[0].branch_id));

        });

        router.push("/Manager_dash");
      }
      else if(userType == 'Admin')
      {
        fetch('http://localhost:3000/api/db/getManagers',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : emailPhone,
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          console.log("managers", data)
          window.localStorage.setItem('managers', JSON.stringify(data));

        });

        fetch('http://localhost:3000/api/db/getAnalytics',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : "",
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          console.log("analytics", data)
          window.localStorage.setItem('analytics', JSON.stringify(data));

        });


        router.push("/Admin_dash");
      }
    }
    else
    {
      seterrormsg(true);
    }
  }

  return (
    <div className='relative'>
      <div className=' relative flex flex-col font-poppins items-center text-4xl my-3'>
        <p className='tracking-wide'>
          Why buy a <span className='text-orange-400'>car ?</span>
        </p>
        <p className='tracking-wide'>
          <span className='text-orange-500'>when you can Rent</span> from us 😁
        </p>
      </div>
      <div className='flex flex-row gap-4 mb-2'>
        <Image src={homeImage} className='w-[50%] ml-4 rounded-md' alt=''></Image>
        <div className='w-full flex flex-row justify-center'>
          <div className='flex flex-col w-[70%] items-center justify-start gap-6 mx-4  border-2 h-full shadow-md rounded-md '>
            <p className='font-bold text-3xl mt-7'>Login</p>
            <form className='text-black flex flex-col items-center w-[60%] gap-4  ' onSubmit={handleSigninSubmit}>
              <input type='text' onChange={handleUserChange} placeholder='Email or ph-no' className='p-1 hover:border-2 focus:border-none hover:border-orange-400 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
              <input type='password' onChange={handlePassword} value={password} placeholder='Password' autoFocus className='p-1 hover:border-2 focus:border-none hover:border-orange-400 text-sm rounded-md w-full focus:outline-none focus:outline focus:outline-orange-400'></input>
              
              <div id = "userType1" className='w-full flex flex-row gap-2 justify-start items-center '>
                <label className='px-2'>
                      <input className='px-2'
                          type="radio"
                          id="Customer"
                          name="userType"
                          value="Customer"
                          checked = {userType == 'Customer'? true: false}
                          onChange={handleuserType}
                          />
                  &nbsp;Customer
                  </label>
                  <label className='px-2'>
                      <input className='px-2'
                          type="radio"
                          id="Employee"
                          name="userType"
                          value="Employee"
                          checked = {userType == 'Employee'? true: false}
                          onChange={handleuserType}
                      />
                  &nbsp;Employee
                  </label>
              </div>
              <div id = "userType2" className='flex flex-row w-full justify-start gap-2 items-center'>
                  <label className='px-2 tracking-wider'>
                      <input className='px-2'
                          type="radio"
                          id="Manager"
                          name="userType"
                          value="Manager"
                          checked = {userType == 'Manager'? true: false}
                          onChange={handleuserType}
                      />
                  &nbsp;Manager
                  </label>
                  <label className='px-2'>
                      <input className='px-2'
                          type="radio"
                          id="Admin"
                          name="userType"
                          value="Admin"
                          checked = {userType == 'Admin'? true: false}
                          onChange={handleuserType}
                      />
                  &nbsp;Admin
                  </label>
              </div>
              
              
              <input type='submit' value="Sign in" className='bg-orange-500 hover:cursor-pointer w-full text-sm rounded-lg px-2  py-1' ></input>
              <p className= {errormsg? 'truncate text-sm text-red-500 self-start': 'truncate text-sm hidden text-red-500 self-start'} >
                Authentication Failed
              </p>
            </form>
            <div className='flex flex-col w-[60%] '>
              <p className='self-end text-sm'>
                Don't have an account?
              </p>
              <button className='hover:underline text-sm self-end mt-0' onClick={showRegister}  >register</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed ${showRegisterForm} top-0 flex flex-row justify-center items-center bg-gray-600 bg-opacity-50 z-100 w-full h-full`}>
        <Signup showForm={showRegisterForm} setShowForm={setShowRegisterForm} ></Signup>
      </div>

    </div>
  )
}
