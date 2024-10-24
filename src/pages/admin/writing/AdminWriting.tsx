import { Helmet } from 'react-helmet-async';
import styles from './AdminWriting.module.css';
import AdminWritingAside from './aside/AdminWritingAside';
import Nav from 'components/nav/Nav';

const AdminWriting = () => {
    return (
        <div className={styles['root']}>
            <Helmet>
                <title>Admin Writing</title>
                <meta name="description" content="Admin Writing" />
            </Helmet>
            <Nav />
            <main>
                <AdminWritingAside />
                <section className={styles['body']}>
                    <header>
                        <h1>Admin Writing</h1>
                    </header>
                    <p>Admin Writing</p>
                </section>
            </main>
        </div>
    );
};

export default AdminWriting;