import React, { Component } from 'react';
import './AlertMessage.css';

class AlertMessage extends Component {
    state = {
        timeup : false
    }

    componentDidMount() {
       this.hideAlertMessage(this.props.duration);
    }

    // hideAlertMessage is responsible for hiding the alert message
    // the duration(seconds) prop must be passed to the Alert Component
    // propType = s[ string or number ]
    hideAlertMessage = (duration) => {
        // TODO : rather change the class to hide the message
        const miliseconds = Number(duration) * 1000
        setTimeout( () => this.setState({timeup: true}), miliseconds);
    }

    render(){
        let alertmessage= <div className={this.props.classes}>
                                {this.props.message}
                            </div>;

        if(this.state.timeup){
            alertmessage = null;
        }

        return (
            <div className={"AlertMessage "}>
                {alertmessage}
            </div>
        );
    }
    
}

export default AlertMessage;