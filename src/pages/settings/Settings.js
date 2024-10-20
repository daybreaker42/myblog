import { Helmet } from 'react-helmet-async';
import Nav from '../../components/nav/Nav';

import config from 'config';

function Settings() {
    return (
        <>
            <Helmet>
                <title>Settings | {`${config.appName}`}</title>
                <meta name='description' content='Settings page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1>Settings Page</h1>
            </main>
        </>
    )
}

export default Settings;