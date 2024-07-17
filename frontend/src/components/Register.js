import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [membershipType, setMembershipType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register(email, username, password, membershipType);
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="text-center">Register</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Membership Type</label>
                        <select
                            className="form-control"
                            value={membershipType}
                            onChange={(e) => setMembershipType(e.target.value)}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                </form>
                <div className="mt-3 text-center">
                    <p>Or register with:</p>
                    <a href="http://localhost:3000/auth/google" class="btn btn-danger mt-2">Google</a>
                    <a href="http://localhost:3000/auth/facebook" class="btn btn-primary mt-2">Facebook</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
