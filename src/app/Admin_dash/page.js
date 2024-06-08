'use client'
import React, { useState } from 'react'
import Sec_Nav from '@/components/Sec_Nav'
import { ManTable } from '@/components/ManTable';
import ManRegForm from '@/components/ManRegForm';
import { AnalyticsTable } from '@/components/AnalyticsTable';

function Admin_dash() {

  const [managers, setManagers] = useState(JSON.parse(window.localStorage.getItem('managers')));
  const [showRegisterForm, setShowRegisterForm] = useState('hidden')
  const [row, setRow] = useState({})
  const [AnalData, setAnalData] = useState(JSON.parse(window.localStorage.getItem('analytics')));

  const showRegister = (e) => {
    setShowRegisterForm('')
  }

  async function removeClicked(row) {
    setRow(row);
    setShowRegisterForm('')
  }

  return (
    <>

      <div>
        <p className='text-2xl mt-5 mb-3 mx-5 hover:underline'>Branch-wise Analytics</p>
        <AnalyticsTable empArr={AnalData} ></AnalyticsTable>
      </div>

      <div>
        <p className='text-2xl mt-5 mb-3 mx-5 hover:underline' >Managers</p>
        <ManTable empArr={managers} removeEmployee={removeClicked}></ManTable>
      </div>

      <div>
        <p></p>
        <div className={`fixed ${showRegisterForm} top-0 flex flex-row justify-center items-center bg-gray-600 bg-opacity-50 z-100 w-full h-full`}>
          <ManRegForm showForm={showRegisterForm} setShowForm={setShowRegisterForm} row={row} setManagers={setManagers} setAnalData= {setAnalData}></ManRegForm>
        </div>
      </div >
    </>
  )
}

export default Admin_dash