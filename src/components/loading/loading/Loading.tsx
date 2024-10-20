import HomeButton from 'pages/errors/HomeButton';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles['root']}>
            <header>
                <h1>Loading</h1>
                <section className={styles['content']}>
                    If loading status continues too long, please check internet connection.
                </section>
                <section className={styles['load']}>
                    <div className={styles['blink']}></div>
                    <div className={`${styles['blink']} ${styles['blink-1']}`}></div>
                </section>
            </header>
            <HomeButton />
            {/* <div className={styles['loader']}></div> */}
        </div>
    );
}

export default Loading;