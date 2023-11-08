import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Fragment >
            
                <Header></Header>
                {children}
                <Footer></Footer>
            
        </Fragment>
    );
};

export default Layout;
