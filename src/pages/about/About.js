import { Helmet } from 'react-helmet-async';
import Nav from 'components/nav/Nav';
import config from 'config';

import styles from './About.module.css';

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
                <h1 className={styles.title}>About Page</h1>
                <section className={styles['profile-card']}>profile card</section>
                <section className={styles['profile-info']}>profile info</section>
            </main>
        </div>
    )
}

export default About;