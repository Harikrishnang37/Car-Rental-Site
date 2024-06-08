'use client'
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import dashBoard from '/public/Dashboard.jpg'
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { ST } from 'next/dist/shared/lib/utils'
import { CarsCard } from './carselect/cards'
import { TransTable } from '@/components/TransTable'
import { Toggle } from "@/components/ui/toggle"


function login() {
  
  const [allBranches, setAllBranches] = useState([]);
  const [timediff, setTimeDiff] = useState(0);
  const [inprogCars , setInprogCars] = useState([])
  const [pastCars , setPastCars] = useState([])

  const [showPast, setShowPast] = useState(false)
  const [showInprog, setShowInprog] = useState(false)
  const [PastText, setPastText] = useState("View Past Bookings")
  const [InprogText, setInprogText] = useState("View Current Bookings")
  

  useEffect(() => {
    const data = window.localStorage.getItem('All_Branches');
    setAllBranches(JSON.parse(data))
    //setInprogCars(JSON.parse(window.localStorage.getItem('cust_inprog_cars')))
  },[])


  function getInProgCars(){

    setShowInprog(!showInprog)
    if(InprogText == 'View Current Bookings')
    {
      setInprogText('Hide Current Bookings')
    }
    else if(InprogText == 'Hide Current Bookings')
    {
      setInprogText('View Current Bookings')
    }
    setInprogCars(JSON.parse(window.localStorage.getItem("cust_inprog_cars")))
    console.log("inprog clicked")

  }

  function getPastCars(){

    setShowPast(!showPast)
    if(PastText  == 'View Past Bookings')
    {
      setPastText('Hide Past Bookings')
    }
    else if(PastText   == 'Hide Past Bookings')
    {
      setPastText('View Past Bookings')
    }
    setPastCars(JSON.parse(window.localStorage.getItem("cust_past_cars")))
    console.log("past clicked")
  }
  
  // console.log("inprog cars",inprogCars);
  // console.log("past cars",pastCars);

  const [selectValue,setSelectValue] = useState("")
  const [startTime,setStartTime] = useState('')
  const [endTime,setEndTime] = useState('')
  const { data: session, status } = useSession();
  const router = useRouter()

  const handleSelect = (e) =>{
    setSelectValue(e.target.value)
    console.log(selectValue)
    console.log(session)
  }
  const handleStartTime = (e) =>{
    setStartTime(e.target.value)
    console.log(startTime)
  }
  const handleEndTime = (e) =>{
    setEndTime(e.target.value)
    console.log(endTime)
  }
  function formatDateTime(inputDateTime) {
    const dd = inputDateTime.toString().slice(8,10);
    const mm = inputDateTime.toISOString().slice(5,7);
    const yyyy = inputDateTime.toISOString().slice(0,4);
    const time = inputDateTime.toString().slice(16,24);
    const formattedDateTimeString = dd + '-' + mm + '-' + yyyy +' '+time;
    return formattedDateTimeString;
  }
  function fixDate(inputdate){
    const yyyy = inputdate.slice(6,10);
    const dd = inputdate.slice(0,2);
    const mm = inputdate.slice(3,5);
    const time = inputdate.slice(11,19);

    const fixedDate = yyyy+'-'+mm+'-'+dd+' '+time;
    return fixedDate;
}

  const handleSubmit = (e) =>{
    e.preventDefault()

    var timeOK = false;
    var sTime;
    var eTime;
    var TimeDiffHours;

    //validate time.
    if(startTime >= endTime)
    {
      console.log("time error");
      timeOK = false;
    }
    else{

      sTime = new Date(startTime);
      eTime = new Date(endTime);

      const TimeDiffMilisec = eTime.getTime() - sTime.getTime();
      TimeDiffHours = TimeDiffMilisec/(1000*60*60);
      console.log(TimeDiffHours);

      if(TimeDiffHours >= 2)
      {
        console.log("time is fine");
        timeOK = true;
      }
    }
    var branchOK = true;
    if(selectValue == 'choose')
    {
      branchOK == false;
      console.log("no branch selected")
    }

    if(timeOK && branchOK)
    {
      //format time:
      const f_sTime = formatDateTime(sTime);
      const f_eTime = formatDateTime(eTime);

      // console.log("stime",f_sTime);
      // console.log("etime",f_eTime);

      fetch('http://localhost:3000/api/db/searchCars',
      {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              branch : selectValue,
              startTime:  fixDate(f_sTime),
              endTime: fixDate(f_eTime)
          })
      }).then((response) => response.json())
      .then((data) => {
        console.log(data)
        window.localStorage.setItem('disp_cars', JSON.stringify(data));

      });

      const tripData = {
        branch: selectValue,
        startTime:  fixDate(f_sTime),
        endTime: fixDate(f_eTime),
        timediff : TimeDiffHours
      }
      window.localStorage.setItem('trip_Data',JSON.stringify(tripData));
      
      
      router.push('/dashboard/carselect')
    }

  }

  return (
    <div className='w-full h-screen font-poppins flex flex-col items-center '>
      <p className='text-7xl mt-4'>
        Rent a Car
      </p>
      <p className='text-5xl'><span className='text-amber-500'>Book Your best</span> drive now </p>
      <div className='h-[40%] w-[60%] border-t-4 border-r-4 border-amber-400 rounded-lg flex flex-row justify-center items-center  my-4 mx-4'>
        <form className=' flex flex-col top-0 justify-starts content-center gap-4 ' onSubmit={handleSubmit}>
          <div className=' flex flex-row justify-center gap-2'>
            <label htmlFor='1' className='text-orange-500'>Select Branch</label>
            <select onChange={handleSelect} value={selectValue} className='focus:outline-1 focus:outline-orange-400 px-4 rounded-md border-r-2 border-b-2 hover:border-orange-400' id='1' >
              <option key = "choose" value="choose" className='hover:bg-amber-500 text-green-400'></option>
              {
                allBranches.map((branchInfo) => {
                  return <option key = {branchInfo.branch_id} value={branchInfo.name} className='hover:bg-amber-500 text-green-400'>{branchInfo.name}</option>
                })
              }
            </select>
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <label htmlFor='2' className='text-orange-500'>Start</label>
            <input type='datetime-local' min={new Date().toISOString().slice(0, 16)} id='2' value={startTime} onChange={handleStartTime} className='focus:outline-1 focus:outline-orange-400 px-4 rounded-md border-r-2 border-b-2 hover:border-orange-400'></input>
            <label htmlFor='3' className='text-orange-500'>End</label>
            <input type='datetime-local' min={new Date().toISOString().slice(0, 16)} placeholder='hello' id='3' value={endTime} onChange={handleEndTime} className='focus:outline-1 focus:outline-orange-400 px-4 rounded-md border-r-2 border-b-2 hover:border-orange-400'></input>
          </div>
          <input type = 'submit' className='text-white w-auto px-2 py-1 self-end rounded-md hover:cursor-pointer bg-orange-500' value={"Lets select the car"}></input>
        </form>
      </div>

      <div id = 'userTransacs' className='text-left w-full flex flex-col gap-4 items-center'>

        <Toggle onClick={getInProgCars} className=''>{InprogText}</Toggle>
        <div id = 'ongoingTransacs' >
              {showInprog && <TransTable transArr={inprogCars}></TransTable>}
        </div>

        <Toggle onClick={getPastCars} className='' >{PastText}</Toggle>
        <div id = 'pastTransacs'>
              {showPast && <TransTable transArr={pastCars}></TransTable>}
        </div>

      </div>
    </div>
  )
}

export default login