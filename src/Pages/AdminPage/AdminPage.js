import { Link, Outlet } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
    return (
        <div className="admin-page">
            <div className="admin-links">
                <Link className="admin-link" to="/admin">Country Statistics</Link>
                <Link className="admin-link" to="/admin/create">Create Country</Link>
                <Link className="admin-link" to="/admin/edit">Edit Country</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default AdminPage;
