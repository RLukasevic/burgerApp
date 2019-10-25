import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogout();
    }

    render() { 
        return ( 
            <Redirect to='/'/>
         );
    }
}
 

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => dispatch(authActions.authLogout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);