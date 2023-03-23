import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD } from '../../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//properies components, will show on home page
const Properties = () => {

  //states 
  const [listings, setListings] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [homeStatus, setHomeStatus] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pImage, setPImage] = useState("");
  
  const dispatch = useDispatch();

  const sendProperty = (e) => {
   
   dispatch(ADD(e));
   toast.success("Property Saved Successfull")

  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      //with axios get data 
      try {
        //await respose
        const response = await axios.get(
          "https://api.apify.com/v2/datasets/6pFyYyGBdJgCkM7BM/items?&clean=true&format=json"
        );
        setListings(response.data);
      } catch (error) {
        //error
        setError(error.message);
      }

      setLoading(false);
    };
    //fetch data
    fetchData();
  }, []);

  //with use filter store listing data
  useEffect(() => {
    setFilteredData(listings);
  }, [listings]);

  {/* On different criteria search data  */}
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleHomeStatusChange = (event) => {
    setHomeStatus(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  {/* On different criteria search data  */}

  //with use of filter get data data on different condition
  const handleSearch = () => {
    let filteredListings = listings.filter((listing) => {
      if (city && listing.address.city !== city) return false;
      if (state && listing.address.state !== state) return false;
      if (minPrice && listing.price < minPrice) return false;
      if (maxPrice && listing.price > maxPrice) return false;
      if (homeStatus && listing.homeStatus !== homeStatus) return false;
      if (keyword && !listing.address.street.toLowerCase().includes(keyword.toLowerCase())) return false;
      return true;
    });
    setFilteredData(filteredListings);
  };

  return (
    <div className="container">
    <div>
      <div className="search-form">
        <select value={city} onChange={handleCityChange}>
          <option value="">Select City</option>
          {Array.from(new Set(listings.map(listing => listing.address.city))).map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select value={state} onChange={handleStateChange}>
          <option value="">Select State</option>
          {Array.from(new Set(listings.map(listing => listing.address.state))).map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />

        <select value={homeStatus} onChange={handleHomeStatusChange}>
          <option value="">Select Home Status</option>
          {Array.from(new Set(listings.map(listing => listing.homeStatus))).map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>


        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <>

          {filteredData && filteredData.length > 0 ? (
           <div className="row">
            <div className="d-flex flex-wrap" >
              {filteredData.map(listing => (
                <div className='card-inner m-3' key={listing._id} style={{width: '21rem'}}>
                  <NavLink to={`propery-details/${listing.zpid}`}><img className='img-fluid' src={listing.photos[0]} alt={listing.name} /></NavLink>
                  <div className="card-body">
                    <h5 className="card-title">{listing.address.city}, {listing.address.state} {listing.address.zip}</h5>
                    <p>Price: {listing.price}</p>
                    <p>bedrooms: {listing.bedrooms}</p>
                    <p>bathrooms: {listing.bathrooms}</p>
                    <p>Home Status: {listing.homeStatus}</p>
                    <NavLink to={`/propery-details/${listing.zpid}`} className="btn btn-primary">Details</NavLink>
                    <button className="btn btn-primary"  onClick={ () => sendProperty(listing)}>save Property</button>
                  </div>
                </div>
              ))}
            
            </div>
            </div>
          ) : (

            <p>No results found.</p>
          )}
        </>
      )}
    </div>
     </div>
  );
}
export default Properties;