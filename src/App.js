import React, { useEffect } from 'react';
import { Route , Switch,withRouter, Redirect } from 'react-router-dom';
// components
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asycComponent/asyncComponent'
import './App.css';

// load components asyncrynously
const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth')
})


const App = (props) =>  {
  // will run once he component is mounted to the DOM
  useEffect(() => {
    props.onAutoLogin()
  }, [])
    
  let routes =  <Switch>
                  <Route path="/auth"  component={asyncAuth} />
                  <Route path="/" exact component={BurgerBuilder} />
                  <Redirect to="/" />
                </Switch>

  if( props.isAuthenticated ){
      routes =  <Switch>
                  <Route path="/" exact component={BurgerBuilder} />
                  <Route path="/checkout" component={asyncCheckout} />
                  <Route path="/orders"  component={asyncOrders} />
                  <Route path="/auth"  component={asyncAuth} />
                  <Route path="/logout" component={Logout} />
                  <Redirect to="/" />
                </Switch>
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }


const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin : () => dispatch(actions.AuthCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }

}

export default withRouter(
  connect( 
    mapStateToProps , 
    mapDispatchToProps)(App)
  );