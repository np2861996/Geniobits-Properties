import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginImg from "../../assets/sign.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"
import Loader from '../../components/loader/Loader';

//compoent for register
const Register = () => {

    //states for email, password, confirm password, loader
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    //for register user
    const registerUser = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (password !== confirmPassword) {
            setIsLoading(false);
            toast.error("Incorrect Passwords")
        }
        else
        {
            createUserWithEmailAndPassword(auth , email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setIsLoading(false)
                    toast.success("Registration Successfull")
                    navigate("/login")
                })
                .catch((error) => {
                    toast.error(error.message);
                    setIsLoading(false)
                });
        }
    }

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <div className="container my-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data" style={{ width: "100%" }}>

                        <div className="row">
                            <div className="col-12 ">
                                <h2>Registration</h2>
                                <form onSubmit={registerUser}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" value={email} onChange={(item) => setEmail(item.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(item) => setPassword(item.target.value)} id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                                        <input type="confirmpassword" className="form-control" value={confirmPassword} onChange={(item) => setConfirmPassword(item.target.value)} id="exampleInputConfirmPassword1" placeholder="Confirm Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <small id="emailHelp" className="form-text"> Already have account? <NavLink to="/login">Login</NavLink></small>
                                </form>

                            </div>
                        </div>

                    </div>
                    <div className="right_data mt-3" style={{ width: "100%" }}>

                        <div className='sign_img mt-3 pl-5'>
                            <img src={LoginImg} style={{ maxWidth: 480 }} alt="sign" />

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register
