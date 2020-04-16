import React, { Component } from 'react';
import Aux from '../aux/aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {

    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount(){
            // we have to return the response or request so that the process can continue
            axios.interceptors.request.use( req => {
                this.setState({error:null});
                return req;
            });
        
            axios.interceptors.response.use( res => res , error => {
                this.setState({ error : error})
            });
        }

        errorAcknowlegdeHandler = () => {
            this.setState({error : null});
        }
      
        render(){
            return (
                <Aux>
                    <Modal 
                        height="30%"  
                        width="50%"
                        orderClicked={this.errorAcknowlegdeHandler} 
                        show={this.state.error}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;