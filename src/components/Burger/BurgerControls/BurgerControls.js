import React from 'react';
import './BurgerControls.css';
import BurgerControl from '../BuildControl/BuildControl';

const controls = [
    {label : "Meat" , type : "meat"},
    {label : "Cheese" , type : "cheese"},
    {label : "Bacon" , type : "bacon"},
    {label : "Salad" , type : "salad"}
]

const BurgerControls = (props) =>  {

        return (
            <div className="BuildControls">
                <p> Burger Price :<strong>{ "R "  + props.price}</strong></p>
                {controls.map( ctrl => <BurgerControl
                                            add={() => props.ingredientAdded(ctrl.type)}
                                            remove={() => props.ingredientsRemoved(ctrl.type)} 
                                            disabled={props.disabledInfo[ctrl.type]}
                                            label={ctrl.label} 
                                            key={ctrl.label}/> )}
                <button className="OrderButton"
                    disabled={!props.purchasable}
                    onClick={props.ordered}
                    >
                        ORDER NOW
                </button>                            
            </div>
            
        );  
}

export default BurgerControls;