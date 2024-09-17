import React from 'react';
import styles from './Footer.module.css';
import config from 'config';

const Footer = () => {
    return (
        <footer>
            <header>
                <p className={styles.title}>성준의 Blog</p>
                <span>v{config.version}</span>
            </header>
            <section className={styles["footer-body"]}>
                <div className={styles["right"]}>
                    <p>© 2024. Copyright to SeoungJun Han. All rights reserved.</p>
                    <p>contact - <a href='mailto:june12300039@gmail.com'>june12300039@gmail.com</a></p>
                </div>
                <div className={styles["left"]}>
                    <a href='#'>
                        Open source License
                    </a>
                    <a href='#'>
                        사이트맵
                    </a>
                    <a href='#'>
                        오류 제보 / 건의사항
                    </a>
                </div>
            </section>
        </footer>
    );
}

export default Footer;