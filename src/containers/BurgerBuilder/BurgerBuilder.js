
import React ,{Component} from'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrdersSummary from '../../components/UI/OrdersSummary/OrderSummary';
import axiosOrders from '../../axios/axiosOrders';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/aux/aux';
import AlertMessage from '../../components/UI/AlertMessage/AlertMessage';
import './BurgerBuilder.css';

const PRICES = {
    cheese : 2.50,
    meat : 14.50,
    salad : 3.50,
    bacon : 7.50
}

class BurgerBuilder extends Component {

    state = {
        ingredients :null,
        totalPrice : 4,
        purchasable : false,
        purchased : false,
        loading : false,
        error : null,
        showAlert : false
    }
    
    componentDidMount() {
        axios.get('https://react-burger-bead9.firebaseio.com/ingredients.json')
        .then( (response) => {
            this.setState({ingredients : response.data });
            console.log('Ingredients Response', response);
        })
        .catch( (error) => {
            this.setState({error : error.message });
            console.log('Ingredients Error ',error);
        })
    }

    updatePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey];
                            })
                            .reduce((sum , el) => {
                                return sum + el;
                            },0)
        console.log("Sum is : ",sum);
        // we cater for the HTML disabled attribute 
        const purchasable = sum > 0 ? true :false;
        this.setState({purchasable})
    }

    handleAddIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;

        const priceAddition = PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({ingredients : updatedIngredients, totalPrice : newPrice});
        console.log("State in handleAddIngredient : ", this.state);
        this.updatePurchasableHandler(updatedIngredients);

    }

    handlePurchase = () => {
        this.setState({purchased : true});
    }

    handlePurchaseCanceled = () => {
        this.setState({purchased : false});
    }

    handlePurchaseContinued = () => {
    //     this.setState({loading: true , purchased: true });
    //     // dummy data
    //    const orderData = {
    //         Ingredients : this.state.ingredients,
    //         Price : this.state.totalPrice,
    //         Customer : {
    //             Name :"Arnaldo",
    //             Address : {
    //                 Street : "12 Vleiloerie Street",
    //                 ZipCode : 2019,
    //                 Country : "South Africa"
    //             },
    //             Email : "test@gmail.com"
    //         },
    //         DeliveryMethod : "Cheapest"
    //     }

    //     axiosOrders.post("/orders.json",orderData)
    //     .then( response => {
    //         this.setState({loading: false , purchased:false,showAlert: true});
    //         // TODO : Display and order Sucess Message
    //         console.log(response);
    //     })
    //     .catch( error => {
    //         this.setState({loading: false, purchased: true });
    //         console.log(error);
    //     })
        
     // URI encode the params this is relevant for space
        const queryParams = [];
        for( let i in this.state.ingredients ){
            queryParams.push( encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        // add query params to the url
        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryString
        });
    }

    handleRemoveIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;

        const priceAddition = PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({ingredients : updatedIngredients, totalPrice : newPrice})
        console.log("State in handleAddIngredient : ", this.state);
        this.updatePurchasableHandler(updatedIngredients);
    }


    render(){
        let alertMsg = null;
        if(this.state.showAlert) alertMsg=  <AlertMessage 
                                                duration="5"
                                                message="Order Saved Successfully"
                                                classes="AlertMessageSuccess"
                                            />;
        // for the less and more Buttons
        const disabledInfo = {...this.state.ingredients}

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // prefer to handle null ingredients before we get the ingredients from firebase here 
        // its better than doing in in another components
        let burger = this.state.error ? <p>Error fetching Ingredients</p> :<Spinner />;
        
        let orderSummary = null
        if( this.state.ingredients ){
            burger= (<Aux>
                        <Burger ingredients={this.state.ingredients}/>;
                        <BurgerControls
                            price={this.state.totalPrice.toFixed(2)}
                            purchasable={this.state.purchasable} 
                            disabledInfo={disabledInfo} 
                            ingredientAdded={this.handleAddIngredient} 
                            ingredientsRemoved={this.handleRemoveIngredient}
                            ordered={this.handlePurchase} 
                        />
                    </Aux>);
                    
            orderSummary = <OrdersSummary
                                continued={this.handlePurchaseContinued}
                                canceled={this.handlePurchaseCanceled} 
                                ingredients={this.state.ingredients}
                                totalprice={this.state.totalPrice.toFixed(2)}
                            />;
        }
           
        if (this.state.loading) orderSummary = <Spinner />;
        
        return(
            <div className="BurgerBuilder">
                {alertMsg}
                <Modal  
                    width="60%" 
                    show={this.state.purchased} 
                    orderClicked={this.handlePurchaseContinued}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);