import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/index.css';
import registerImg from '../assest/tes/registrasi.jpg';

const Register = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [submitted, setSubmitted] = useState(false); // Track whether the form is submitted
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Set the form as submitted

        try {
            await axios.post('http://localhost:5000/auth/register', {
                name: name,
                role: role,
                email: email,
                password: password
            });
            // Reset the message and navigate on successful registration
            setMsg('');
            navigate("/");
        } catch (error) {
            console.error(error);
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">

                <div className="bg-[#03001C]  flex flex-col justify-center">
                    <form onSubmit={handleRegister} className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                        <h2 className="text-4xl dark:text-white font-bold text-center">REGISTER</h2>
                        
                       
                        
                        
                        {msg && <p className="text-red-500">{msg}</p>}
                        <div className="flex flex-col text-gray-400 py-2">
                            <label>Name</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                            />
                            {submitted && !name && <p className="text-red-500">Name is required</p>}
                        </div>
                        <div className="flex flex-col text-gray-400 py-2">
                            <label htmlFor="role">Role</label>
                            <select
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                id="role"
                            >
                                <option value="">Select your role</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Staff">Staff</option>
                            </select>
                            {submitted && !role && <p className="text-red-500">Role is required</p>}
                        </div>
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
                        <button className="w-full my-2 py-2 bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/40 text-white font-semibold rounded-lg">Register</button>
                        <button className="w-full my-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={navigateToLogin}>Back to Sign Up</button>
                    </form>
                </div>

                <div className="hidden sm:block">
                    <img className="w-full h-full object-cover" src={registerImg} alt=""></img>
                </div>
            </div>
        </section>
    );
}

export default Register;
