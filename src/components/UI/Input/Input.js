import React from 'react';
import './Input.css';

// The user must pass the atributes the desire to use
const Input = (props) => {
    let input = null;
    let inputClasses = ['Input','InputElement'];
    // add the invalid class if an input is invalid
    if( props.isInvalid && props.shouldValidate && props.touched ){
        inputClasses.push('Invalid');
    }

    switch(props.elementType){
        case('input'):
            input = <input 
                        className={inputClasses.join(" ")}
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changed} />;
            break;
        case('textarea'):
            input = <textarea 
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />;
            break;
        case('select'):
            input = <select
                        className={inputClasses.join(" ")}  
                        value={props.value}
                        onChange={props.changed}>
                        {
                            props.elementConfig.options.map( option => (
                                                                <option 
                                                                    key={option.value}
                                                                    value={option.value}>
                                                                        {option.displayedValue}
                                                                </option>)
                                                            )
                        }
                    </select>;
        break;
        default:
            input = <input 
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />;
            break;
    }

    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {input}
        </div>
    )
}

export default Input;