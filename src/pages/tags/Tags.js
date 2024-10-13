import { Helmet } from 'react-helmet-async';
import Nav from '../../components/nav/Nav';

import config from 'config';

function Tags() {
    return (
        <>
            <Helmet>
                <title>Tags | {`${config.appName}`}</title>
                <meta name='description' content='Tags page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1>Tags Page</h1>
            </main>
        </>
    )
}

export default Tags;