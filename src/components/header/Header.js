import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenlink/HiddenLink';

const Header = () => {

    //get saved property data with redux
    const getPropdata = useSelector((state) => state.propertiesreducer.savedproperties);

    //open, anchorRef, loader, display name in header
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const dispatch = useDispatch()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    //code for key handle
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const navigate = useNavigate();

    // when user logout
    const logoutUser = () => {


        signOut(auth).then(() => {
            setIsLoading(false)
            toast.success("logout successfull");
            navigate("/login");
        }).catch((error) => {
            toast.error(error.message);
            setIsLoading(false)
        });
    };

    //Check if User Signin or not
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                if (user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"))
                    setDisplayName(u1)
                }
                else {
                    setDisplayName(user.displayName)
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ?? displayName,
                    userId: user.uid
                }))
            } else {
                // ...
                dispatch(REMOVE_ACTIVE_USER())
                setDisplayName("")
            }
        });

    }, [dispatch, displayName])



    //return data
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light text-white">
                <NavLink className="navbar-brand" to="/">Geniobits Properties</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link text-white" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>

                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"> <NavLink className="nav-link text-white" to="#">{displayName}</NavLink></li>
                            <ShowOnLogout>
                                <li className="nav-item"> <NavLink className="nav-link text-white" to="/login">Login</NavLink></li>

                                <li className="nav-item"><NavLink className="nav-link text-white" to="/register">Registration</NavLink></li>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <li className="nav-item"><NavLink className="nav-link text-white" to="/" onClick={logoutUser}>Logout</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-white" to="/contact-history" >Contact History</NavLink></li>
                            </ShowOnLogin>
                            <li className="nav-item"> <button type="button"  className="btn btn-primary text-light">
                            <NavLink className="nav-link text-light " to="/saved-properties" >Saved Properties <span className="badge badge-light">{getPropdata.length}</span></NavLink>
                               
                            </button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header

