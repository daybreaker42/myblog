import React from "react";
import Nav from "components/nav/Nav";
import "./errors.css";
import HomeButton from "./HomeButton";

const Error400 = () => {
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
                    <h1 className="title">400 Bad Request</h1>
                    <p className="content">We're unable to process your request due to invalid syntax.
                        Please verify your input and try again.</p>
                    <HomeButton />
                </section>
            </main>
        </div>
    );
};

export default Error400;