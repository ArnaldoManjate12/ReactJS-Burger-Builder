import React,{Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';


const modal = (props) => (
    <Fragment>
        <Backdrop  show={props.show}/>
        <div className="Modal" style={{ 
                                width : props.width ,
                                height: props.height,
                                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                                opacity : props.show ? '1': '0'
                            }}>
        {props.children}
        </div>
    </Fragment>
    
);

export default modal;