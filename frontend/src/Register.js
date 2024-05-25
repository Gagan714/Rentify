import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { Spin, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [authMode, setAuthMode] = useState("signin");
    const { setUser } = useContext(UserContext);
    const [userId, setUserId] = useState("");
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: '',
        phoneNumber: ''
    });
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    useEffect(() => {
        if (userId) {
            setTimeout(() => {
                navigate(`/home`);
            }, 1000);
        }
    }, [userId, navigate]);

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if (name === 'phoneNumber') {
            if (/^\d{0,10}$/.test(value)) {
                setPhoneNumberError("");
            } else {
                setPhoneNumberError("Phone number must be a number.");
            }
        }
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if (authMode === "signin") {
            axios.post('https://full-stack-virid.vercel.app/signin', formValues)
                .then(response => {
                    setUserId(response.data?.user?.id);
                    setLoading(false);
                    toast.success("Login Success!")
                    setUser(response.data);
                })
                .catch(error => {
                    setLoading(false);
                    toast.error("Invalid Credentials")
                });
        } else {
            if (formValues.password !== formValues.confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
                setLoading(false)
                return;
            }
            if (formValues.phoneNumber.length !== 10) {
                setPhoneNumberError("Phone number must be exactly 10 digits don't add country code");
                setLoading(false)

                return;
            }
            axios.post('https://full-stack-virid.vercel.app/signup', formValues)
                .then(response => {
                    setAuthMode("signin");
                    setLoading(false);
                    navigate('/register');
                    toast.success("Registered Successfully")
                })
                .catch(error => {
                    toast.success("Error: Try Again")
                    setLoading(false);

                });
        }
    };

    if (authMode === "signin") {
        return (
            <div className="row">
                <div className="Auth-form-container col-md-6">
                    <div className="row ">
                        <div className='heading'>
                            <h2>Rentify</h2>
                            <p>Renting made simple!</p>
                        </div>
                        <form className="Auth-form mb-5" onSubmit={handleSubmit}>
                            <div className="Auth-form-content mb-5 ">
                                <h3 className="Auth-form-title">Login</h3>
                                <div className="text-center">
                                    Not registered yet?{" "}
                                    <span onClick={changeAuthMode} style={{ color: "rgba(53, 107, 255, 0.925)" }}>
                                        Sign Up
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>
                                        Password
                                        {isPasswordVisible ?
                                            <EyeInvisibleOutlined onClick={togglePasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} /> :
                                            <EyeOutlined onClick={togglePasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                        }
                                    </label>
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        name="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                <Button
                                className='btn btn-primary' htmlType='submit'
          type="primary"
          loading={loading}
        >
          Login
        </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bg col-md-6"></div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="Auth-form-container col-md-6">
                <div className="row">
                    <div className='heading'>
                        <h2>Rentify</h2>
                        <p>Renting made simple!</p>
                    </div>
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign Up</h3>
                            <div className="text-center">
                                Already registered?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                                    Login
                                </span>
                            </div>
                            <div className="form-group mt-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control mt-1"
                                            placeholder=""
                                            value={formValues.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control mt-1"
                                            placeholder=""
                                            value={formValues.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder=""
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='row'>
                                <div className="form-group mt-3 col-md-6">
                                    <label>
                                        Password
                                        {isPasswordVisible ?
                                            <EyeInvisibleOutlined onClick={togglePasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} /> :
                                            <EyeOutlined onClick={togglePasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                        }
                                    </label>
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        name="password"
                                        className="form-control mt-1"
                                        placeholder="Password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3 col-md-6">
                                    <label>
                                        Confirm Password
                                        {isConfirmPasswordVisible ?
                                            <EyeInvisibleOutlined onClick={toggleConfirmPasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} /> :
                                            <EyeOutlined onClick={toggleConfirmPasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                        }
                                    </label>
                                    <input
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        name="confirmPassword"
                                        className="form-control mt-1"
                                        placeholder="Re-type Password"
                                        value={formValues.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {confirmPasswordError && <p className="error" style={{color: 'red'}}>{confirmPasswordError}</p>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group mt-3 col-md-6">
                                    <label>Select</label>
                                    <select
                                        className="form-control mt-1"
                                        name="type"
                                        value={formValues.type ? formValues.type : formValues.type='1'}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="1">Buyer</option>
                                        <option value="2">Seller</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3 col-md-6">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control mt-1"
                                        placeholder="Phone Number"
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {phoneNumberError && <p className="error"  style={{color: 'red'}}>{phoneNumberError}</p>}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3 mb-5">
                            <Button
                                className='btn btn-primary' htmlType='submit'
          type="primary"
          loading={loading}
         
        >
          Register
        </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg col-md-6"></div>
        </div>
    );
};

export default Register;
