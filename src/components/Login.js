import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
import {publicRequest, authenticate} from "../utility";
import {showMessage, getMessage} from "./common/Message";

class Login extends Component{

    constructor(){
        super();
        this.state = {
            showMessage: false,
            statusCode: ''
        };
            this.signIn = this.signIn.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount(){
        $('input[type="email"]').focus();
        $('#signInForm').submit(() => {
            this.signIn();
            return false;
        });
    }

    signIn(){
        let credentials = {
            email: $('input[type="email"]').val(),
            password: $('input[type="password"]').val()
        };
        publicRequest('POST', '/login', JSON.stringify(credentials))
            .then(response => {
                if(response.ok) {
                    this.clearForm();
                    authenticate(response.headers.get('Authorization'), this.props.history);
                } else{
                    showMessage(this, response.status);
                }
            });
    }

    clearForm(){
        let emailInput = $('input[type="email"]');
        emailInput.val('');
        $('input[type="password"]').val('');
        emailInput.focus();
    }

    render(){
        return (
            <div className="container">
                <h3 className="text-center mt-5 mb-4">Sign in or <NavLink to="/register">Sign up</NavLink></h3>
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
                        <form id="signInForm" className="mb-2">
                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-user" /></span>
                                <input type="email" name="email" placeholder="Email address" className="form-control" />
                            </div><span className="form-text my-sm-2 my-2" />
                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-lock" /></span>
                                <input type="password" name="password" autoComplete="off" placeholder="Password" minLength={6} className="form-control" />
                            </div><span className="form-text my-sm-2 my-2" />
                            <button type="submit" className="btn btn-lg btn-primary btn-block"><span style={{padding: 5}} className="fa fa-sign-in" />Sign in</button>
                        </form>
                        {getMessage(this, 'User', 'logged in', 'email')}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;