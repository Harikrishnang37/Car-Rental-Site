'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react';
import { EmpTable } from '@/components/EmpTable';
import EmpRegForm from '@/components/EmpRegForm';



function Emp_info() {

    const [emps, setEmps] = useState([]);
    const [managerEmail, setManagerEmail] = useState('');
    const [showRegisterForm ,setShowRegisterForm] = useState('hidden')

    useEffect(() => {
        const getData = () => {
            setEmps(JSON.parse(window.localStorage.getItem('emps')))
            setManagerEmail(JSON.parse(window.localStorage.getItem('manager_email')))
        }
        return () => getData();
      }, []);

      const showRegister = (e) =>{
        setShowRegisterForm('')
    }

      async function removeEmployee(emp_id){
        console.log("remove emp clicked", emp_id)

        await fetch('http://localhost:3000/api/db/deleteEmployee',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                emp_id : emp_id
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log("delete result",data)
        });

        await fetch('http://localhost:3000/api/db/getEmployees',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : managerEmail,
              emp_id : ""
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emps', JSON.stringify(data));
  
        });

        setEmps(JSON.parse(window.localStorage.getItem('emps')))
      }

    return (
        <div className='flex flex-col w-full h-screen'>
            <div className='w-full my-5  flex flex-row items-center justify-between mx-4 mr-4'>
                <p className='ml-4  text-4xl'>Employee details of your branch</p>
                <Link href='./' className='mr-14   border-2 border-stone-200 rounded-md px-2 py-[1px] hover:text-white hover:border-transparent hover:bg-orange-400'>Switch to Rent info</Link>
            </div>
            <div>
                <EmpTable empArr = {emps} removeEmployee = {removeEmployee}></EmpTable>
            </div>
            <div className='flex flex-row justify-end w-full'>
                <button className='text-white mt-3  self-end mx-8 bg-orange-400 rounded-md p-2 text-xl'  onClick={showRegister}  >Add new employee</button>
            </div>
            <div>
                <div className={`fixed ${showRegisterForm} top-0 flex flex-row justify-center items-center bg-gray-600 bg-opacity-50 z-100 w-full h-full`}>
                    <EmpRegForm showForm={showRegisterForm} setShowForm={setShowRegisterForm} setEmps = {setEmps} ></EmpRegForm>
                </div>
            </div>
        </div>
    )
}

export default Emp_info