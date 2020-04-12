import React , {Fragment, Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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
            <Toolbar showdrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} sideDrawerClick={this.sideDrawerCloseHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;