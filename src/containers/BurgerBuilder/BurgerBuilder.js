
import React ,{Component} from'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/BackDrop';
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
        purchased : false
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
        alert("You Continued");
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
        console.log("Disblednfo :" ,disabledInfo);

        return(
            <div className="BurgerBuilder">
                <Burger ingredients={this.state.ingredients}/>
                <Modal height="60%" width="60%" show={this.state.purchased}>
                    <Backdrop
                        continued={this.handlePurchaseContinued}
                        canceled={this.handlePurchaseCanceled} 
                        ingredients={this.state.ingredients}
                        totalprice={this.state.totalPrice.toFixed(2)}/>
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

export default BurgerBuilder;