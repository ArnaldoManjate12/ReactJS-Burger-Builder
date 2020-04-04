import React from 'react';
import './BackDrop.css';
import Button from '../Button/Button';


const backdrop = (props) => {

    const ingredients = Object.keys(props.ingredients)
    .map( igKey => {
        return  <li className="ListItem" key={ igKey + (Math.floor(Math.random()) * Math.floor(2 * Math.random()))}>
                    <span className="Span" style={{textTransform: "capitalize"}}>{igKey}</span> :{props.ingredients[igKey]}
                </li>;
    })

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Delicious Burger Containing the following ingredients</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price : {props.totalprice}</strong></p>
            <p>Continue to checkout ?</p>
            <Button 
                className="Button"
                width="70px" 
                buttonclass="Success"
                clicked={props.continued}>Yes
            </Button>
            <Button
                className="Button"
                width="70px"
                buttonclass="Danger"
                clicked={props.canceled}>Cancel
            </Button>
        </div>
    );
}

export default backdrop;