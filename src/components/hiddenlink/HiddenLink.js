import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

//Compoent for show hide login
const ShowOnLogin = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn){
        return children
    }

  return null
}

export default ShowOnLogin

//Compoent for show hide loginout
export const ShowOnLogout = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn){
        return children
    }

  return null
}
