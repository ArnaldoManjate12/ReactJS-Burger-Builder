import React, { Component } from 'react';
import Aux from '../aux/aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        constructor(props){
            super(props);
            this.state = {
                error : null,
                didError : false
            }
        }

        componentWillMount() {
            // the request must return something
            axios.interceptors.request.use( req => {
                this.setState({error: null , didError : false});
                return req;
            });
            // the response must return something
             axios.interceptors.response.use( res => res , err => {
                this.setState({error:err, didError: true});
            });
        }
        // now to prevent creating multiple interceptors and stop memory leaks 
        // we are going to eject the once the compoenent we wrap is unmounted
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorAcknowledgedHandler = () => {
            this.setState({error : null, didError: false});
        }

        render(){
            return (
                <Aux style={{height: '100%' , border : 'solid 1px red', backgroundColor: 'salmon'}}>
                    <Modal 
                        height="10%" 
                        width="70%" 
                        show={this.state.didError} 
                        orderClicked={this.errorAcknowledgedHandler}>
                    {this.state.didError ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        };
    }
}

export default withErrorHandler;