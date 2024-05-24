import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import image from './log.png'; // Import your image file

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

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
            setErrors((errors) => ({ ...errors, password: 'Password should be min 6 characters' }));
            hasError = true;
        } else {
            setErrors((errors) => ({ ...errors, password: '' }));
        }

        // Check if there are any errors before making the POST request
        if (!hasError) {
            try {
                const response = await axios.post('https://notes-api-1i7v.onrender.com/api/auth/login',
                // https://notes-api-1i7v.onrender.com/api/auth/login
                    { email, password },
                );
                const { token } = response.data
                localStorage.setItem('authToken', token)
                console.log(token)
                console.log(response.data.message);
                alert(response.data.message)
                navigate('/');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    console.error('Login failed:', error.response.data.message);
                    alert('Login failed');
                }
            }
        }
    };

    return (
        <>
            {/* {isLoginPage && cookies.token && removeCookie("token")} */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={image} alt="Login" className="img-fluid mb-4" />
                    </div>
                    <div className="col-md-6">
                        <h1 className='mb-5 text-center'>Want to secure your notes?</h1>
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
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="mt-3 text-center">
                            <h5>New user? <Link to='/signup'>Signup</Link></h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
