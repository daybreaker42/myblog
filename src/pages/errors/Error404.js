import React from "react";


import Nav from "components/nav/Nav";

import "./errors.css";
import HomeButton from "./HomeButton";

const Error404 = () => {


    return (
        <div>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <section className="body">
                    <span className="iconWrapper">
                        <img src={require("assets/icons/warning.svg").default} alt='warning' width="100%" height="100%" />
                    </span>
                    <h1 className="title">404 Not Found</h1>
                    <p className="content">The requested resource could not be found on this server. Please check the URL and try again, or navigate to our homepage.</p>
                    <HomeButton />
                </section>
            </main>
        </div>
    );
};

export default Error404;