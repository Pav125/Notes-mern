import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Nav.css';

const Nav = () => {
    const [, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleLogOut = async () => {
        console.time('cookieRemoval'); // Start timer
        try {
            await removeCookie('token', { path: '/', domain: 'mymemo.vercel.app' });
            cookies.remove('token', { path: "/", domain: "mymemo.vercel.app" });
            console.log(cookies.token);
            console.log(cookies);
            navigate('/login');
            alert('Logged out succesfully')
        } catch (error) {
            console.error('Error removing cookie:', error);
        } finally {
            console.timeEnd('cookieRemoval'); // Stop timer
        }
    };

    return (
        <>
            {cookies && (
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
