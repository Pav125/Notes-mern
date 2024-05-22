import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {

    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    const [cookies, removeCookie] = useCookies([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token && window.location.pathname === "/") {
          navigate('/'); // Redirect to Home if cookie exists and on login page
        }
      }, [cookies, navigate]);    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async (e) => {
        e.preventDefault();

        let hasError = false; // Flag to check if there are any errors

        if (email.trim() === '') {
            setErrors((errors) => ({ ...errors, email: 'Enter email address' }));
            hasError = true;
        } else if (!emailPattern.test(email)) {
            setErrors((errors) => ({ ...errors, email: 'Enter valid email' }));
            hasError = true;
        } else {
            setErrors((errors) => ({ ...errors, email: '' }));
        }

        if (password.trim() === '') {
            setErrors((errors) => ({ ...errors, password: 'Enter Password' }));
            hasError = true;
        } else if (password.trim().length < 6) {
            setErrors((errors) => ({ ...errors, password: 'Password should be min 8 characters' }));
            hasError = true;
        } else {
            setErrors((errors) => ({ ...errors, password: '' }));
        }

        // Check if there are any errors before making the POST request
        if (!hasError) {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', { email, password }, { withCredentials: true });
                console.log(response.data);
                navigate('/');
            } catch (error) {
                console.error('Login failed:', error.response.data.message);
            }
        }
    };

    return (
        <>{isLoginPage && cookies.token && removeCookie("token")}
            <div className="container mt-5">
                <h1 className='mb-5 text-center'>Want to secure your notes ?</h1>

                <form onSubmit={handleLogin}>
                    <h2 className='text-center'>Login</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div>
                    <h3 className='mt-3'>New user? <Link className='ms-3' to='/signup'>Signup</Link></h3>
                </div>
            </div>
        </>
    );
};

export default Login;
