# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## a real estate listings web application using React. The real estate listings should allow users to view and search for properties for sale or rent. The following features are required:

User Authentication: Users should be able to sign up, log in, and log out.

Property Listings: A list of properties with their details (address, price, type, images, etc.).

Property Search: Users should be able to search for properties based on different criteria (location, price, type, etc.).

Property Details: Users should be able to view the details of a property, including its description, images, and location.

Contact Agent: Users should be able to contact the agent responsible for the property by sending an email.

User Dashboard: Users should be able to view a list of their saved properties and view their contact history.

## Project Highlights

## used firebase for Registration, Login, and Logout.

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

## used redux for khow user is logged in or logout

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, userName, userId } = action.payload;

            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userId = userId

        },

        REMOVE_ACTIVE_USER: (state, action) => {

            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userId = null;

        }
    }
}) 

## used axios for get data from api
try {
    //await respose
    const response = await axios.get(
      "https://api.apify.com/v2/datasets/6pFyYyGBdJg2387328382CkM7BM/items?&clean=true&format=json"
    );
    setListings(response.data);
  } catch (error) {
    //error
    setError(error.message);
  }
  
##  with use of filter get data data on different condition

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

## used smtpjs.com for send email

## stored contact history in local storage and showed
 if (window.Email) {
      let array = JSON.parse(localStorage.getItem('contacthistory') || '[]');

      //alert(array);
      array.push(formProps);
      localStorage.setItem('contacthistory', JSON.stringify(array))
      SetFormState({})
    } 




