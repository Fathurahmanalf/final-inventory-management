import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style/index.css';
import loginImg from '../assest/tes/login.jpg';
import { MdError } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email: email,
                password: password
            });

            const token = response.data.token;
            console.log('Token:', token);

            localStorage.setItem('token', token);
            setMsg('');
            navigate("/dashboard");

            // Display success message using SweetAlert
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error(error);
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
                <div className="hidden sm:block">
                    <img className="w-full h-full object-cover" src={loginImg} alt=""></img>
                </div>

                <div className="bg-[#03001C] flex flex-col justify-center">
                    <form onSubmit={handleLogin} className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                        <h2 className="text-4xl dark:text-white font-bold text-center">SIGN IN</h2>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Email</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {submitted && !email && <p className="text-red-500">Email is required</p>}
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Password</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {submitted && !password && <p className="text-red-500">Password is required</p>}
                        </div>
                        {msg && <p role="alert" className="text-black text-sm alert alert-warning  py-5 my-5"> <MdError /> {msg}</p>}
                        <button className="w-full my-2 py-2 bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/40 text-white font-semibold rounded-lg">Sign In</button>
                        <button className="w-full my-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={navigateToRegister}>Go to Register</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
