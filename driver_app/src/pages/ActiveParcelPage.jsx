import Layout from '../components/layout/Layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/button';
import {  Info } from 'lucide-react';

const ActiveParcel = [
    {
        id: "12345678",
        lastUpdate: "14.04",
        toAddress: "Helsinki"
    },
    {
        id: "12345679",
        lastUpdate: "14.04",
        toAddress: "Tampere"
    },
    {
        id: "12345677",
        lastUpdate: "14.04",
        toAddress: "Oulu"
    },
    {
        id: "12345676",
        lastUpdate: "14.04",
        toAddress: "Espoo"
    },
    {
        id: "12345675",
        lastUpdate: "14.04",
        toAddress: "Turku"
    },
    {
        id: "12345678",
        lastUpdate: "14.04",
        toAddress: "Rovaniemi"
    },
]

const NewParcelPage = () => {
    return (
        <div className=" relative min-h-screen flex flex-col">
                <div className='max-w-[600px] ml-20 my-10'>                    
                        <h1 className=' text-4xl font-normal text-white'>Accepted Parcels</h1>

                </div>
                <div className='max-container flex flex-col '>
                    <div className='grid grid-cols-2 gap-x-20'>
                        {ActiveParcel.map(parcel => (
                            <div key={parcel.id} className="w-[440px] h-[116px] bg-dark-secondary py-5 px-5 rounded-2xl mb-10 shadow-lg shadow-black/40 cursor-pointer border-2 border-solid border-transparent hover:border-slate-blue">
                                <div className='flex flex-row gap-x-10 text-lg justify-between'>
                                    <div className='flex flex-col items-start'>
                                        <span className='mb-5'>ID: {parcel.id}</span>
                                        <span>To: {parcel.toAddress}</span>
                                        
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
