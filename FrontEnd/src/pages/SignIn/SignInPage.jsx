import React, { Component }  from 'react'
import Header from '../../components/publicComponent/header'
import SignInForm from './SignInForm'
import { connect } from 'react-redux'
import * as authActions from "../../redux/actions/auth"
import { bindActionCreators } from 'redux'

class SignInPage extends Component {
 render(){
    return (
        <div  >
           <SignInForm 
                authActions={this.props.authActions}
            />
        </div>
    )
 }
}

const mapDispatchToProps = dispatch=>{
    return {
        authActions:bindActionCreators(authActions,dispatch)
    }
}

export default connect(null,mapDispatchToProps)(SignInPage)