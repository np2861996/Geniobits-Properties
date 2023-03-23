import { BrowserRouter, Route, Routes } from "react-router-dom";
//components
import {Header,Footer} from "./components";
//pages
import {Home,SavedProperties,Login,Register,Reset,Loader} from "./pages";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import PropertiesDetails from "./pages/properties/PropertiesDetails";
import ContactHistory from "./pages/contacthistory/ContactHistory";

function App() {
  return (
    <>
     <ToastContainer />
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path ="/saved-properties" element={<SavedProperties />} />
            <Route path ="/login" element={<Login />} />
            <Route path ="/register" element={<Register />} />
            <Route path ="/reset" element={<Reset />} />
            <Route path ="/loader" element={<Loader />} />
            <Route path ="/contact-history" element={<ContactHistory />} />
            <Route path ="/propery-details/:zpid" element={<PropertiesDetails />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
