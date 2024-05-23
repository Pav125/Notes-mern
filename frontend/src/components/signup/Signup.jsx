import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import image from './sig.png'; // Import your image file

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignup = async (e) => {
        e.preventDefault();
        let formValid = true;

        if (email.trim() === '') {
            setErrors((errors) => ({ ...errors, email: 'Enter email address' }));
            formValid = false;
        } else if (!emailPattern.test(email)) {
            setErrors((errors) => ({ ...errors, email: 'Enter a valid email' }));
            formValid = false;
        } else {
            setErrors((errors) => ({ ...errors, email: '' }));
        }

        if (password.trim() === '') {
            setErrors((errors) => ({ ...errors, password: 'Enter password' }));
            formValid = false;
        } else if (password.trim().length < 6) {
            setErrors((errors) => ({ ...errors, password: 'Password should be min 6 characters' }));
            formValid = false;
        } else {
            setErrors((errors) => ({ ...errors, password: '' }));
        }

        if (!formValid) return;

        try {
            const response = await axios.post('https://notes-api-1i7v.onrender.com/api/auth/signup',
                { email, username, password },
                { withCredentials: true }
            );
            console.log(response.data);
            alert(response.data.message) 
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error('Signup failed:', error);
                alert('Signup failed');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6 col-md-8 order-2 order-md-1">
                    <h1 className='mb-4 text-center'>Want to secure your notes?</h1>
                    <h2 className='text-center'>Signup</h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Signup</button>
                    </form>
                    <div className="mt-3 text-center">
                        <h5>Already a user? <Link to='/login'>Login</Link></h5>
                    </div>
                </div>
                <div className="col-lg-6 col-md-4 order-1 order-md-2 d-flex align-items-center">
                    <img src={image} alt="Signup" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
