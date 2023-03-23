import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginImg from "../../assets/sign.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"
import Loader from '../../components/loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    //state for email, password and loader
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    //when user try to login
    const loginUser = (e) => {
        e.preventDefault();

        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLoading(false)
                toast.success("login successfull");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false)
            });

    }

    //when user try to login with google
    const signInWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                toast.success("login successfull");
                navigate("/");
            }).catch((error) => {
                // Handle Errors here.
                toast.error(error.message);
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="container my-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data" style={{ width: "100%" }}>

                        <div className="row">
                            <div className="col-12 ">
                                <h2>Login</h2>
                                <form onSubmit={loginUser}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" value={email} onChange={(item) => setEmail(item.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(item) => setPassword(item.target.value)} id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <small id="emailHelp" className="form-text my-3">Forgot Password? <NavLink to="/reset">Reset</NavLink> | Don't have account? <NavLink to="/register">Register</NavLink></small>
                                </form>
                                <NavLink className="btn btn-primary my-1" to="/" role="button" onClick={signInWithGoogle}>Login With Google</NavLink>
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

export default Login
