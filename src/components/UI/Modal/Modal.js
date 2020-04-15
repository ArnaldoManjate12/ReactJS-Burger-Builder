import React,{Fragment, Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';


class Modal extends Component {
    
    shouldComponentUpdate( nextProps , nextState){
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children
    }

    componentDidUpdate(){
        console.log("The Component Updated");
    }

    render(){
        return(
            <Fragment>
                <Backdrop  show={this.props.show}/>
                <div className="Modal" style={{ 
                                        width : this.props.width ,
                                        height: this.props.height,
                                        transform: this.props.show ? 'translateY(0)' : 'translateY(-150vh)',
                                        opacity : this.props.show ? '1': '0'
                                    }}>
                {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal;
    