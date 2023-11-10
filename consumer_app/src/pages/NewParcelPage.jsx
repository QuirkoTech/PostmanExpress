import Layout from '../components/layout/Layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components';

const ParcelAddNew = [
    {
        title: "Content",
        placeholder: "Package Name",
        measure: "Optional"
    },
    {
        title: "Recipient",
        placeholder: "Recipient's Email",
        measure: ""
    },
    {
        title: "Weight",
        placeholder: "Input a number",
        measure: "Kg"
    },
    {
        title: "Height",
        placeholder: "Input a number",
        measure: "m"
    },
    {
        title: "Width",
        placeholder: "Input a number",
        measure: "m"
    },
    {
        title: "Depth",
        placeholder: "Input a number",
        measure: "m"
    }
]

const NewParcelPage = () => {
    return (
        <div className=" relative min-h-screen flex flex-col">
            <Layout>
                <div className='max-w-[600px] ml-20'>
                    <div className='my-10'>
                        <h1 className=' text-4xl font-normal text-white'>New Parcel</h1>
                    </div>
                    <form className='flex flex-col'>
                        {ParcelAddNew.map((field, index) => (
                            <label key={index} htmlFor={`input-${index}`} className='grid grid-cols-3 items-center text-lg mb-6 ml-10'>
                                {field.title}:
                                <input className=' bg-dark-secondary rounded-lg -ml-20 border-2 border-solid px-4 border-slate-blue' type="text" placeholder={field.placeholder} id={`input-${index}`}/>
                                <span className='ml-4 text-xs'>{field.measure}</span>
                            </label>
                        ))}

                    <Button className='mr-[188px] mt-4 mb-10'></Button>
                    </form>
                    

                </div>
            </Layout>
        </div>
    );
};

export default NewParcelPage;
