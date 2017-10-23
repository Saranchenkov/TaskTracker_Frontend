import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
import {publicRequest} from "../utility";
import {showMessage, getMessage} from "./common/Message";

class Register extends Component{

    constructor(){
        super();
        this.state = {
            showMessage: false,
            statusCode: ''
        };
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount(){
        $('input[name="firstName"]').focus();
        $('#signUpForm').submit(() => {
            this.signUp();
            return false;
        })
    }

    signUp(){
        let user = {
            firstName: $('input[name="firstName"]').val(),
            lastName: $('input[name="lastName"]').val(),
            email: $('input[name="email"]').val(),
            password: $('input[name="password"]').val(),
            role: $('.active').text().toUpperCase()
        };
        publicRequest('POST', '/signup', JSON.stringify(user))
            .then(response => {
                showMessage(this, response.status);
            });
    }

    render(){
        return (
            <div className="container">
                <h3 className="text-center mt-5 mb-4">Sign up or <NavLink to="/login">Sign in</NavLink></h3>
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
                        <form id="signUpForm" className="mb-3">
                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-user" /></span>
                                <input type="text" name="firstName" placeholder="First name" minLength={2} required className="form-control" />
                            </div>
                            <span className="form-text my-md-2" />

                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-user" /></span>
                                <input type="text" name="lastName" placeholder="Last name" minLength={2} required className="form-control" />
                            </div>
                            <span className="form-text my-md-2" />

                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-envelope" /></span>
                                <input type="email" name="email" placeholder="Email address" required className="form-control" />
                            </div>
                            <span className="form-text my-md-2" />

                            <div className="input-group"><span className="input-group-addon"><i className="fa fa-lock" /></span>
                                <input type="password" name="password" placeholder="Password" minLength={6} required="required" className="form-control" />
                            </div>
                            <span className="form-text my-md-2" />

                            <div className="form-group">
                                <div className="row justify-content-center">
                                    <div className="btn-group" data-toggle="buttons">
                                        <label className="btn btn-outline-info active">
                                            <input type="radio" name="options" autoComplete="off" defaultChecked />
                                            Developer
                                        </label>
                                        <label className="btn btn-outline-info">
                                            <input type="radio" name="options" autoComplete="off" />
                                            Manager
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <span className="form-text my-md-2" />
                            <button className="btn btn-lg btn-primary btn-block">Sign up</button>
                        </form>
                        {getMessage(this, 'User', 'registered. Please confirm registration on your email', 'email')}
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;