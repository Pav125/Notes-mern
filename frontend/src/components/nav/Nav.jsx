import { useNavigate } from "react-router-dom";
import './Nav.css';

const Nav = () => {
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate();

    const handleLogOut = () => {
        try {
            localStorage.removeItem('authToken')
            navigate('/login');
            alert('Logged out succesfully')
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    return (
        <>
            {token && (
                <>
                    <nav className="navbar navbar-expand-lg navbar-custom">
                        <div className="container-fluid ms-3 mr-3">
                            <a className="navbar-brand" href="/">Notes</a>
                            <div className="" id="navbarNav">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <button className="nav-link active" aria-current="page" style={{ color:"white" }} onClick={handleLogOut} >Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
}

export default Nav;
