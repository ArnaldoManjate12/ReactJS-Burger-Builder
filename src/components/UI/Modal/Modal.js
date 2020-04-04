import React from 'react';
import './Modal.css';

const modal = (props) => (
    <div className="Modal" style={{ 
                                width : props.width ,
                                height: props.height,
                                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                                opacity : props.show ? '1': '0'
                            }}>
        {props.children}
    </div>
);

export default modal;