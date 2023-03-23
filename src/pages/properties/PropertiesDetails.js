import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { SAVE_MSG } from '../../redux/actions/action';



const PropertiesDetails = () => {

  const { zpid } = useParams();
  const [details, setDetails] = useState([]);
  const [formState, SetFormState] = useState({});
  const [storageState, setStorageState] = useState([]);
  const getAuthemail = useSelector((state) => state.auth.email);

  //form details for send email
  const changeHandler = (event) => {
    SetFormState({ ...formState, [event.target.name]: event.target.value });
  }

  //use effect for get dta
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(
          "https://api.apify.com/v2/datasets/6pFyYyGBdJgCkM7BM/items?&clean=true&format=json"
        );
        setDetails(response.data);
      } catch (error) {
        alert(error)
      }
    };
    fetchData();
  }, []);

  let filteredListings = details.filter((listing) => {
    return listing.zpid == parseInt(zpid);
  });

  const dispatch = useDispatch();
  const getMsgdata = useSelector((state) => state.msgreducer.savedmsgs);
  
  //on for submit send email code
  const submitHandler = (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    setStorageState(formProps)

    const agentemail = document.getElementsByName("agentemail")[0].value;

    dispatch(SAVE_MSG([formState.usermessage, agentemail]));

    //encryptcode-957c656b-a861-49f6-948f-851aac9bdb17
    //send mail configruration
    const config = {

      SecureToken: '957c656b-a861-49f6-948f-851aac9bdb17',
      To: 'nikhilcpatel5522@yopmail.com',
      From: getAuthemail,
      Subject: "property related email",
      Body: formState.usermessage

    }

    if (window.Email) {
      window.Email.send(config).then(() => alert("email sent  successfully"));
      let array = JSON.parse(localStorage.getItem('contacthistory') || '[]');

      //alert(array);
      array.push(formProps);
      localStorage.setItem('contacthistory', JSON.stringify(array))
      SetFormState({})
    }
  }

  return (
    <div className="container my-5">
      <div className="row">
        {filteredListings.map(listing => (
          <>
            <div className="col-md-3 how-img">
              <img src={listing.photos[0]} className="img-fluid" alt="" />
              <img src={listing.photos[1]} className="img-fluid" alt="" />
              <img src={listing.photos[2]} className="img-fluid" alt="" />
              <img src={listing.photos[3]} className="img-fluid" alt="" />
            </div>
            <div className="col-md-9">
              <h4>{listing.address.city}, {listing.address.state} {listing.address.zip}</h4>
              <p><span>Price</span>: {listing.price}</p>
              <p><span>Bedrooms</span>: {listing.bedrooms}</p>
              <p><span>Bathrooms</span>: {listing.bathrooms}</p>
              <p><span>HomeStatus</span>: {listing.homeStatus}</p>
              <p>{listing.description}</p>
              <h2>Agent Details</h2>
              <p>name: {listing.listedBy.name}</p>
              <p>email: test{listing.listedBy.email}</p>
              <p>phone: {listing.listedBy.phone}</p>
              <h2>Send Email To Agent</h2>

              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input type="hidden" onChange={changeHandler} name="agentemail" value={listing.listedBy.email} placeholder={listing.listedBy.email} className="form-control" id="exampleInputText1" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Your Email</label>
                  <input type="email" onChange={changeHandler} value={getAuthemail} className="form-control" id="exampleInputText1" name='useremail' aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Message</label>
                  <textarea className="form-control" value={formState.usermessage || ''} onChange={changeHandler} name='usermessage' id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </>

        ))
        }
      </div>
    </div>
  )
}

export default PropertiesDetails
