import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../components/layout/Layout';


const HomePage = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Layout>
                <div className='container '>
                    <div className='my-10'>Hello, place parcel there - Driver App</div>
                </div>
            </Layout>
                


        </div>
    );
};

export default HomePage;
