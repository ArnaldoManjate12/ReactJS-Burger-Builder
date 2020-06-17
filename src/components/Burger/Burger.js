import React, { Component } from 'react';
import BurgerIngredient from './Burgeringredient/BurgerIngredient';
import './Burger.css';


class Burger extends Component {

    componentDidUpdate(){
        console.log("Burger Props :",this.props)
    }

    render(){

        let burgerIngredients = Object.keys(this.props.ingredients).map(
            ingredientKey =>  [...Array(this.props.ingredients[ingredientKey])].map(
                (_,i) => {
                    return <BurgerIngredient type={ingredientKey} key={ ingredientKey + i }/>
                }
            )).flat(); // flatten nested array to do length check

        console.log("burgerIngredients :" ,burgerIngredients);

        burgerIngredients = burgerIngredients.length < 1 ? <div>PLease select Ingredient</div> : burgerIngredients;

        return(
            <div className="Burger">
                <BurgerIngredient type="bread-top"/>
                {burgerIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        )

    }
}

export default Burger;