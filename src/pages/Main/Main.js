import React, { useEffect } from 'react';

// component imports
import Nav from '../../components/nav/Nav';
import CategoryAside from '../../components/categoryAside/CategoryAside';
import Filter from './Filter';
import Social from './Social';

// css imports
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
                <h1 className='title'>siejwkaodj's blog</h1>
                <section className='main-body'>
                    <Filter />
                    <section className='main-middle'>
                        <CategoryAside />
                        <section className='main-content'>
                            <h2>Content</h2>
                            <p>Content goes here</p>
                        </section>
                        <Social />
                    </section>


                </section>

            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default Main;