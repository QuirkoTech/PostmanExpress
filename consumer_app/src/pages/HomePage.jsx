import Layout from '../components/layout/Layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {ActiveParcelPage} from "../pages"

const HomePage = () => {
    return (
        <div className=" relative min-h-screen flex flex-col">
            <Layout>
                {/* Change page base on account status */}
                    <ActiveParcelPage></ActiveParcelPage>
                
            </Layout>
                


        </div>
    );
};

export default HomePage;
