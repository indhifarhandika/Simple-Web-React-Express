import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            navigate('/membership');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container">

            <div className="login-container">
                <div className="login-card">
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Or login with:</p>
                        <a href="http://localhost:3000/auth/google" class="btn btn-danger mt-2">Google</a>
                        <a href="http://localhost:3000/auth/facebook" class="btn btn-primary mt-2">Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
