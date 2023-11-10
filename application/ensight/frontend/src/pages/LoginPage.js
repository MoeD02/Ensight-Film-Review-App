import React, { useState, useEffect } from "react";
import "../assets/styles/components/Login.css";

const LoginPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if(token) {
            window.location.href = '/'
        }
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();
        const loginEndpoint = 'http://127.0.0.1:8000/accounts/login';
        const userData = {
            username,
            password,
        };

        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData),
            });
            if(response.status === 200) {
                const data = await response.json();
                localStorage.setItem('Authorization', data.token);
                setCurrentUser(data.user);
                window.location.href='/';
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const RegisterEndpoint = 'http://127.0.0.1:8000/accounts/register';
        const userData = {
            username,
            email,
            password,
        };

        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const response = await fetch(RegisterEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData),
            });
            if(response.status === 200) {
                const data = await response.json();
                localStorage.setItem('Authorization', data.token);
                setCurrentUser(data.user);
                window.location.href='/';
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="wrapper">
        <div className="card-switch">
            <label className="switch">
            <input
                className="toggle"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prevState) => !prevState)}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
                <div className="flip-card__front">
                <div className="title">Log in</div>
                <form action="" className="flip-card__form">
                    <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="flip-card__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="flip-card__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="flip-card__btn" onClick={handleLogin}>Let's go!</button>
                    <button type="button" className="flip-card__btn-cancel">
                    Cancel
                    </button>
                </form>
                </div>
                <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form action="" className="flip-card__form">
                    <input
                    type="text"
                    placeholder="Username"
                    className="flip-card__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="flip-card__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="flip-card__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="flip-card__btn" onClick={handleRegister}>Confirm!</button>
                    <button type="button" className="flip-card__btn-cancel">
                    Cancel
                    </button>
                </form>
                </div>
            </div>
            </label>
        </div>
        </div>
    );
};

export default LoginPage;
