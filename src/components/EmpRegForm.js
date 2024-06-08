'use client'
import React from 'react'
import { useState } from 'react';

function EmpRegForm(props) {

    const [gender , setGender] = useState('Male');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [DOB, setDob] = useState("");
    const [password, setPassword] = useState("");

    const [bid , setBid] = useState(JSON.parse(window.localStorage.getItem('branch_id')));
    const[manager_email, setMEmail] = useState(JSON.parse(window.localStorage.getItem('manager_email')))

    // const [userExists, setUserExists] = useState(false);
    // const [userAdded, setUserAdded] = useState(false);

    const handleRegister = () => {
        props.setShowForm('hidden')
        const form = document.getElementById('regForm');
        form.reset();
    }

    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleDob = (e) => {
        setDob(e.target.value)
    }
    const hanldePwd = (e) => {
        setPassword(e.target.value)
    }

    const handleReg = async (e) => {
        e.preventDefault()

        const fetch_data = {
            name: name,
            email : email,
            address : address,
            dob : DOB,
            gender : gender,
            password : password,
            branch_id: 1003
        }

        console.log("fetchdata", fetch_data)

       await fetch('http://localhost:3000/api/db/addEmployee',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(fetch_data)
        }).then((response) => response.json())
        .then((data) => {
        });

        fetch('http://localhost:3000/api/db/getEmployees',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : manager_email,
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emps', JSON.stringify(data));
          props.setEmps(data);
  
        });

        console.log("emp reg clicked")
        const form = document.getElementById('regForm');
        form.reset();



    }

    return (
        <div className='flex flex-col w-[35%] items-center bg-white justify-start gap-6 mx-4  border-2 h-[75%] drop-shadow-md rounded-md '>
            <p className='font-bold text-3xl mt-7'>Register</p>
            <form id = 'regForm' className='text-black flex flex-col items-center w-[60%] gap-4  ' onSubmit={handleReg}>
                <input type='text' onChange={handleName} placeholder='Name' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleEmail} placeholder='Email' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleAddress} placeholder='Address' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleDob} placeholder='DOB: yyyy-mm-dd' pattern = "^\d{4}-\d{2}-\d{2}$" className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='password' onChange={hanldePwd} placeholder='password' className='p-1 text-sm rounded-md w-full focus:outline-none focus:outline focus:outline-orange-400'></input>
                <label>
                    <input
                        type="radio"
                        id="Male"
                        name="gender"
                        value="Male"
                        checked = {gender == 'Male'? true: false}
                        onChange={handleGender}
                        />
                Male
                </label>
                <label>
                    <input
                        type="radio"
                        id="Female"
                        name="gender"
                        value="Female"
                        checked = {gender == 'Female'? true: false}
                        onChange={handleGender}
                    />
                Female
                </label>

                <input type='submit' value="Confirm" className='bg-orange-500 w-full text-sm rounded-lg px-2  py-1'></input>

            </form>
            <div className='flex flex-col w-[60%] '>
                <button className='hover:underline text-sm self-end' onClick={handleRegister} >Close</button>
            </div>
        </div>
    )
}

export default EmpRegForm