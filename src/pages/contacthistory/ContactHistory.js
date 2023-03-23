import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

//component for user email messages
const ContactHistory = () => {

  const localStorageData = localStorage.getItem("contacthistory");
  const [contactData, setContactData] = useState('');
  const arrlocalStorageData = JSON.parse(localStorageData);
  const getAuthemail = useSelector((state) => state.auth.email);

  let filteredListings = arrlocalStorageData.filter((listing) => {
    return listing.useremail == getAuthemail;
  });

  return (
    <>
      <div className="container my-5">
        <div className="row contact-history">
          <h1>Contact History</h1>
          {
            filteredListings.length ?
              <div className="">
                {filteredListings.map(listing => (
                  <>
                    <div className="card m-3 d-flex w-100">
                      <div className="card-header">
                        {listing.useremail}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title"> {listing.agentemail}</h5>
                        <p className="card-text">{listing.usermessage}</p>
                      </div>
                    </div>

                  </>
                ))}
              </div> : (<p>No results found.</p>)
          }
        </div>
      </div>
    </>
  )
}

export default ContactHistory
