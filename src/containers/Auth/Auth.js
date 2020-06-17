import ButtonComponent from '../../components/UI/Button/Button'
import InputComponent from '../../components/UI/Input/Input'
import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import classes from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Email',
                    type : 'email'
                },
                value :'',
                validation : { 
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password: {
                elementType : 'input',
                elementConfig : {
                    placeholder : 'Enter your Password',
                    type : 'password'
                },
                value :'',
                validation : { 
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        },
        isSignUp : true 
    }

    conmponentDidMount(){
        if( !this.props.building && this.props.authRedirectPath !== 'checkout'){
            this.props.onChangeAuthRedirect()
        }
    }

    checkValidity = ( value , rules ) => {
        let isValid = true;
        if( rules.required ){
            isValid = value.trim() !== '' && isValid; // making sure that all the required conditions are true
            if(isValid === false)  console.log( value ," is empty");
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength  && isValid;
            if(isValid === false)  console.log( value ," is too long");
           
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength  && isValid;
            if(isValid === false)  console.log( value ," is too short");
        }

        if( rules.isEmail ){
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test( value ) && isValid
        }
        // check for numeric characters
        if ( rules.isNumeric ) {
            const pattern = /^\d+$/
            isValid =  pattern.test(value) && isValid 
        }

        return isValid;
    }

    InputChangeHandler = ( event , inputID) => {
            const controls = {
                ...this.state.controls,
                [inputID]: {
                    ...this.state.controls[inputID],
                    value : event.target.value,
                    valid : this.checkValidity(event.target.value ,this.state.controls[inputID].validation ),
                    touched : true
                }
            }
           
            this.setState({controls})
    }

    SwitchAuthenticationMode = (event) => {
        event.preventDefault()
        this.setState( prevState => {
            return { isSignUp : !prevState.isSignUp}
        })
    }

    SubmitHandler = (event) => {
        event.preventDefault()    
        this.props.onSubmitForm( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp )
    }

    render(){
        let authFormArr =  [];

        for ( let key in this.state.controls){
            authFormArr.push({
                id : key,
                config : {...this.state.controls[key]}
            })
        }

        let form = authFormArr.map( input =>  <InputComponent
                                                    key={input.id} 
                                                    elementConfig={input.config.elementConfig}  
                                                    elementType={input.config.elementType} 
                                                    value={input.config.value}
                                                    isInvalid={!input.config.valid}
                                                    touched={input.config.touched}
                                                    shouldValidate={input.config.validation}
                                                    changed={ (event) => this.InputChangeHandler(event, input.id) } />)
        // check loading state
        if( this.props.loading ){
            form = <Spinner />
        }

        // check error
        let error = null
        if( this.props.error ){
            error  = (<p>{this.props.error.message}</p>)
        }
        // redirect back to home once the user is Authenticated
        let redirect = null;
        if( this.props.isAuthenticated ){
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
          
            <div className={classes.Auth}>
                {redirect}
                {error}
                <form className={classes.Auth_Form} onSubmit={this.SubmitHandler}>
                    { form }
                    <ButtonComponent 
                        buttonclass="Success">
                       Submit
                    </ButtonComponent>
                    <br/>
                    <br/>
                    <ButtonComponent style={{ marginTop: '20px'}}
                        clicked={this.SwitchAuthenticationMode}
                        buttonclass="Success">
                        {this.state.isSignUp ? "Sign In" : "Sign Up"}
                    </ButtonComponent>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        isBuildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm : ( email , password , isSignUp ) => dispatch( actions.Authenticate( email , password , isSignUp) ),
        onChangeAuthRedirect: () => dispatch( actions.authSetRedirectPath('/'))
    }
}

export default connect( mapStateToProps , mapDispatchToProps)(Auth)