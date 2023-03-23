import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const SavedProperties = () => {

  //with the use of redux get data of saved properties
  const getPropdata = useSelector((state) => state.propertiesreducer.savedproperties);

  return (
    <div>
      <div className="container min-vw-100 min-vh-100">
        <h1>Saved Propeties</h1>
        {
          getPropdata.length ?
            <div className="">
              <div className="row" >
                {getPropdata.map(listing => (
                  <>
                    <div className="col-sm-4">
                      <p className="float-start">
                        <NavLink to={`/propery-details/${listing.zpid}`}><img className='img-fluid' src={listing.photos[0]} alt={listing.name} /></NavLink>
                      </p>
                    </div>
                    <div className="col-sm-8">
                      <p className="float-end">
                        <h5 className="card-title">{listing.address.city}, {listing.address.state} {listing.address.zip}</h5>
                        <p>Price: {listing.price}</p>
                        <p>bedrooms: {listing.bedrooms}</p>
                        <p>bathrooms: {listing.bathrooms}</p>
                        <p>Home Status: {listing.homeStatus}</p>
                        <Link to={`/propery-details/${listing.zpid}`} className="btn btn-primary">Details</Link>
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div> : (<p>No results found.</p>)
        }
      </div>
    </div>
  )
}

export default SavedProperties
