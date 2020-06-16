import React ,{Component} from'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrdersSummary from '../../components/UI/OrdersSummary/OrderSummary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import Aux from '../../hoc/aux/aux';
import AlertMessage from '../../components/UI/AlertMessage/AlertMessage';
import {connect} from 'react-redux';
import './BurgerBuilder.css';
class BurgerBuilder extends Component {

    state = {
        totalPrice : 4,
        purchasable : false,
        purchased : false,
        showAlert : false
    }
    
    componentDidMount() {
        console.log("Mounted Component")
        this.props.onInitIngredients()
 
    }

    updatePurchasableHandler = (ingredients) => {
        const sum =  Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey];
                            })
                            .reduce((sum , el) => {
                                return sum + el;
                            },0)
        console.log("Sum is of ingredientCount: ",sum);
        // we cater for the HTML disabled attribute 
        return sum > 0 
        
    }

    
    handlePurchase = () => {
        this.setState({purchased : true});
    }

    handlePurchaseCanceled = () => {
        this.setState({purchased : false});
    }

    handlePurchaseContinued = () => {   
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }

    render(){
        let alertMsg = null;
        if(this.state.showAlert) alertMsg=  <AlertMessage 
                                                duration="5"
                                                message="Order Saved Successfully"
                                                classes="AlertMessageSuccess"
                                            />;
        // for the less and more Buttons
        const disabledInfo = {...this.props.ingred}

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // prefer to handle null ingredients before we get the ingredients from firebase here 
        // its better than doing in in another components
        let burger = this.props.error ? <p>Error fetching Ingredients</p> :<Spinner />;
        
        let orderSummary = null
        if( this.props.ingred ){
            burger= (<Aux>
                        <Burger 
                            ingredients={this.props.ingred} />
                        <BurgerControls
                            price={this.props.price.toFixed(2)}
                            purchasable={this.updatePurchasableHandler(this.props.ingred)} 
                            disabledInfo={disabledInfo} 
                            ingredientAdded={this.props.onIngredientAdded} 
                            ingredientsRemoved={this.props.onIngredientRemoved}
                            ordered={this.handlePurchase} />
                    </Aux>);
                    
            orderSummary = <OrdersSummary
                                continued={this.handlePurchaseContinued}
                                canceled={this.handlePurchaseCanceled} 
                                ingredients={this.props.ingred}
                                totalprice={this.props.price.toFixed(2)} />;
        }
           
        if (this.state.loading) orderSummary = <Spinner />;
        
        return(
            <div className="BurgerBuilder">
                {alertMsg}
                <Modal  
                    width="60%" 
                    show={this.state.purchased} 
                    orderClicked={this.handlePurchaseContinued}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingred : state.burgerBuilder.ingredients ,
        price : state.burgerBuilder.totalPrice ,
        error : state.burgerBuilder.error,
    }
}

const mapActionsToProps = dispatch => {
    return {
        onIngredientAdded : (ingredName) => dispatch( actions.addIngredient(ingredName)),
        onIngredientRemoved : (ingredName) => dispatch( actions.removeIngredient(ingredName)),
        onInitIngredients : () => dispatch( actions.initIngredients() ),
        onInitPurchase : () => dispatch( actions.initPurchase() )
    }
}

export default connect(mapStateToProps,mapActionsToProps)(withErrorHandler(BurgerBuilder,axios));