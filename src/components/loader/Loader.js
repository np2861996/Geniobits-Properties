import React from 'react'
import LoaderImg from "../../assets/loader.gif"
import ReactDOM from "react-dom" 

//loader Components
const Loader = () => {
  return ReactDOM.createPortal (
    <div>
        <img src={LoaderImg} />
    </div>,
    document.getElementById("loader")
  )
}

export default Loader
