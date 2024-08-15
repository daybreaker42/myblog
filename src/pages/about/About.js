import { Helmet } from 'react-helmet-async';
import Nav from 'components/nav/Nav';
import config from 'config';

function About() {
    return (
        <div>
            <Helmet>
                <title>About page | {`${config.appName}`}</title>
                <meta name='description' content='About page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1>About Page</h1>
            </main>
        </div>
    )
}

export default About;