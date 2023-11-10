import Layout from '../components/layout/Layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components';
import {  Info } from 'lucide-react';

const colorMapping = {
    'In Route': '#00FF47',
    'Awaiting drop-off': '#000AFF',
    'Delivered': '#FF9900',
    'Prepared for Delivery': '#FFFFFF',
    'At warehouse': '#EBFF00',
    'Ready for pick up': '#9A9A9A',
};


const ActiveParcel = [
    {
        id: "12345678",
        lastUpdate: "14.04",
        status: "In Route"
    },
    {
        id: "12345679",
        lastUpdate: "14.04",
        status: "Awaiting drop-off"
    },
    {
        id: "12345677",
        lastUpdate: "14.04",
        status: "Delivered"
    },
    {
        id: "12345676",
        lastUpdate: "14.04",
        status: "Prepared for Delivery"
    },
    {
        id: "12345675",
        lastUpdate: "14.04",
        status: "At warehouse"
    },
    {
        id: "12345678",
        lastUpdate: "14.04",
        status: "Ready for pick up"
    },
]

const NewParcelPage = () => {
    return (
        <div className=" relative min-h-screen flex flex-col">
                <div className='max-w-[600px] ml-20 my-10'>                    
                        <h1 className=' text-4xl font-normal text-white'>Active Parcel</h1>

                </div>
                <div className='max-container flex flex-col '>
                    <div className='grid grid-cols-2 gap-x-20'>
                        {ActiveParcel.map(parcel => (
                            <div key={parcel.id} className="w-[440px] h-[116px] bg-dark-secondary py-5 px-5 rounded-2xl mb-10 shadow-lg shadow-black/40 cursor-pointer border-2 border-solid border-transparent hover:border-slate-blue">
                                <div className='flex flex-row gap-x-10 text-lg justify-between'>
                                    <div className='flex flex-col items-start'> 
                                        <span className='mb-5'>ID: {parcel.id}</span>
                                        <span className='flex flex-row items-center'>
                                        <div className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: colorMapping[parcel.status] }}></div>
                                            <span>{parcel.status}</span>
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <span className='mb-5'>Last Update: {parcel.lastUpdate}</span>
                                        <span className='flex flex-row items-center'>
                                            <span className='mr-1'>More Info
                                            </span> 
                                            <Info size={12}/>
                                            
                                            
                                        </span>
                                    </div>
                                </div>
                            
                            
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
    )
};

                    

export default NewParcelPage;
