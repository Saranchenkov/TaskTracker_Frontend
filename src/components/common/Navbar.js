import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {signout} from "../../utility";

class Navbar extends Component{

    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }

    logout(){
        signout();
        this.props.history.push('/login');
    }

    render(){
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <button type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div id="navbarsExample04" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" ><NavLink to="/projects" activeClassName='active' className='nav-link'>Projects</NavLink></li>
                        </ul>
                        <a onClick={() => this.logout()} className="btn btn-outline-info btn-lg text-info"><span style={{padding: 5}} className="i fa fa-sign-out" />Log out</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;