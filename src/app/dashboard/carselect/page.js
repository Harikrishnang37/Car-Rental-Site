'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import rArrow from '/public/right-arrow.svg'
import { CarsCard } from './cards'
import { useEffect } from 'react'


function Carpage() {

    const [dispCars ,setDispCars] = useState([]);
    const [tripData, setTripData] = useState(JSON.parse(window.localStorage.getItem('trip_Data')));
    const [mybool, setMybool] = useState(false)

    const [sort, setSort] = useState("")
    const [fuel, setFuel] = useState("%")
    const [capacity, setCapacity] = useState("%")
    const [transmission, setTransmission] = useState("%")
    const [ratings, setRatings] = useState("%")
    const [filters, setFilters] = useState({
            sort : "",
            fuel : '%',
            capacity : '%',
            transmission : '%',
            ratings : '%',
        }
    );

    useEffect(() => {
        const data = window.localStorage.getItem('disp_cars');
        setDispCars(JSON.parse(data));
        // const data2 = window.localStorage.getItem('trip_Data');
        // setTripData(JSON.parse(data2));
        
    },[mybool])
      

    function fixDate(inputdate){
        const yyyy = inputdate.slice(6,10);
        const dd = inputdate.slice(0,2);
        const mm = inputdate.slice(3,5);
        const time = inputdate.slice(11,19);

        const fixedDate = yyyy+'-'+mm+'-'+dd+' '+time;
        return fixedDate;
    }

    async function applyFilter(x){

        const fetchdata = {
            ...x,
            branch: tripData.branch,
            startTime: tripData.startTime,
            endTime : tripData.endTime,
        }

        console.log("filter changed")
        console.log(fetchdata)
        

        fetch('http://localhost:3000/api/db/searchFilteredCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(fetchdata)
        }).then((response) => response.json())
        .then((data) => {
            window.localStorage.setItem('disp_cars', JSON.stringify(data));
            console.log("data inside then",data)
            // const hello = JSON.parse(data)
            setDispCars(data);
        });

    }

    const handleSort = (e) => {
        if (sort != e.target.name)
        {
            setSort(e.target.name)
            setFilters({
                ...filters,
                sort : e.target.name
            });

            applyFilter({...filters,sort:e.target.name})
            setMybool(!mybool)

        }
        else
        {
            setSort('')
            setFilters({
                ...filters,
                sort : ""
            });

            applyFilter({...filters,sort:""})
            setMybool(!mybool)

        }

    }
    const handleFuel = (e) => {
        if (fuel != e.target.name)
        {

            setFilters({
                ...filters,
                fuel : e.target.name
            });
            setFuel(e.target.name)

            applyFilter({...filters,fuel:e.target.name})
            setMybool(!mybool)
        }
        else{

            setFilters({
                ...filters,
                fuel : '%'
            });
            setFuel(e.target.name)
            setFuel('%')
            applyFilter({...filters,fuel:"%"})
            setMybool(!mybool)
        }


        //console.log("fuel")


    }
    const handleCapacity = (e) => {
        if (capacity != e.target.name)
        {
            setCapacity(e.target.name)
            setFilters({
                ...filters,
                capacity : e.target.name
            });

            applyFilter({...filters,capacity:e.target.name})
        }
        else{
            setCapacity("%")
            setFilters({
                ...filters,
                capacity : "%"
            });

            applyFilter({...filters,capacity:"%"})
        }
    }
    const handleTransmission = (e) => {
        if (transmission != e.target.name){
            setTransmission(e.target.name)
            setFilters({
                ...filters,
                transmission : e.target.name
            });

            applyFilter({...filters,transmission:e.target.name})
        }
        else {
            setTransmission("%")
            setFilters({
                ...filters,
                transmission : "%"
            });

            applyFilter({...filters,transmission:"%"})
        }
    }
    const handleRatings = (e) => {
        if (ratings != e.target.name){
            setRatings(e.target.name)
            setFilters({
                ...filters,
                ratings : e.target.name
            });

            applyFilter({...filters,ratings:e.target.name})
        }
        else{
            setRatings("%")
            setFilters({
                ...filters,
                ratings : "%"
            });

            applyFilter({...filters,ratings:"%"})
        }
    }

    const handleReset = (e) => {
        setSort('')
        setFuel('%')
        setRatings('%')
        setCapacity('%')
        setTransmission('%')

        applyFilter({
            sort : "",
            fuel : '%',
            capacity : '%',
            transmission : '%',
            ratings : '%',
        })
    }

    return (
        <div className='w-full h-screen flex flex-row  font-poppins over'>
            <div className=' w-[20%] h-full  '>
                <div className='sticky mt-2 h-[9%]  rounded-t-md text-center text-white p-2 text-2xl bg-orange-400'>
                    Filters
                </div>
                <div className=' w-full  rounded-b-md h-[80%]'>
                    <div className='flex flex-col'>
                        <div className='w-full h-full mx-2 pt-2 flex flex-row justify-between'>
                            <p className=''>Sort by:</p>
                            <button className='rounded-md px-2 mr-4 border-stone-300 border-2 hover:border-transparent hover:text-white hover:bg-orange-400' onClick={handleReset}>Reset</button>
                        </div>
                        <div className='flex flex-row mt-2 '>
                            <button onClick={handleSort} className={sort == 'ASC' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'} name='ASC'>Low-High</button>
                            <button onClick={handleSort} className={sort == 'DESC' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'} name='DESC'>High-Low</button>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2 w-full'>
                        <p className='mx-2'>Fuel type:</p>
                        <div className='flex flex-row w-full flex-wrap pt-1'>
                            <button name='petrol' onClick={handleFuel} className={fuel == 'petrol' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Petrol</button>
                            <button name='diesel' onClick={handleFuel} className={fuel == 'diesel' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Diesel</button>
                            <button name='electric' onClick={handleFuel} className={fuel == 'electric' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>EV</button>
                            <button name='CNG' onClick={handleFuel} className={fuel == 'CNG' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>CNG</button>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2 w-full'>
                        <p className='mx-2'>Capacity:</p>
                        <div className='flex flex-row w-full flex-wrap pt-1'>

                            <button onClick={handleCapacity} name='4' className={capacity == '4' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Four</button>
                            <button onClick={handleCapacity} name='5' className={capacity == '5' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Five</button>
                            <button onClick={handleCapacity} name='7' className={capacity == '7' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Seven</button>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2 w-full'>
                        <p className='mx-2'>Transmission:</p>
                        <div className='flex flex-row w-full flex-wrap pt-1'>

                            <button onClick={handleTransmission} name='Manual' className={transmission == 'Manual' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Manual</button>
                            <button onClick={handleTransmission} name='Automatic' className={transmission == 'Automatic' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>Automatic</button>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <p className='mx-2'>Ratings:</p>
                        <div className='flex flex-row w-full flex-wrap pt-1'>
                            <button onClick={handleRatings} name='3' className={ratings == '3' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>3</button>
                            <button onClick={handleRatings} name='4' className={ratings == '4' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>4</button>
                            <button onClick={handleRatings} name='5' className={ratings == '5' ? 'border-2 border-transparent rounded-md mx-1 text-white bg-orange-500 px-2' : 'border-2 rounded-md mx-1  border-stone-300 px-2'}>5</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-[80%] h-full flex flex-col'>
                <div className='flex flex-row h-[9%] mt-2 mx-10 gap-6'>
                    <div className='border-2 w-full h-full rounded-md border-b-amber-500 flex items-center border-r-amber-500'>
                        <p className=''> {tripData.branch}</p>
                    </div>
                    <div className='border-2 w-full rounded-md justify-between items-center text-1xl px-2 py-1 border-b-amber-500 border-r-amber-500 flex flex-row'>
                        <div className=''>
                            {/* <p className=''>{tripData.startTime.slice(0,10)}</p>
                            <p className=''> {tripData.startTime.slice(11,19)} </p> */}
                        </div>
                        <div className='flex flex-row w-[30%] justify-center'>
                            <Image src={rArrow} className='w-[20%]'></Image>
                        </div>
                        <div className=''>
                        {/* <p className=''>{tripData.endTime.slice(0,10)}</p>
                            <p className=''> {tripData.endTime.slice(11,19)} </p> */}
                        </div>

                    </div>
                </div>
                <div>

                <div className="w-full flex flex-row flex-wrap mx-10 mt-10 gap-20">
                    {dispCars.map(item => (
                        <CarsCard key={item.reg_no} cardData={item}/>
                    ))}
                </div>

                </div>
            </div>
        </div>
    )
}

export default Carpage