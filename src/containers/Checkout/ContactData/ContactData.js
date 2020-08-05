import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosOrders from '../../../axios/axiosOrders';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux'
import { checkValidity } from '../../../shared/utility'
class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Name',
                    type : 'text'
                },
                value :'',
                validation : { 
                    required : true
                },
                valid : false,
                touched : false

            },
            email : {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Email',
                    type : 'email'
                },
                value :'',
                validation : { 
                    required : true
                },
                valid : false,
                touched : false
            },
            address : {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Address',
                    type : 'text'
                },
                value :'',
                validation : { 
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Street Name',
                    type : 'text'
                },
                value : '',
                validation : { 
                    required : true
                },
                valid : false,
                touched : false
            },
            postalcode : {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'ZIP Code',
                    type : 'text'
                },
                value :'',
                validation : { 
                    required : true,
                    minLength : 4,
                    maxLength : 8
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Country',
                    type : 'text'
                },
                value :'',
                validation : { 
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                   options :[
                       { value : 'cheapest' , displayedValue : 'Cheapest'},
                       { value : 'fastest' , displayedValue : 'Fastest'}
                   ]
                },
                validation : {},
                value :'cheapest',
                valid : true
            }
        },
        formIsValid : false ,
        loading : false,
        purchased : false,
        showAlert : false
    }

    PostOrder = (event) => {
        event.preventDefault();
        // this.setState({loading: true , purchased: true });
        // assign key value pairs
        const orderData = {};
        for( let inputelement in this.state.orderForm ){
            orderData[inputelement] = this.state.orderForm[inputelement].value;
        }
        
        const order = {
            userId : this.props.userId,
            ingredients : this.props.ingred,
            price : this.props.price,
            orderData : orderData,
            createDate : new Date()
        }

        this.props.onBurgerOrdered(order ,this.props.token)
    }


    inputChangeHandler = (event , inputIdentifier) => {
        // do a clone of the first level 
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity( updatedFormElement.value , updatedFormElement.validation );
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        // check that the whole form is valid
        let formIsValid = true;
        for( let inputIdentifier in updatedForm ) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm : updatedForm ,formIsValid :formIsValid})
    }

    render(){

        let orderFormArr =  [];
        for ( let key in this.state.orderForm){
            orderFormArr.push({
                id : key,
                config : {...this.state.orderForm[key]}
            })
        }

        
        let form = (
            <form onSubmit={this.PostOrder}>
               {orderFormArr.map( input => <Input
                                                key={input.id} 
                                                elementConfig={input.config.elementConfig}  
                                                elementType={input.config.elementType} 
                                                value={input.config.value}
                                                isInvalid={!input.config.valid}
                                                touched={input.config.touched}
                                                shouldValidate={input.config.validation}
                                                changed={ (event) => this.inputChangeHandler(event, input.id) } /> )}
                                            
            <Button disabled={!this.state.formIsValid} buttonclass="Success"> Submit </Button>
            </form>
        );

        let orderSuccess = null
        if( this.props.loading ) form = <Spinner />

        return(
            <>
                { orderSuccess }
                <div className="ContactData">
                    <h1> Enter Your Contact Details</h1>
                    { form }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingred : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        orderSuccess : state.order.orderSuccess,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBurgerOrdered : ( orderData, token ) =>  dispatch( actions.purchaseBurger(orderData, token) )
    }
}
  


export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(ContactData,axiosOrders));