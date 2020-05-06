import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosOrders from '../../../axios/axiosOrders';
import './ContactData.css';

class ContactData extends Component {
    state = {
        ingredients : {
            name: '',
            email : '',
            address : {
                street : '',
                postalcode : ''
            }
        },
        loading : false,
        purchased : false,
        showAlert : false
    }

    PostOrder = () => {
        this.setState({loading: true , purchased: true });
         // dummy data
        const orderData = {
            Ingredients : this.props.ingredients,
            Price : this.props.price,
            Customer : {
                Name :"Arnaldo",
                Address : {
                    Street : "12 Vleiloerie Street",
                    ZipCode : 2019,
                    Country : "South Africa"
                },
                Email : "test@gmail.com"
            },
            DeliveryMethod : "Cheapest"
        }

        axiosOrders.post("/orders.json",orderData)
        .then( response => {
            this.setState({loading: false , purchased:false,showAlert: true});
            // TODO : Display and order Sucess Message
            console.log(response);
            // go back to home page after posting order 
            this.props.history.push('/');
        })
        .catch( error => {
            this.setState({loading: false, purchased: true });
            console.log(error);
        })
    }

    render(){
        
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Enter Your Name" />
                <input className="Input" type="email" name="email" placeholder="Enter Your Email Adress" />
                <input className="Input" type="text" name="street" placeholder="Enter Your Address" />
                <input className="Input" type="text" name="postalcode" placeholder="Enter Your Postal Code" />
            </form>
        );

        if( this.state.loading ) form = <Spinner />

        return(
            <div className="ContactData">
                <h1> Enter Your Contact Details</h1>
                { form }
                <Button buttonclass="Success" clicked={this.PostOrder}> Submit </Button>
            </div>
        )
    }
}

export default ContactData;