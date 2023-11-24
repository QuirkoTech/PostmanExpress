import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header></Header>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
            />
            <Footer></Footer>
        </Fragment>
    );
};

export default Layout;
