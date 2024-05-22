import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleSignup = async (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            setErrors((errors) => ({ ...errors, email: 'Enter email address' }))
            // use call back function to make it async
        }
        else if (!emailPattern.test(email)) {
            setErrors((errors) => ({ ...errors, email: 'Enter valid email' }))
        }
        else {
            setErrors((errors) => ({ ...errors, email: '' }))
        }

        if (password.trim() === '') {
            setErrors((errors) => ({ ...errors, password: 'Enter Password' }))
        }
        else if (password.trim().length < 6) {
            setErrors((errors) => ({ ...errors, password: 'Password should be min 8 characters' }))
        }
        else {
            setErrors((errors) => ({ ...errors, password: '' }))
        }
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup',
                { email, username, password },
                { withCredentials: true }
            );
            console.log(response.data);
            navigate('/Home');
        } catch (error) {
            console.error('Signup failed:', error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className='mb-5 text-center'>Want to secure your notes ?</h1>
            <h2 className='text-center'>Signup</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {errors.email && <span className='text-danger' >{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errors.password && <span className='text-danger' >{errors.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <div>
                <h3 className='mt-3'>Already a user? <Link className='ms-3' to='/'>Login</Link></h3>
            </div>
        </div>
    );
};

export default Signup;
