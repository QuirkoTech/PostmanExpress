import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

// This is a custom hook that returns the height of the header.
//  It is used to set the main section to always screen height - header height.
// This leads to footer being hidden at the bottom of the page

const Layout = ({ children }) => {
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
            <Header></Header>

            <section
                className="padding"
                style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
            >
                <div className="max-container">{children}</div>
            </section>
            <Footer></Footer>
        </Fragment>
    );
};

export default Layout;
