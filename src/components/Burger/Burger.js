import React, { Component } from 'react';
import BurgerIngredient from './Burgeringredient/BurgerIngredient';
import './Burger.css';


class Burger extends Component {

    componentDidUpdate(){
        
    }

    render(){

        let burgerIngredients = Object.keys(this.props.ingredients).map(
            ingredientKey =>  [...Array(this.props.ingredients[ingredientKey])].map(
                (_,i) => {
                    return <BurgerIngredient type={ingredientKey} key={ ingredientKey + i }/>
                }
            )).flat(); // flatten nested array to do length check

        // logic to deal with the ingredients from the server on initialisation
        let noIgredients = true;
        for( let ingredientKey in this.props.ingredients){
            if( this.props.ingredients[ingredientKey] > 0){
                noIgredients = false;
                break;
            }
        }

        let orderSuccess = null
        if( this.props.orderSuccess ) orderSuccess = <p>Successful Order</p>
        // check if there were ingredient from returned the serevr if not display a message
        burgerIngredients = noIgredients ? <div>Please select an Ingredient</div> : burgerIngredients;

        return(
            <div className="Burger">
                {orderSuccess && <span style={{ fontSize : '40px'}}>Succesfull Order</span>}
                <BurgerIngredient type="bread-top"/>
                {burgerIngredients}
                <BurgerIngredient type="bread-bottom"/> 
            </div>
        )

    }
}

export default Burger;