import React, { useEffect } from 'react';

import Nav from '../../components/nav/Nav';
import './Main.css';

function Main() {
    useEffect(() => {
        console.log(`main page loaded`);
    }, []);

    return (
        <div>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1>Main page</h1>
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default Main;