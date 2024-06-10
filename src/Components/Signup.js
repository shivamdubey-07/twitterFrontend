import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState({
        Signup: false,
        Login: false,
        otp: false
    });
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('black');
    const [formType, setFormType] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = formType === 'Signup' ? 'register' : (formType === 'otp' ? 'otp' : 'login');
        const bodyData = formType === 'Signup' ? { name, email, username, password } : (formType === 'otp' ? { otp } : { username, password });
        try {
            const response = await fetch(`https://twitterbackend-7nga.onrender.com/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
                credentials: 'include'
            });

            const data = await response.json();
         
            if (data.code === "otp") {
                alert("OTP verified successfully, Kindly login");
                setIsOpen({
                    Signup: false,
                    Login: true,
                    otp: false
                });
                setFormType('login');
                navigate("/");
            } else if (data.code === "login") {
                navigate("/dashboard");
            } else if (data.code === "invalid") {
                alert("Invalid Token");
                setIsOpen({
                    Signup: false,
                    Login: false,
                    otp: false
                });
                setLoading(false); // Stop loading
                return; // Exit the function here
            }
    
            if (formType === 'Signup') {
                setIsOpen({
                    Signup: false,
                    Login: false,
                    otp: true
                });
                setFormType('otp');
            } else if (formType === 'otp') {
                setIsOpen({
                    Signup: false,
                    Login: true,
                    otp: false
                });
                setFormType('login');
            }
    
            setName('');
            setUsername('');
            setOtp('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setLoading(false);
            alert("An error occured");
            console.error('Error:', error);
        }
    };

    const handleChange = (event) => {
        const { name: fieldName, value } = event.target;
        if (fieldName === 'name') setName(value);
        if (fieldName === 'email') setEmail(value);
        if (fieldName === 'username') setUsername(value);
        if (fieldName === 'password') setPassword(value);
        if (fieldName === 'otp') setOtp(value);
    };

    const toggleForm = (formType) => {
        setIsOpen(prevState => ({
            Signup: formType === 'Signup' ? !prevState.Signup : false,
            Login: formType === 'Login' ? !prevState.Login : false,
            otp: formType === 'otp' ? !prevState.otp : false,
        }));
        setFormType(formType);
        setBackgroundColor(prevState => (prevState === 'black' ? '#2f2f2f' : 'black'));
    };

    return (
        <div style={{ backgroundColor }} className="flex relative bg-black h-screen">
      
            <div className="w-1/2">

           
          
                <div className="flex justify-center items-center h-screen">
                    <img src="x.png" alt="logo img" />
                </div>  
            </div>
            <div className="w-1/2 text-white flex justify-center items-center relative">
                <div className="absolute top-16 left-10">
                    <h1 className="text-7xl mb-10">Happening Now</h1>
                    <h3 className="text-5xl">Join Today</h3>
                </div>
                <div className="absolute w-96 top-80 left-10 flex flex-col">
                    <button name="Signup" onClick={() => toggleForm('Signup')}>Create Account</button>
                    <p className="custom-text mt-2 ml-2">
                        By signing up, you agree to the <span className="span-blue">Terms of Service</span> and <span className="span-blue">Privacy Policy</span>, including <span className="span-blue">Cookie Use.</span>
                    </p>
                    <h1 className="mt-10 mb-3 ml-1 w-80 text-1xl">Already have an account?</h1>
                    <button name="Login" onClick={() => toggleForm('Login')}>Sign in</button>
                </div>
            </div>
            {isOpen.Signup && (
                <div className="form-div w-1/2 h-5/6 flex flex-col justify-center items-center bg-black overflow-y-auto">
                    <button className="cut-btn1" onClick={() => toggleForm('Signup')}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Create your account</h1>
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        <input
                            className="p-2 rounded-md mt-4"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            className="p-2 rounded-md mt-4"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}

            {isOpen.Login && (
                <div className="form-div w-1/2 h-4/5 flex flex-col justify-center items-center bg-black overflow-y-auto">
                    <button className="cut-btn" onClick={() => toggleForm('Login')}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Login</h1>
                        <input
                            className="p-2 rounded-md mt-4"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        <input
                            className="p-2 rounded-md mt-4"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}

            {isOpen.otp && (
                <div className="form-div w-1/2 h-4/5 flex flex-col justify-center items-center bg-black overflow-y-auto">
                    <button className="cut-btn" onClick={() => toggleForm('otp')}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Enter OTP</h1>
                        <input
                            className="p-2 rounded-md mt-4"
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                        />
                        <button type="submit">Submit OTP</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;