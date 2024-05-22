import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Nav = () => {

    const [cookies, removeCookie] = useCookies([])
    const navigate = useNavigate()
    useEffect(
        () => {
            if (!cookies.token) {
                navigate("/")
            }
        }, [cookies, navigate]
    )
    const handleLogOut = async () => {
        console.time('cookieRemoval'); // Start timer
        try {
            await removeCookie('token');
            console.log(cookies.token);
            navigate('/login');
        } catch (error) {
            console.error('Error removing cookie:', error);
            // Handle potential errors during cookie removal
        } finally {
            console.timeEnd('cookieRemoval'); // Stop timer
        }
    };

    return (
        <>
            {cookies && (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid ms-3 mr-3">
                            <a className="navbar-brand" href="/">Notes</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <button className="nav-link active" aria-current="page" onClick={handleLogOut} >Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
            )
            }
        </>
    )
}

export default Nav