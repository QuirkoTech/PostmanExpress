import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
    // This is a custom hook that returns the height of the header.
    //  It is used to set the main section to always screen height - header height.
    // This leads to footer being hidden at the bottom of the page
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        const header = document.querySelector("header");
        if (header) {
            const height = header.offsetHeight;
            setHeaderHeight(height);
        }
    }, []);

    return (
        <Fragment>
            <Header />
            <section
                className="padding max-container"
                style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
            >
                {children}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                />
            </section>
            <Footer />
        </Fragment>
    );
};

export default Layout;
