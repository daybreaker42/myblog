import { Helmet } from 'react-helmet-async';
import Nav from 'components/nav/Nav';
import config from 'config';

import styles from './About.module.css';
import ImageLoader from 'components/loading/ImageLoader';

const aboutData = {
    profileImage: 'https://via.placeholder.com/150',
    info: {
        name: 'John Doe',
        age: 20,
    },
    techStack: {
        frontend: ['React', 'Vue', 'Angular'],
        backend: ['NodeJS', 'Express', 'Django'],
        database: ['MySQL', 'MongoDB', 'PostgreSQL'],
    },
    contact: {
        email: 'example@example.com',
        phone: '010-1234-5678',
    },
}

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
                <div className={styles['about-body']}>
                    <section className={styles['profile-card']}>
                        <div className={styles.profile}>
                            <ImageLoader src={aboutData.profileImage} alt={'profile'} />
                        </div>
                        <ul className={styles['profile-info']}>
                            <span className={styles['profile-section-title']}>정보</span>
                            <li>
                                <span>이름</span>
                                <span>{aboutData.info.name}</span>
                            </li>
                            <li>
                                <span>나이</span>
                                <span>{aboutData.info.age}</span>
                            </li>
                        </ul>
                        <ul className={styles['profile-tech']}>
                            <span className={styles['profile-section-title']}>기술 스택</span>
                            <li>
                                <span>Frontend</span>
                                <ul>
                                    {aboutData.techStack.frontend.map((tech, index) => (
                                        <li className={styles['right']} key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <span>Backend</span>
                                <ul>
                                    {aboutData.techStack.backend.map((tech, index) => (
                                        <li className={styles['right']} key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <span>Database</span>
                                <ul>
                                    {aboutData.techStack.database.map((tech, index) => (
                                        <li className={styles['right']} key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </section>


                    <section className={styles['profile-info']}>profile info</section>
                </div>
            </main>
        </div>
    )
}

export default About;