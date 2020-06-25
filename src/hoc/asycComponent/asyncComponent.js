import React, { Component } from 'react'

const  asyncComponent = ( importedComponenent ) => {

    return class extends Component {
        state = {
            component : null
        }

        componentDidMount(){
            importedComponenent()
            .then( cmp => {
                // the synamic import statement will return a promise
                this.setState({ component : cmp.default });
            })
        }

        render(){

            let Component = this.state.component
            // if truthy return component
            return Component ? <Component {...this.props} /> : null
        }
    }
}

export default asyncComponent