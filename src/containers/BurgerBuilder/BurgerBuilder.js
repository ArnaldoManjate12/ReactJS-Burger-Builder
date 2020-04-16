
import React ,{Component} from'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrdersSummary from '../../components/UI/OrdersSummary/OrderSummary';
import axios from '../../axios/axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './BurgerBuilder.css';

const PRICES = {
    cheese : 2.50,
    meat : 14.50,
    salad : 3.50,
    bacon : 7.50
}

class BurgerBuilder extends Component {

    state = {
        ingredients :{
            salad : 0,
            bacon : 0,
            meat : 0,
            cheese : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchased : false,
        loading : false
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
        this.setState({loading: true , purchased: true });
        // dummy data
       const orderData = {
            Ingredients : this.state.ingredients,
            Price : this.state.totalPrice,
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

        axios.post("/orders",orderData)
        .then( response => {
            this.setState({loading: false });
            console.log(response);
        })
        .catch( error => {
            this.setState({loading: false });
            console.log(error);
        })
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
        // for the less and more Buttons
        const disabledInfo = {...this.state.ingredients}

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary =   <OrdersSummary
                                continued={this.handlePurchaseContinued}
                                canceled={this.handlePurchaseCanceled} 
                                ingredients={this.state.ingredients}
                                totalprice={this.state.totalPrice.toFixed(2)}/>;

        if (this.state.loading) orderSummary = <Spinner />;

        return(
            <div className="BurgerBuilder">
                <Burger ingredients={this.state.ingredients}/>
                <Modal  width="60%" show={this.state.purchased} orderClicked={this.handlePurchaseContinued}>
                    {orderSummary}
                </Modal>
                <BurgerControls
                    price={this.state.totalPrice.toFixed(2)}
                    purchasable={this.state.purchasable} 
                    disabledInfo={disabledInfo} 
                    ingredientAdded={this.handleAddIngredient} 
                    ingredientsRemoved={this.handleRemoveIngredient}
                    ordered={this.handlePurchase} />
            </div>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);