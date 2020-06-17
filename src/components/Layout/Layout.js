import React , {Fragment, Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'
import  './Layout.css';

class Layout extends Component{
    state ={
        showSideDrawer : false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer :false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer : !prevState.showSideDrawer }
        });
    }

    render(){
        return (
            <Fragment>
            <Toolbar
                showdrawer={this.sideDrawerToggleHandler}
                 isAuthenticated={this.props.isAuthenticated} />

                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    sideDrawerClick={this.sideDrawerCloseHandler}
                    isAuthenticated={this.props.isAuthenticated} />

                <main className="Content">
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);