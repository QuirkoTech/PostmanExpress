import Layout from '../components/layout/Layout';
import React from 'react';
import { NavLink } from 'react-router-dom';


const HomePage = () => {
    return (
        <div className=" relative min-h-screen flex flex-col">
            <Layout>
                <div className='max-container'>
                    <div className='my-10'>Hello, place parcel there - Consumer App</div>
                </div>
            </Layout>
                


        </div>
    );
};

export default HomePage;
