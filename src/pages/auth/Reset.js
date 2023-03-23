import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import LoginImg from "../../assets/sign.svg";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config"
import { ToastContainer, toast } from 'react-toastify';

//reset component
const Reset = () => {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    //when user try to reset password. 
    const resetPassword = (e) => {

        e.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent!"); // Password reset email sent!
                // ..
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <>
            <div className="container my-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data" style={{ width: "100%" }}>

                        <div className="row">
                            <div className="col-12 ">
                                <h2>Reset Password</h2>
                                <form onSubmit={resetPassword}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" value={email} onChange={(item) => setEmail(item.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                    <button type="submit" className="btn btn-primary">Reset Password</button>
                                </form>
                                <small id="emailHelp" className="form-text"><NavLink to="/login">Login </NavLink> | <NavLink to="/register"> Register</NavLink></small>
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

export default Reset
