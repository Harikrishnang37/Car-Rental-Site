import React from 'react'
import { useState } from 'react';

function Signup(props) {

    const [gender , setGender] = useState('Male');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [DOB, setDob] = useState("");
    const [Lis_no, setLis] = useState("");
    const [password, setPassword] = useState("");
    const [userExists, setUserExists] = useState(false);
    const [userAdded, setUserAdded] = useState(false);



    const handleRegister = () => {
        props.setShowForm('hidden')
        const form = document.getElementById('regForm');
        form.reset();
        setUserExists(false);
        setUserAdded(false);
    }

    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
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
    const handleLis = (e) => {
        setLis(e.target.value)
    }
    const hanldePwd = (e) => {
        setPassword(e.target.value)
    }

    const handleReg = async (e) => {
        e.preventDefault()

        const fetch_data = {
            name: name,
            phone_no : phone,
            email : email,
            address : address,
            dob : DOB,
            lis_no : Lis_no,
            gender : gender,
            password : password
        }

        fetch('http://localhost:3000/api/db/checkUser',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email: email,
              phone_no : phone
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log( data)
            if(data)
            {
            setUserExists(true);
            setUserAdded(false);
            }
            else {setUserExists(false)}
        });

        if(userExists)
        {
            console.log("user exists");
        }
        else
        {
            fetch('http://localhost:3000/api/db/addCustomer',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(fetch_data)
            }).then((response) => response.json())
            .then((data) => {
                console.log( data)
                
            });
            console.log("user added");
            setUserAdded(true);
            setUserExists(false);

        }




    }

    return (
        <div className='flex flex-col w-[35%] items-center bg-white justify-start gap-6 mx-4  border-2 h-[75%] drop-shadow-md rounded-md '>
            <p className='font-bold text-3xl mt-7'>Register</p>
            <form id = 'regForm' className='text-black flex flex-col items-center w-[60%] gap-4  ' onSubmit={handleReg}>
                <input type='text' onChange={handleName} placeholder='Name' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleEmail} placeholder='Email' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handlePhone} placeholder='PhoneNumber' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleAddress} placeholder='Address' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleDob} placeholder='DOB: yyyy-mm-dd' pattern = "^\d{4}-\d{2}-\d{2}$" className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
                <input type='text' onChange={handleLis} placeholder='License Number' className='p-1 w-full text-sm rounded-md focus:outline-none focus:outline focus:outline-orange-400'></input>
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

                <input type='submit' value="Register" className='bg-orange-500 w-full text-sm rounded-lg px-2  py-1'></input>
                <p className= {userExists? 'truncate text-sm text-red-500 self-start': 'truncate text-sm hidden text-red-500 self-start'}>
                    User Already exists
                </p>
                <p className= {userAdded? 'truncate text-sm text-green-500 self-start': 'truncate text-sm hidden text-green-500 self-start'}>
                    User Added!
                </p>
            </form>
            <div className='flex flex-col w-[60%] '>
                <button className='hover:underline text-sm self-end' onClick={handleRegister} >Close</button>
            </div>
        </div>
    )
}

export default Signup