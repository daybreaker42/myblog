import { Helmet } from 'react-helmet-async';
import Nav from '../../components/nav/Nav';

import config from 'config';
import styles from './Category.module.css';

function Category() {
    return (
        <>
            <Helmet>
                <title>Category | {`${config.appName}`}</title>
                <meta name='description' content='Category page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1>Category Page</h1>
            </main>
        </>
    )
}

export default Category;