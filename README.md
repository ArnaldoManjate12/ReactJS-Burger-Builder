# ReactJS Burger Builder

## Instalation 
After cloning the repository install the node modules
    `` yarn install `` 
## Setup 
Create a .env file in the Project's root directory and add and environment variable for your firebase database url , Sign In URL , Sign Up URL
NB : make sure to prefix the name of your environment variable with REACT_APP_<url-name>  
ie:
`` REACT_APP_ORDERS_URL=https://firebase.com/*******``
`` REACT_APP_SIGNUP_URL=https://firebase.com/*******``
## Run the Applcation
``sh yarn start ``

### Click the link Below to see a deployed version of the Application
<a href="https://react-burger-bead9.firebaseapp.com/"  target="_blank" style="padding: 10px;background-color:green ;width:50px; height:15px;border-radius:5px; color:white;text-decoration:none"/>CLICK HERE</a>

## Application Usage 
### Authenticate 
##### sign in or sign up if you dont alreay have an Account
<img src="images/authentication.gif" height="400px" >

##### select the ingredient you would like in your Burger
<img src="images/ingredients.gif" height="400px">

##### Fill in form Details
<img src="images/form.gif" height="400px">


##### View your Order history on the Orders screen
<img src="images/orders.gif" height="400px">