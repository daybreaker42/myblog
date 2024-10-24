import { Link } from 'react-router-dom';
import styles from './AdminPage.module.css';
// components
import AdminAside from './aside/AdminAside';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <AdminAside />
            <Link to="/admin/writing">Admin Writing</Link>
        </div>
    );
};

export default AdminPage;