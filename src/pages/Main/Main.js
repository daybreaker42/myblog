import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

function Main() {
    return (
        <div>
            <header className="App-header">
                <Nav />
            </header>
            <h1>Main page</h1>
        </div>
    );
}

export default Main;